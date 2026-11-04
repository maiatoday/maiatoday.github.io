# Skills Evals Slides

Lightweight, zero-dependency HTML presentation deck for Skills Evaluations.

## Structure

- [index.html](file:///Users/maia/workspace/maiatoday/slidesSkillsEvals/index.html) — Standalone presentation with inline styles and navigation logic.
- `assets/` — Directory for optional local diagrams, logos, and screenshots.

## Features

- **Exact Viewport Fitting:** Guaranteed 100vh per slide with responsive `clamp()` typography and no internal scrolling.
- **Navigation Controls:**
  - `Right Arrow` / `Down Arrow` / `Space` / `Page Down`: Next slide
  - `Left Arrow` / `Up Arrow` / `Page Up`: Previous slide
  - `Home` / `End`: First / last slide
  - Click navigation dots (right side)
  - Swipe up/down on touch screens
- **Progress Indicator:** Real-time top progress bar.

## Viewing & Running

Open [index.html](file:///index.html) directly in any browser:

```bash
open index.html
```

Or run a local static file server:

```bash
python3 -m http.server 8000
```
