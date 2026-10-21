# IYKYK --- Storyboard

# 01. Overview

IYKYK is a mobile-first, scroll-driven pre-launch experience designed to
feel like an interactive illustrated film rather than a conventional
landing page.

The story follows one night from **sober → buzzed → drunk → party peak →
passed out**, while a horizontal, floaty meter drops from **100% to 0%**
and a recurring clock shows time moving forward.

At 0%, the story stops and asks:

> **WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?**

The meter then visibly rebuilds from **0% → 100%**. As it fills, the
visual world reconstructs into a cleaner, more controlled state, leading
into the IYKYK reveal and a **KNOW MORE** CTA.

The experience should use one consistent collage/illustration language
from beginning to end. The story changes; the visual system does not.

------------------------------------------------------------------------

# 02. Story Principles

### The experience should feel like

-   A cinematic illustrated story experienced through scrolling.
-   A subjective journey representing how the night feels, not a literal documentary timeline.
-   Escalating chaos that mirrors increasing intoxication and loss of control.
-   A stark emotional contrast between the euphoria of the party peak and the cold reality of the morning aftermath.
-   A transformative turning point that reverses the descent and restores agency.

### The experience should not feel like

-   A conventional corporate landing page or product sales pitch.
-   A preachy moral lecture or clinical public-health warning.
-   A collection of disconnected vignettes without cause and effect.
-   A generic video reel or passive media clip.

For visual styling rules and technical architecture constraints, see `design.md` and `architecture.md`.

------------------------------------------------------------------------

# 03. Core Narrative Arc

``` text
THE PLAN
100%
   ↓
FIRST DRINK
80%
   ↓
BUZZED
60%
   ↓
DRUNK
40%
   ↓
PARTY PEAK
20%
   ↓
PASSED OUT
0%
   ↓
THE QUESTION
   ↓
THE TURN
0% → 100%
   ↓
THE REVEAL
100%
```

The meter is a **storytelling metaphor**, not a scientific or medical
probability measurement.

------------------------------------------------------------------------

# 04. Narrative Progression Devices

The narrative arc is anchored by four storytelling devices:

## 4.1 The Energy / Control Meter (100% → 0% → 100%)

The meter is a storytelling metaphor representing the protagonist's stamina, sobriety, and hold on tomorrow's academic responsibilities. It is not a clinical or scientific measurement.

### Narrative states

``` text
100% (The Plan)
████████████████████

80% (First Drink)
████████████████

60% (Buzzed)
████████████

40% (Drunk)
████████

20% (Party Peak)
████

0% (Passed Out)
```

During the night's descent, the meter drains step by step. At 0%, college tomorrow is lost.

During the rebuild sequence, the meter becomes the dramatic catalyst for recovery:

``` text
0% → 20% → 40% → 60% → 80% → 100%
```

For meter visual design, physical textures, and integration rules, see `design.md` Section 12. For component implementation, see `architecture.md` Sections 20–21.

------------------------------------------------------------------------

## 4.2 Chronological Progression (The Night Clock)

The recurring clock grounds the narrative in the relentless forward march of the night, highlighting the contrast between subjective perception and objective time:

-   **9:30 PM (Scene 01):** Calm preparation; tomorrow is completely intact.
-   **10:15 PM (Scene 02):** The night begins; the first social drink.
-   **11:40 PM (Scene 03):** Buzzed; energy accelerates; the party takes hold.
-   **1:20 AM (Scene 04):** Drunk; time and perception distort.
-   **3:17 AM (Scene 05):** Peak chaos; euphoria masks how late it has become.
-   **7:58 AM (Scene 06):** Morning arrives; the alarm rings; 0% energy; college tomorrow is ruined.
-   **Morning Payoff (Scene 08):** Post-rebuild clarity; confidence restored.

For clock visual styling, analog/digital variants, and collage embedding, see `design.md` Section 13. For code architecture, see `architecture.md` Section 22.

------------------------------------------------------------------------

## 4.3 The Graphic Interruption (The Question)

Between the total collapse of Scene 06 and the turnaround of Scene 07, the narrative stops dead:

> **WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?**

This is not a continuation of party noise. It is an editorial pause that forces the viewer to confront the consequence before offering redemption.

For graphic interruption design and typography impact, see `design.md` Section 17. For component architecture, see `architecture.md` Section 24.

------------------------------------------------------------------------

## 4.4 The Rebuild Arc & Resolution

The turnaround is not a rewind; it is an active reconstruction.

