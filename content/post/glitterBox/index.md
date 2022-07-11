---
layout: post
title: "Animated Pixie Dust Cursor and more"
image: glitterBox.png
categories: [code]
tags: [code, compose, animate, 90s website]
date: 2022-05-24T22:11:19+02:00
draft: false
---

Another installment of the 90s web aesthetic experiments. In the 9Os [animated cursors](https://tholman.com/cursor-effects/) were all the rage. On a mobile device of course we don't have the concept of a cursor. There are gestures that can be detected: touches and drags. So for this project I split up the following pieces to code:

The benefits of this approach are the animating composables can be reused as progress indicators or other elements that appear or disappear to reward customers on their actions.

1. Detect gestures and draw a composable lambda on screen based on the gestures - `CursorVisible`
2. Build a few animating composables
    * An animating lifesaver candy /Sweet
    * A pulsing pink and red heart
3. Build a screen where I can switch the different animating composables in the `CursorVisible` composable
4. Build pixie dust animation by repurposing my confitti code

First of all I needed a Composeable which would take a `content` and could allow me to drag another composable around. Here's the code for this. It makes the `content` visible and invisible on a tap and lets you drag the `content`.

```kotlin
@Composable
fun CursorVisible(content: @Composable () -> Unit) {
    val boxSize = 100.dp
    val boxPx = with(LocalDensity.current) { boxSize.toPx() }
    var offset by remember { mutableStateOf(Offset(0f, 0f)) }
    var visible by remember { mutableStateOf(false) }
    Box(modifier = Modifier
        .fillMaxSize()
        .pointerInput(Unit) {
            detectTapGestures {
                offset = it - Offset(boxPx/2, boxPx/2)
                visible = !visible
            }
        }
    ) {
        if (visible) {
            Box(
                Modifier
                    .offset { offset.round() }
                    .size(boxSize)
                    .pointerInput(Unit) {
                        detectDragGestures { change, dragAmount ->
                            change.consumeAllChanges()
                            offset += dragAmount
                        }
                    }
            ) {
                content()
            }
        }
    }
}
```

This `CursorVisible` can have content of anything. So I made a lifesaver sweet/candy that changes colour and a pulsing red and magenta heart.

{{ with .Resources.GetMatch "lifesaver.gif" }}
  <img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}">
{{ end }}

The lifesaver is just circles and arcs drawn on the canvas and then some parameters such as angle and colour animated. 

```kotlin
@Composable
fun LifeSaver(rainbow: List<Color> = SkittlesRainbow) {
    val color by rainbowState(rainbow = rainbow, duration = 2000)
    val highlight by rainbowState(PastelRainbow, 2000)
    val infiniteTransition = rememberInfiniteTransition()
    val arcAngle1 by infiniteTransition.animateFloat(
        initialValue = 0F,
        targetValue = 180F,
        animationSpec = infiniteRepeatable(
            animation = tween(5000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        )
    )
    val arcAngle2 by infiniteTransition.animateFloat(
        initialValue = 180F,
        targetValue = 360F,
        animationSpec = infiniteRepeatable(
            animation = tween(5000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        )
    )
    Canvas(
        modifier = Modifier
            .size(80.dp)

    ) {
        drawCircle(
            color = color,
            radius = 40.dp.toPx(),
            style = Stroke(width = 40.dp.toPx(), cap = StrokeCap.Round)
        )
        drawCircle(
            color = highlight,
            radius = 24.dp.toPx(),
            style = Stroke(width = 2.dp.toPx(), cap = StrokeCap.Round)
        )
        drawCircle(
            color = highlight,
            radius = 55.dp.toPx(),
            style = Stroke(width = 2.dp.toPx(), cap = StrokeCap.Round)
        )
        drawArc(
            color = highlight,
            startAngle = arcAngle1,
            sweepAngle = 90f,
            useCenter = false,
            style = Stroke(width = 4.dp.toPx(), cap = StrokeCap.Round),
        )
        drawArc(
            color = highlight,
            startAngle = arcAngle2,
            sweepAngle = 90f,
            useCenter = false,
            style = Stroke(width = 4.dp.toPx(), cap = StrokeCap.Round),
        )
    }
}
```

There is a `rainbowState` that loops through a list of colours by using keyframes.

```kotlin
@Composable
fun rainbowState(
    rainbow: List<Color> = SkittlesRainbow,
    duration: Int = 3000
): State<Color> {
    val infiniteTransition = rememberInfiniteTransition()
    val interval = duration / rainbow.size
    return infiniteTransition.animateColor(
        initialValue = rainbow[0],
        targetValue = rainbow.last(),
        animationSpec = infiniteRepeatable(
            animation = keyframes {
                durationMillis = duration
                var i = 0
                for (color in rainbow) {
                    color at i
                    i += interval
                }
            },
            repeatMode = RepeatMode.Restart
        )
    )
}
```

The pulsing heart is a heart shape which uses a looping animation that adjust the colour and the scale to get the pulsing effect.

{{ with .Resources.GetMatch "heartPulse.gif" }}
  <img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}">
{{ end }}

