---
layout: post
title: Random Animating Pie Button
image: randomPieBanner.png
categories: [code, sample]
tags: [code, compose, animate]
date: 2021-06-16 21:36:11
---

I am exploring animations with small sampler functions using Jetpack Compose. This one is a custom component that draws a [little pie chart](https://github.com/maiatoday/ComposeSampler/blob/main/app/src/main/java/net/maiatoday/composesampler/ui/components/PieStatus.kt). It will animate a random pie value on the click of the [button](https://github.com/maiatoday/ComposeSampler/blob/main/app/src/main/java/net/maiatoday/composesampler/ui/components/RandomPieButton.kt).

  <img src="randomPieClick.gif" width="{{ .Width }}" height="{{ .Height }}">

```kotlin
data class PieData(
    val foreground: Color = Color.White,
    val strokeWidth: Dp = 4.dp,
    val percentage: Float
)

@Composable
fun PieStatus(
    modifier: Modifier = Modifier,
    pieData: PieData
) {
    var animationPlayed by remember { mutableStateOf(false) }
    val currentPercentage = animateFloatAsState(
        targetValue = if (animationPlayed) pieData.percentage else 0f,
        animationSpec = tween(1000)
    )
    LaunchedEffect(key1 = true) {
        animationPlayed = true
    }
    Canvas(
        modifier = modifier
    ) {
        val canvasWidth = size.width
        val canvasHeight = size.height
        drawCircle(
            color = pieData.foreground,
            center = Offset(x = canvasWidth / 2, y = canvasHeight / 2),
            radius = canvasWidth / 2 - pieData.strokeWidth.toPx(),
            style = Stroke(width = pieData.strokeWidth.toPx())
        )
        val arcPadding = pieData.strokeWidth.toPx() * 2
        drawArc(
            color = pieData.foreground,
            startAngle = -90f,
            sweepAngle = currentPercentage.value * 360,
            useCenter = true,
            topLeft = Offset(arcPadding, arcPadding),
            size = Size(size.width - (arcPadding * 2f), size.height - (arcPadding * 2f))
        )
    }
}
```

[code](https://github.com/maiatoday/ComposeSampler)
