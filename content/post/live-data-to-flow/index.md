---
layout: post
title: "I still see LiveData - where are the Flows?"
image: hammer.png
categories: [code, refactor]
tags: [code, refactor, live data, flow]
date: 2023-07-30T21:38:36+02:00
draft: false
---
## Hammer and nail

There is no doubt `LiveData` is an easy, lifecycle safe way to observe some state which needs to be displayed on the UI. It is just so easy to create and easy to update. It is easy to observe. I think that may be why people use it everywhere where they need a simple observation. This ok, no guilt, no harm .... for the UI layers .... but there are better solutions for domain and data layers. This is [not the first time this topic has come up](https://proandroiddev.com/dont-use-livedata-in-repositories-f3bebe502ed3) yet I still see Live Data in a repository offered as a good solution from time to time, in blog posts, samples and in books. I think it is a case of people think they [only have a LiveData hammer](https://en.wiktionary.org/wiki/if_all_you_have_is_a_hammer,_everything_looks_like_a_nail).

There are infact pitfalls if you use `LiveData` in a repository. I think it's an anti-pattern.

## But why not

* `LiveData` is lifecycle aware - do we need this in our repository? Repostitories are typically provided by dependency injection, they could be singletons and they *don't need to know about the Android lifecycle*.

* `LiveData` *always* runs on the main thread, you can't change this. This is not what we want in a repository. Repositories often work with different data sources which could involve network or disk access tasks. I would argue that you *need* to be able to run these kinds of tasks on the correct dispatcher if your libraries do not already do this. **This is the deal breaker for me because you can cause jank in the UI if you do this incorrectly**.

* `LiveData` does have some capabilities to combine and convert `LiveData` variables with `MediatorLiveData` but flows provide a wide variety of elegant operators to choose from. This is probably not a solid argument more a case of convenience.

* Lastly, one of the biggest reasons after the main thread argument, why I would advocate for converting all of the `LiveData` use to flows: *flows are part of the Kotlin coroutines library*. This means they run on any platform where Kotlin coroutines run. You can use them in a multiplatform project. Or to put it differently, if you use flows in your repository instead of `LiveData` it is one less Android library that you have to remove and replace when you want to use the repository on another platform.

## Conversion

Replace `LiveData` with `StateFlow` and `MutableLiveData` with `MutableStateFlow`

```kotlin
private val _error: MutableLiveData<String?> = MutableLiveData(null)
val error: LiveData<String?> = _error
```
becomes

```kotlin
private val _error: MutableStateFlow<String?> = MutableStateFlow(null)
override val error: StateFlow<String?> = _error.asStateFlow()
```

and then fix the pieces that don't compile. It may be some header imports and some changes in the places where the `LiveData` was observed but the compiler will help you.

## Putting a value into the StateFlow

`StateFlow` always needs an initial value. So you will need to do that when you declare the `StateFlow`. Then to change the value you simply set it.

```kotlin
_error.value = "Ooops!!!"
```

## Collecting flows

To get the values out of the `LiveData` you need to collect the StateFlow. Depending over which architecture layer you are observing the data it may look slightly different.

### In a view model

If you simply need to collect the flow from a repository you can do it like this:

```kotlin
fun onRefresh() {
    viewModelScope.launch {
        repository
        .someOrOtherFlow
        .collect { result ->
            doSomething(result)
        }
    }
}
```

### Combining flows

If you had a situation where you were using `MediatorLiveData`, there are many flow intermediate operators to choose from which you can use to convert and combine flows. I will show an example of where two observables were combined. In the `LiveData` world you would have achieved this by using `addSource()` on the `MediatorLiveData`. Here is the flow solution:

```kotlin
val uiState = flow1.combine(flow2) { value1, value2 ->
    // this block is called if either flow1 or flow2 emits
    // it then emits a new value in a flow
    UiState(value1, value2) 
}
// it is a flow so convert it to a StateFlow
.stateIn(
scope = viewModelScope, // provide a scope for the flow to be shared in
started = WhileSubscribed(5000), // controls when the sharing is started, in this case starts when there is a subscriber and stops 5 seconds after the last one is no longer subscribed
initialValue = UiState()
)
```

### UI - Compose
Use the handy `collectAsStateWithLifecycle()` function.

```kotlin
val error by viewModel.error.collectAsStateWithLifecycle()
```

### UI - XML

There is a good writeup on how to do that [here](https://medium.com/androiddevelopers/a-safer-way-to-collect-flows-from-android-uis-23080b1f8bda) but the code snippet is this:

```kotlin
lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {
        // Flow will be collected when the lifecycle is Started
        // and collection is stopped when the lifecycle is STOPPED
        viewModel.error.collect {
            // use the updated error message
        }
    }
}
```

## Testing
Testing `StateFlow` can sometimes feel tricky because they use coroutines to do their magic especially if you are doing something with the dispatchers in your repositories. The kotlinx coroutines test library has good support to help with the testing scenarios you may encounter. Here are some scenarios I encountered.

### My test doesn't pass

Everything looks fine but the test fails because the value in the `StateFlow` isn't what you expect it to be. Writing a test that does something on a coroutine means that you might find yourself in a position where you try to check the value of the `StateFlow` before the coroutine completes. The solution to this is to call `advanceUntilIdle()` which will make sure the coroutines get a chance to complete before you assert the value of the StateFlow. 

### My test won't stop running

`StateFlow` is a hot flow. Depending on how it was created, e.g. using a stateIn gives a parameter to prevent the StateFlow from being started until someone subscribes. You need to subscribe/collect the StateFlow to get any data from it. Now the hot flow is well, hot. This will stop the test from completing. My initial instinct was to get the job on which the StateFlow was collected and kill it at the end of the tests. Luckily there is an easier solution. The kotlinx coroutines test libraries provide a `backgroundScope`. If you kick off the flow collection on this scope, it will be cleared at the end of the test and the test will complete.

### Show me the code

```kotlin
@Test
fun `GIVEN a uiState WHEN the state is collected THEN it should have the right value`() = runTest {
    backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) { // this will use the backgroundScope  
        viewModel.uiState.collect {}
    }
    assertEquals(viewModel.uiState.value, <something that looks like empty goes here>)
    viewModel.doSomethingThatWillChangeTheState()
    advanceUntilIdle() // this makes sure the coroutines complete
    assertEquals(<some new state goes here>, viewModel.uiState.value)
    // because of backgroundScope use the job of the hot StateFlow will be cancelled and the test can complete
}
```

Or you can use the test library [Turbine](https://github.com/cashapp/turbine)

## Put down the hammer and try another tool

At the [2019 Android Dev Summit](https://youtu.be/B8ppnjGPAGE?t=626) Jose Alcérreca said “LiveData was never designed as a fully fledged reactive streams builder”. Since `StateFlow` is almost a drop in replacement, there is really nothing to stop people from migrating or just not using LiveData in Repositories.

The Android [documentation also says](https://developer.android.com/topic/libraries/architecture/livedata#livedata-in-architecture) don't put LiveData in the repositories.

Ah but you say you use databinding... My condolences... but it's ok, databinding [supports StateFlow](https://developer.android.com/topic/libraries/data-binding/observability#stateflow).

Your project is in Java... sob... my condolences. Use `LiveData` or `RxJava` or convert to Kotlin.

## More info

[Sketch note overview of how flows work](https://www.maiatoday.net/p/flow-notes/)

[droidcon academy course on how to do the migration with a sample project](https://academy.droidcon.com/course/migrating-livedata-to-kotlin-flow-with-tests-in-android)

### Official documentation

[StateFlow and SharedFlow](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow)


[Testing flows](https://developer.android.com/kotlin/flow/test)


[Detailed writeup of more migration techniques](https://medium.com/androiddevelopers/migrating-from-livedata-to-kotlins-flow-379292f419fb)

### Videos

[Collecting flows in a lifecycle aware manner](https://youtu.be/6hNXFs1fYaY)

[Untangling coroutine testing](https://www.youtube.com/watch?v=nKCsIHWircA)
