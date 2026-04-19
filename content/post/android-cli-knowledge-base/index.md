---
layout: post
title: "Android CLI and knowledge base to level up Android Agent dev"
#image: image.png
categories: [code]
tags: [android, cli, ai-agents, gemini-cli]
date: 2026-04-18T21:20:59+02:00
draft: true
---

Building effective AI agents requires more than just a large language model; it requires a structured knowledge base and reliable tools. In this post, we explore how formalizing CLI rules can significantly "level up" your Android Agent development.

## The Power of Rules

When an AI agent (like Gemini CLI) interacts with a codebase, it often relies on its internal training data. However, local environments and specialized tools (like the custom `android` CLI or `hugo`) have specific nuances that aren't captured in global models.

By creating explicit rule files—such as `ANDROID_CLI_RULES.md` and `HUGO_CLI_RULES.md`—we provide the agent with a "source of truth" that it can query in real-time.

### Example: Android CLI Rules

We've documented when and how to use the `android` tool:
- **Project Scaffolding**: Use `android create` for new projects.
- **UI Debugging**: Use `android layout` to inspect the view hierarchy.
- **Device Management**: Use `android emulator` for AVD lifecycle.

### Example: Hugo CLI Rules

Similarly, for static site generation:
- **Live Preview**: Use `hugo server -D` for draft content.
- **Content Creation**: Use `hugo new` for consistent front matter.

## Why This Matters for Agents

1. **Precision**: The agent doesn't have to guess flags or commands.
2. **Safety**: Explicit rules can define "do" and "don't" boundaries.
3. **Consistency**: Every interaction follows the same architectural standards.

Formalizing these rules is the first step toward a more autonomous and reliable Android development agent.

# Prompts

```
read the @~/.zshrc and modify it such that the android sdk paths are not added in the the beginning with `path+=xxx` but at the end of the path. I need this because the path `/usr/local/bin` is in the path
   before the android sdk
```

# References

Android cli blog post
Gemini cli info
Info about memory 