The heart shape:
```kotlin
// Thank You https://mahendranv.github.io/posts/compose-shapes-gists/
val HeartShape = GenericShape { size, _ ->
    val h = size.height
    val w = size.width
    lineTo(0.5f*w, 	0.25f*h)
    cubicTo(0.5f*w, 	0.225f*h, 	0.458333333333333f*w, 	0.125f*h, 	0.291666666666667f*w, 	0.125f*h)
    cubicTo(0.0416666666666667f*w, 	0.125f*h, 	0.0416666666666667f*w, 	0.4f*h, 	0.0416666666666667f*w, 	0.4f*h)
    cubicTo(0.0416666666666667f*w, 	0.583333333333333f*h, 	0.208333333333333f*w, 	0.766666666666667f*h, 	0.5f*w, 	0.916666666666667f*h)
    cubicTo(0.791666666666667f*w, 	0.766666666666667f*h, 	0.958333333333333f*w, 	0.583333333333333f*h, 	0.958333333333333f*w, 	0.4f*h)
    cubicTo(0.958333333333333f*w, 	0.4f*h, 	0.958333333333333f*w, 	0.125f*h, 	0.708333333333333f*w, 	0.125f*h)
    cubicTo(0.583333333333333f*w, 	0.125f*h, 	0.5f*w, 	0.225f*h, 	0.5f*w, 	0.25f*h)
    close()
}
```
The shaped used in the heart:

```kotlin
@Composable
fun Heart(modifier: Modifier = Modifier, color: Color = Color.Red, size: Dp = 100.dp) {

    Surface(
        shape = HeartShape,
        color = color,
        modifier = modifier
            .height(size)
            .width(size)
    ) {
    }
}
```

And the animated pulsing heart:

```kotlin
@Composable
fun HeartPulse(modifier: Modifier = Modifier) {

    val infiniteTransition = rememberInfiniteTransition()
    val heartSize by infiniteTransition.animateFloat(
        initialValue = 0.5f,
        targetValue = 1.5f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        )
    )
    val heartColor by infiniteTransition.animateColor(
        initialValue = Color.Magenta,
        targetValue = Color.Red,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        )
    )
    Heart(modifier.scale(heartSize), heartColor)
}
```

Last but not least the fairy/pixie dust. For this one I made a GlitterBox which would be the container for the glitter flecks. The state of the glitter and the glitter fleck code is a particle system similar to what I used in the confetti modifier. You can see that in action in the [github repo]((https://github.com/maiatoday/MagicSprinkles)) or read the description in an [older blog post](https://www.maiatoday.net/p/confetti-cleanup/).

{{ with .Resources.GetMatch "glitterBox.gif" }}
  <img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}">
{{ end }}

Putting it all together I have a simple outside box with a little magenta cursor box that can be dragged around on the screen. The position of the magenta box is fed into the particle system on the `onDrag` calls and the glitter flecks are generated.

Here's the glitter box:
```kotlin
@Composable
fun GlitterBox(
    rainbow: List<Color> = SkittlesRainbow,
    fleckCount: Int = 2,
    visible: Boolean = true
) {

    var size by remember { mutableStateOf(Size.Zero) }
    var source by remember { mutableStateOf(Offset(200f, 200f)) }
    var glitterState by remember {
        mutableStateOf(
            GlitterState(
                speed = 0.5f,
                colors = rainbow,
                glitterShape = GlitterShape.Mixed,
                fleckCount = fleckCount,
                source = source
            )
        )
    }
    var lastFrame by remember { mutableStateOf(-1L) }
    LaunchedEffect(visible) {
        while (visible && isActive) {
            withFrameMillis { newTick ->
                val elapsedMillis = newTick - lastFrame
                val wasFirstFrame = lastFrame < 0
                lastFrame = newTick
                if (wasFirstFrame) return@withFrameMillis
                glitterState.next(elapsedMillis)
            }
        }
    }
    Box(
        Modifier
            .fillMaxSize()
            .onSizeChanged { size = it.toSize() }
    ) {
        Canvas(
            modifier = Modifier
                .fillMaxSize()
        ) {
            glitterState = glitterState.sizeChanged(this.size)
            if (visible) {
                for (fleck in glitterState.flecks) {
                    fleck.draw(drawContext.canvas)
                }
            }
        }
        Box(
            Modifier
                .offset { source.round() }
                .size(10.dp)
                .background(Color.Magenta)
                .pointerInput(Unit) {
                    detectDragGestures { _, dragAmount ->
                        val summed = source + dragAmount
                        val newValue = Offset(
                            x = summed.x.coerceIn(0f, size.width - 10.dp.toPx()),
                            y = summed.y.coerceIn(0f, size.height - 10.dp.toPx())
                        )
                        source = newValue
                        glitterState = glitterState.updateSource(source)
                    }
                }
        )
    }
}
```

And there you have it three 90s retro animated cursor inspired animations in Jetpack Compose. Read the whole project in [this git repo](https://github.com/maiatoday/MagicSprinkles).


