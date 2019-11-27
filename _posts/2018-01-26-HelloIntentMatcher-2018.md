---
layout: post
title: Note to Future Me - Testing Intents with Matchers
img: testResults.png
categories: [code]
tags: [code, testing]
date: 2018-01-26 21:36:13
---
I want to make my little experiments public and save them as a reminder for future me. So here is yet another post on Matchers and Espresso testing.
I want to test this:
First activity starts another activity at a button click.

2. First activity passes a parcelable object to the second activity.
3. Test that the intent that starts the second activity contains the object with the correct properties.
I built a contrived example, MainActivity collects some info and passes this to StarActivity in a parcelable called ContrivedParams. See the sample code on GitHub.

To write the tests I brushed up on Hamcrest[1][2][3]: a library that makes it easier to write readable tests. Instead of
assert(expected==actual) 
you can write almost-english
assertThat(actual, is(expected)) 
which is a sugar coated version of
assertThat(actual is(equalto(expected))).

Sadly though is is a hard keyword in Kotlin so I ended up using the isA() and equalTo() varieties of calls rather than escaping is with backticks.
Another reason to use Hamcrest - better error messages. Compare these two messages.
java.lang.AssertionError
 at net.maiatoday.hellointentmatcher.ContrivedParamsTest.showErroMessagesTest(ContrivedParamsTest.kt:37)
with the message given by a custom matcher
java.lang.AssertionError: 
Expected: title should return "Hello World"
 but: was "Hello World!"
 at net.maiatoday.hellointentmatcher.ContrivedParamsTest.showErroMessagesTest(ContrivedParamsTest.kt:42)
 
 or the error message given by an object matcher
 java.lang.AssertionError: 
 Expected: <ContrivedParams(title=Hello World, starCount=3, colour=#00b0ff)>
  but: was <ContrivedParams(title=Hello World!, starCount=4, colour=#00b0fff)> at net.maiatoday.hellointentmatcher.ContrivedParamsTest.showErroMessagesTest(ContrivedParamsTest.kt:47)
 The parameters for the second activity is passed in a parcelable data class.
 
 I used the Espresso-intents library . Start the activity with an IntentsTestRule. The IntentsTestRule initialises the Espresso intents before each test and releases them again after the test completes. I used the intended method to test the intent and the hasEntry method to check for the extra. I compared the extra with an expected object. As a bonus I wrote a custom matcher to check the properties of the object that was in the intent. Custom matchers are useful if you do not need to check all of the properties in the data object.
 
 

[code]: https://github.com/maiatoday/HelloIntentMatcher
