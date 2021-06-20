---
layout: post
title: Hello8Ball
image: Screenshot_1566145786.png
categories: [code]
tags: [code, coroutines, testing]
date: 2019-11-23 21:36:11
---

A sampler app to explore Coroutine testing. This is a toy app that simulates an 8 Ball. It can answer questions, find synonmyms, generate a password or check if a number is prime. It was created to make a situation where it makes sense to use coroutines to e.g. go on the network or make a calculation. Then I added tests for all the pieces using [kotlinx-coroutine-test](https://github.com/Kotlin/kotlinx.coroutines/tree/master/kotlinx-coroutines-test).

As a bonus the repo is set up to run the tests on CircleCi. It has detekt setup and jacoco code coverage. There is also a branch where all the tests are converted to junit5.

[Devfest 2019 video](https://www.youtube.com/watch?v=E-1n_AmlVjE)

This is the companion repo to the [KotlinEveryWhereZA 2019]() and [DevFestZa 2019](https://devfest.co.za/) talk. [Slides](https://github.com/maiatoday/Hello8Ball/blob/master/slides/TestingKotlinCoroutines.pdf) are in the repo.

[code](https://github.com/maiatoday/Hello8Ball)
