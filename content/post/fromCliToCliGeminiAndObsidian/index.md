---
layout: post
title: "From CLI to CLI - Gemini and Obsidian"
image: geminiObsidian.png
categories: [code]
tags: [gemini-cli, obsidian, knowledge management systems metadata]
date: 2026-02-21T21:33:17+01:00
draft: false
---

Let’s talk about the "Obsidian Paralysis."

For a while, I’ve been using Obsidian to jot down ideas, plan content, and collect those random snippets from the internet that feel like digital gold. I moved over from Notion a while back. The freedom of simple Markdown managed by Git was liberating. Pure, texty goodness.

But—and there's always a *but*, isn't there?—one thing always held me back. That nagging little voice: *Am I doing it right?*

I know, I know. The "experts" say just write the notes and let the system emerge organically. But I was forever second-guessing myself. Is this a `status: NotStarted` or `status: not-started`? Is the `type` a "thought" or a "note"? I was spending more time fiddling with the taxonomy and the metadata "meta-system" than actually *creating content*.

But today, everything changed.

I opened Obsidian and saw the news: **they now have a CLI interface.**

💡: *"What if I introduced the [Obsidian CLI](https://help.obsidian.md/cli) to an AI Agent CLI?"*

For my experiments, I called in [Gemini CLI](https://geminicli.com/). I basically sat them down in a terminal together, let Gemini CLI figure out what the Obsidian CLI could do, and then—with a spicy mix of `grep`, `sed`, `awk`, and the new Obsidian commands, we went to work.

Here’s the "Metadata Makeover":

### 1. The Status Cleanup
I had Gemini pull every single `Status` property from every note in my vault to analyze them for consistency. It detected patterns I didn't even know I had (like all the versions of `Idea` `Ideas` `Research` `researching`). We cleaned up the mess, documented the new "Golden Rules" for statuses, and Gemini wrote a validation script that I can run that will clean things up or highlight inconsistencies.

### 2. The "Type" vs. "ContentType" Tangle
We did the same for `Type` and `ContentType`. It turns out I was using them interchangeably like a chaotic neutral character. Gemini helped me settle on a single source of truth, updated my docs, and tweaked the validation script to keep things tidy.

### 3. The Tag Jungle
We looked at everything—frontmatter tags, in-document hashtags, you name it. Gemini analyzed the "Tag Jungle" and suggested a hierarchy that actually makes sense for how I think. No more `tag: gardening` vs `#plants` confusion.

### 4. Let the Scripts Do the Walking
The output wasn't the cleanup but a way to spot patterns, check and cleanup in future.

The main takeaway? Since this Obsidian CLI release, I can finally stop worrying about whether my metadata is "right." I have a system that checks itself, so I can get back to the fun part: just writing. If the system evolves in future which it inevetably will, I can just re-analyse everything, detect the patterns  update the docs and the script and clean everything up again.

If it is this easy to figure out the real system and fix everything then it doesn't matter if I am inconsistent for a bit.

Next project: Let's cleanup the old hugo installs and refresh the themes on my website.

