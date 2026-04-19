---
layout: post
title: Android CLI meet Gemini CLI
categories:
  - code
tags:
  - android
  - cli
  - ai-agents
  - gemini-cli
date: 2026-04-18T21:20:59+02:00
draft: false
image: androidGeminiCLI.png
---
In recent Android AI experiments I always felt I missed something. If I was in the IDE using an agent with Gemini in Android Studio, I loved the access to the knowledge base and the special tools but I could only spin up one instance. If I was in my `<insert favourite CLI agent tool>` let's say `gemini-cli`, I missed the quality of life improvements that made me have to jump back into the IDE. 

Yes I could install an `adb` extension into `gemini-cli` or write some custom skill to try to achieve what I wanted or paste a bunch of Android official urls into the prompt.  It was always fiddly to open the IDE from a worktree or test from an orchestrator session. As of last week there is a new tool and a bunch of matching skills that solve this.

**Android CLI** 

> [!NOTE]
> I see 2 main benefits of using `android-cli` 
> * easy access to **accurate android knowledge base** that is agent friendly and will **reduce token use**
> * easy **emulator interaction** and improved testing and iteration with screenshots and interactions

## How do I get it

The installation is pretty simple, follow the [Android cli docs](https://developer.android.com/tools/agents/android-cli?utm_campaign=deveco_gdemembers&utm_source=deveco)

TLDR;
1. [Download and install](https://developer.android.com/tools/agents?utm_campaign=deveco_gdemembers&utm_source=deveco)
2. make sure you are using the new `android` executable not the old one, type `which android` and you are looking for something like `/usr/local/bin/android` If not then check your path setup. Or ask an agent to do it with this prompt.
```
read the file that sets up my path and modify it such that the android sdk paths are not added in the the beginning but at the end of the path. I need this because the path `/usr/local/bin` is in the path before the android sdk and it needs to be first
```
3. run `android init` to make sure all agents on your system will use this tool. It sets up a skill for `claude`, `gemini` and more
4. optionally install all the skills created for this tool `android skills add --all`

## Show me some cools things I can do with it
I am going to use a [repo](https://github.com/maiatoday/mood-snap) with a demo app I built with Gemini in Android Studio to take it for a spin. This app is a simple mood tracking app. You don't need to try it on my app, feel free to try it on your own apps.

### Knowledge base demo

What if I need to update my app to Android 17. This requires a combination of specific Android knowledge and knowledge about my app.

In the repo with gemini cli and the android-cli skill setup ask the following question:
```
Look at this app and use the android cli tool to get documentation to make a detailed plan of what I need to do to
   upgrade to Android 17. Include code changes, things I should test and sequence of steps I should take.
```
![Android 17](Android17Check.png)
This results in a whole plan that combines the latest Android 17 info from the knowledge base and specificities of my app. 
![Android 17 plan](Android17Results.png)
Now I can continue and use the agent to clean up some some screens to make them responsive as they will be required for Android 17.

### Testing demo

My project has a journeys test defined. Journeys lets you explain your test in human language. To run these tests in Android Studio it runs the ` :app:testJourneysTestDefaultDebugTestSuite` gradle tasks. Sometimes this gives me weird session errors. 
![journeys test in Android Studio](journeysTest.png)
With the `android-cli` you can start up an emulator and run the tests from the xml file. Because the android-cli can take screenshots and see what is on the screen, it can test from your prompts. It doesn't run the gradle task. It figures out what it has to do from the xml and takes screenshots and clicks on the screen.

![Running the test](TestRun.png)

It can easily iterate, and improve the tests.
![Test fails](TestFails.png)
![Test Fix](FixTests.png)
![Test Updated](TestUpdated.png)
![Test Pass](TestPassed.png)

### Tweaking UX
The example that was the most interesting to watch: I had something odd in the way I coded up a dialog to add tags. I wasn't sure what the problem was. Because the `android` tool can take screenshots, click on the screen and see what is being displayed and read the code it could iteratively figure out the problem. 
The prompt
`there is something weird with the UX of adding the tag. I think it either needs the plus icon or the save button could you investigate?`
After trying a few things with minimal intervention from me it found a solution.
![UX fix](UXfix.png)

## What next
This is definitely a game changer in my work flow. The CLI tool integrates smoothly with other tools I use daily and simplifies tedious tasks in a way that can be handed over to an agent to do. I can see myself doing much more exploratory testing. There are a bunch of other skills too like an AGP 9 check and an R8 keep rule check and I'm sure the community will build some extra skills too so watch this space.

## References

[Android cli docs](https://developer.android.com/tools/agents/android-cli?utm_campaign=deveco_gdemembers&utm_source=deveco)
[Gemini cli info](https://geminicli.com/docs?utm_campaign=deveco_gdemembers&utm_source=deveco)