-   The meter recharges from 0% to 100%.
-   The protagonist transitions from incapacitated to reassembled and confident.
-   The narrative resolves into the IYKYK brand reveal and the final CTA: **KNOW MORE →**.

For visual world disintegration and reconstruction rules, see `design.md` Section 09. For GSAP timeline implementation, see `architecture.md` Section 25.

------------------------------------------------------------------------

# 05. Scene-by-Scene Storyboard

## Scene 01 --- THE PLAN

### Scene ID

`plan`

### Time

**9:30 PM**

### Meter

**100%**

### Story

The protagonist is sober and preparing for the night.

College tomorrow is still completely intact.

The world feels ordered, composed and relatively calm.

### Visual

-   Anonymous/faceless protagonist
-   Bedroom / preparation environment
-   College-related objects
-   Bag, books, timetable or subtle college reference
-   Clock
-   Full horizontal meter
-   Relatively clean collage composition

### Mood

**Sober. Controlled. Expectant.**

### Scroll behaviour

Slow entrance and settling of the composition.

The meter and clock can appear after the main image has established
itself.

------------------------------------------------------------------------

## Scene 02 --- FIRST DRINK

### Scene ID

`first-drink`

### Time

**10:15 PM**

### Meter

**80%**

### Story

The night begins.

The first drink happens.

Everything still feels normal and exciting.

### Visual

-   Protagonist with drink
-   Friends / party environment
-   Strong purple and green accents
-   First significant increase in collage density
-   Meter drops to 80%
-   Clock advances

### Optional copy element

**JUST ONE MORE?**

### Mood

**Excited. Social. Still composed.**

### Transition

A panel slide or crop shift introduces the next scene.

------------------------------------------------------------------------

## Scene 03 --- BUZZED

### Scene ID

`buzzed`

### Time

**11:40 PM**

### Meter

**60%**

### Story

Energy builds.

More people, more movement, more stimulation.

The protagonist is now properly in the night.

### Visual

-   Larger group composition
-   New people / silhouettes
-   More overlapping panels
-   Stronger halftone and photocopy treatment
-   Clock becomes more visible
-   Meter remains floating through the composition

### Mood

**Buzzed. Energetic. Fun.**

### Scroll behaviour

The composition can expand or rearrange rather than simply replacing the
previous panel.

------------------------------------------------------------------------

## Scene 04 --- DRUNK

### Scene ID

`drunk`

### Time

**1:20 AM**

### Meter

**40%**

### Story

Things get messy.

Perception becomes exaggerated.

The protagonist is still having fun, but the world is becoming visually
unstable.

### Visual

-   Oversized artwork
-   Multiple overlapping snapshots
-   Cropped character
-   Objects appearing at unusual scale
-   Rotated/torn paper
-   Typography crossing panels
-   Clock intruding into the scene
-   Meter partially obscured

### Mood

**Drunk. Loud. Distorted. Chaotic.**

### Framing & Viewport Focus

Tight subjective framing focusing on character distortion and disorientation on mobile; wider chaotic room environment revealed on desktop (see `design.md` Section 10).

------------------------------------------------------------------------

## Scene 05 --- PARTY PEAK

### Scene ID

`party-peak`

### Time

**3:17 AM**

### Meter

**20%**

### Story

The protagonist is fully in the moment.

Dancing, laughing, moving, surrounded by the party.

This should be the most energetic scene.

### Visual

-   Large party snapshot
-   Dancing figures
-   Strong movement
-   Maximum collage density
-   Green and purple graphic marks
-   Objects layered through the composition
-   Clock visible
-   Meter reduced to 20%

### Mood

**Peak energy. Euphoric. Chaotic.**

The contrast is important:

The character feels like the night is still going.

The clock tells us how late it actually is.

------------------------------------------------------------------------

## Scene 06 --- PASSED OUT

### Scene ID

`passed-out`

### Time

**7:58 AM**

### Meter

**0%**

### Story

The night ends.

The protagonist has passed out.

Morning has arrived.

College tomorrow now feels lost.

### Visual

Hard tonal shift while maintaining the same design system.

-   Bed
-   Passed-out protagonist
-   Alarm / clock
-   Morning context
-   Minimal movement
-   Meter completely empty
-   Collage becomes quieter
-   Previously energetic elements disappear or fall away

### Mood

**Exhausted. Empty. Still.**

### Key moment

The meter reaches **0%**.

Everything stops.

------------------------------------------------------------------------

## Scene 06.5 --- THE QUESTION

