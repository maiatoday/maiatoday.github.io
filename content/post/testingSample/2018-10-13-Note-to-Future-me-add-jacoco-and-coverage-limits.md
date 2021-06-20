---
layout: post
title: Note to Future me — add jacoco and coverage limits
date: 2018-10-13 13:55:25
image: blocks.png
categories: [code]
keywords: [code]
---

I have found myself adding jacoco and coverage limits to more than one Android project. Enough times for me to extract the gradle bits in to a little nugget of grooviness to just drop into a project as needed. For a while now I have been reading about [test coverage numbers](https://jeroenmols.com/blog/2017/11/28/coveragproblem/) and working with my intuition about what is the most valuable thing for me to spend my time on when building something. Also Kotlin. In the light of this my gradle build file snippet contains the following:

*   Jacoco for test coverage
*   Kotlin support
*   A way to choose important classes and only set coverage limits on those

Do this,

1\. Put the gist in a file `jacoco.gradle`

2\. Modify the `jacoco.gradle` file to add limits for your important packages.

3\. Add this line to your `build.gradle`

apply from: 'jacoco.gradle'

4\. And then run the command

./gradlew tasks

to see what new tasks are there to run. e.g. in the reporting section find something similar to

./gradlew/testDevDebugUnitTestCoverageVerification

which will run the tests, make coverage reports and apply limits.

5\. Find the reports in a path similar to this

~/your\_project/your\_module/build/reports/jacoco/testDevDebugUnitTestCoverage/html/index.html

Without further ado, the gist:

The code in the gist was taken from so many blogposts. I can’t even remember them all. Thanks to the original authors.

Also note there is a small piece of cargo cult code that kept sneaking in from sundry blogposts that I don’t need because I don’t have Robolectric tests. As it turns out this code [crashes unit tests on Java > 8](https://groups.google.com/forum/#!topic/jacoco/KMBScnGiKeI). So remove this code if you have it and if it fits your usecase.

tasks.withType(Test) {  
    jacoco.includeNoLocationClasses = true  
}
