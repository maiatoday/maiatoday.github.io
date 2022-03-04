---
layout: post
title: "Comparing Declarative Animation frameworks"
image: animateCompare.png
categories: [talk, jetpack compose]
tags: [talk, compose, animate]
date: 2022-02-22T20:41:06+02:00
draft: false
---

A evening of comparing animation in declarative frameworks. A speedrun of the animation system in Jetpack Compose as a comparison agains SwiftUI and Flutter. Hosted by [GDG Nuremberg](https://gdg.community.dev/gdg-nuremberg/) We discovered many similarites, all the systems have some way to control the animation graph, with somewhat confusing differences in naming. A tween in compose is not the same as a tween in Flutter. Flutter `Tween` is an `animationSpec` in Compose. Compose `tween` is a specific  kind of `Curve` in Flutter that does a linear interpolation. Oh and its a function in Compose and an object in Flutter.

{{< youtube -OByq0ob_P4 >}}

[Slides](https://docs.google.com/presentation/d/18oxYA3cj31nYBfDStghSDwMC3s-5uNHy8-ItBihXTGI/edit?usp=sharing)