### Scene ID

`question`

### Time

— (Temporal pause)

### Meter

**0%**

### Story

This is a graphic interruption rather than a normal scene.

The entire story pauses.

The composition simplifies.

### Primary message

> **WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?**

The typography should dominate the screen.

The interruption should feel like a deliberate break in the comic.

No unnecessary interface.

No explanatory paragraph.

Just the question.

### Mood

**Interruption. Stark. Contemplative.**

------------------------------------------------------------------------

## Scene 07 --- THE TURN (REBUILD)

### Scene ID

`rebuild`

### Time

— (Transition to morning)

### Meter

**0% → 100%**

### Story

The turnaround begins.

The meter returns and begins visibly filling across the screen from 0% to 100%.

This is not a subtle transition; it is an event. The protagonist regains agency, the chaotic night is redeemed, and readiness for college tomorrow is restored.

For visual world reconstruction rules, see `design.md` Section 09. For GSAP timeline implementation, see `architecture.md` Section 25.

### Mood

**Turning point. Rebuilding. Rising confidence.**

------------------------------------------------------------------------

## Scene 08 --- THE REVEAL

### Scene ID

`reveal`

### Time

**Morning**

### Meter

**100%**

### Story

The final composition introduces IYKYK.

This is the payoff. The protagonist is reassembled, confident, and ready for tomorrow.

### Visual

-   Clean, impactful composition
-   IYKYK becomes the dominant brand element
-   Same visual system (Ink Black, Warm Paper, Electric Purple, Acid Green)
-   Protagonist in confident, composed posture
-   Product treatment only if approved assets exist
-   Minimal supporting copy

### Mood

**Confident. Clear. Resolved.**

### CTA

**KNOW MORE →**

The CTA should feel like the final panel of the story, not a generic
website button.

------------------------------------------------------------------------

# 06. Narrative Progression Summary

The complete story arc mapped to its narrative markers:

| Scene | Scene ID | Time | Meter | Character State | Mood | Narrative Action |
|:---|:---|:---|:---|:---|:---|:---|
| **Scene 01** | `plan` | 9:30 PM | 100% | Sober, getting ready | Sober. Controlled. Expectant. | Quiet bedroom prep; college tomorrow is fully intact. |
| **Scene 02** | `first-drink` | 10:15 PM | 80% | Holding drink, socialising | Excited. Social. Composed. | The night begins; first drink; "JUST ONE MORE?" |
| **Scene 03** | `buzzed` | 11:40 PM | 60% | Buzzed, socialising | Buzzed. Energetic. Fun. | Stimulation increases; energy builds across panels. |
| **Scene 04** | `drunk` | 1:20 AM | 40% | Drunk, unstable | Loud. Distorted. Chaotic. | Perception skews; oversized artwork crops tighten. |
| **Scene 05** | `party-peak` | 3:17 AM | 20% | Dancing, euphoric | Peak energy. Chaotic. | Maximum chaos; character feels invincible, clock says 3:17 AM. |
| **Scene 06** | `passed-out` | 7:58 AM | 0% | Passed out on bed | Exhausted. Empty. Still. | Morning arrives; alarm triggers; college tomorrow is lost. |
| **Scene 06.5** | `question` | — | 0% | Graphic pause | Interruption. Contemplative. | Screen stops: *"WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?"* |
| **Scene 07** | `rebuild` | — | 0% → 100% | Reconstructing | Turning point. Rebuilding. | Meter visibly recharges; fragments reassemble into order. |
| **Scene 08** | `reveal` | Morning | 100% | Reassembled, confident | Confident. Clear. Resolved. | IYKYK brand reveal + final panel CTA: **KNOW MORE →** |

------------------------------------------------------------------------

# 07. Implementation & Design Boundaries

This document defines the **narrative sequence, story beats, and script**.

Detailed visual, responsive, and technical systems are defined in the companion documents:

-   **Visual design & art direction:** See `design.md` for colour tokens, typography scales, texture layers, collage composition rules, responsive cropping, motion aesthetics, and creative guardrails.
-   **Technical implementation & code architecture:** See `architecture.md` for React component structure, GSAP/ScrollTrigger timelines, Lenis smooth-scroll setup, TypeScript scene contracts, asset directories, and performance architecture.

------------------------------------------------------------------------

# 08. Final Experience in One Line

**One night. One plan for tomorrow. A meter that drains as the night
takes over, a world that falls apart at 0%, a question that changes the
story, and a rebuild that leads to IYKYK.**
