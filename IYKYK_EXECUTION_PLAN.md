# IYKYK Pre-Launch Experience
## Antigravity Execution Plan

> **Purpose:** This is the execution control document for the IYKYK pre-launch experience.
> Antigravity must use this document to understand what each phase means, what is in scope, what is out of scope, and what must be completed before moving forward.
>
> **Current phase:** Phase 0 — Production Lock / Audit

---

## 1. Source-of-Truth Hierarchy

When making implementation decisions, use the following hierarchy:

1. `storyboard.md` — narrative, scene order, scene states, story progression
2. `design.md` — visual language, art direction, typography, color, texture, motion aesthetic
3. `architecture.md` — technical structure, component architecture, animation architecture, performance and accessibility
4. Reference images — visual reference for the intended aesthetic and composition
5. Project requirements / idea documents — product and business constraints

### Non-negotiable rule

Do **not** redesign the concept unless explicitly instructed by the user.

If a source document and personal implementation preference conflict, stop and flag the conflict rather than silently changing the concept.

Do not invent:
- product claims
- product packaging
- product features
- product facts
- narrative beats
- additional scenes
- new interaction concepts
- visual directions that contradict the source material

---

# 2. Phase Map

## Phase 0 — Production Lock / Audit

### Purpose
Understand the existing project before building.

### Antigravity should:
- inspect the repository structure
- inspect the existing frontend stack
- inspect existing components
- inspect existing styles and tokens
- inspect animation infrastructure
- inspect current assets
- inspect reference images
- inspect installed dependencies
- identify what is already implemented
- identify what is missing
- identify technical conflicts or risks
- identify asset dependencies
- identify mobile/Safari/performance risks

### Deliverable
A written implementation audit containing:
- current state
- missing pieces
- existing infrastructure worth reusing
- risks/conflicts
- asset requirements
- recommended implementation order
- readiness assessment for Phase 1

### Do not:
- build major features
- generate final artwork
- redesign the concept
- add unnecessary libraries
- implement later phases

### Exit condition
Phase 0 is complete only when the repository and implementation dependencies are understood well enough to begin Phase 1 deliberately.

---

# Phase 1 — Foundation

## Purpose
Create the technical shell that the IYKYK experience will run on.

### Build
- React
- Vite
- TypeScript
- GSAP
- ScrollTrigger
- Lenis
- global CSS tokens
- responsive viewport/frame
- asset loading structure
- base typography system
- spacing tokens
- z-index system
- texture/opacity tokens
- animation timing/easing tokens

### Do not build yet
- final artwork
- detailed scene compositions
- final product imagery
- elaborate motion sequences
- unnecessary interaction systems

### Deliverable
A clean, responsive, technically correct IYKYK shell with no major visual storytelling yet.

### Exit condition
The application runs cleanly and provides the technical foundation required by the scene framework.

---

# Phase 2 — Scene Framework

## Purpose
Build the reusable machinery that allows the story to be expressed as data rather than hard-coded chaos.

### Required scene IDs

```text
plan
first-drink
buzzed
drunk
party-peak
passed-out
question
rebuild
reveal
```

### Build reusable components/systems
- Experience
- Scene
- Composition
- Panel
- Layer
- Clock
- Meter
- Texture
- Graphic
- Typography
- CTA

### Scene data should control
- scene ID
- time
- meter value
- composition mode
- layers
- transitions
- desktop behavior
- mobile behavior

### Architecture rules
- story data stays separate from visual composition
- reusable components should be preferred
- no large global state system
- GSAP orchestration should remain centralized
- Lenis owns smooth scrolling
- assets must remain reusable
- responsive behavior must be intentional

### Deliverable
All nine scenes exist structurally, even if they contain placeholders.

### Exit condition
The full scene registry can render all nine scenes in the correct order.

---

# Phase 3 — Narrative Systems

## Purpose
Make the story mechanics work before investing in final artwork.

### Meter
Forward progression:

```text
100 → 80 → 60 → 40 → 20 → 0
```

Rebuild progression:

```text
0 → 20 → 40 → 60 → 80 → 100
```

The meter is illustrative, not a scientific or clinical measurement.

### Clock progression

```text
9:30 PM
10:15 PM
11:40 PM
1:20 AM
3:17 AM
7:58 AM
```

The clock is driven by scene data. It does not represent real-world time.

### Question scene

```text
WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?
```

The question scene should be visually distinct and should not inherit unnecessary scene UI.

### Rebuild sequence

The controlled GSAP sequence should communicate:

1. meter expands
2. collage fragments move
3. panels reconnect
4. clock transforms
5. typography settles
6. composition becomes coherent
7. meter reaches 100%
8. IYKYK reveal appears

The rebuild is a reconstruction and return of agency, not a simple rewind.

### Deliverable
The complete narrative can be experienced from beginning to end using placeholder artwork.

### Exit condition
A user can scroll through the complete narrative and reach the reveal without missing or broken story states.

---

# Phase 4 — First-Pass Scene Composition

## Purpose
Build the entire illustrated film using placeholders before commissioning/integrating final artwork.

### Scene order

1. `plan`
2. `first-drink`
3. `buzzed`
4. `drunk`
5. `party-peak`
6. `passed-out`
7. `question`
8. `rebuild`
9. `reveal`

### Scene intent

#### plan
- 9:30 PM
- 100%
- sober/getting ready
- bedroom
- college objects
- calm composition

#### first-drink
- 10:15 PM
- 80%
- holding drink/socialising
- friends/party
- purple/green accents
- optional “JUST ONE MORE?”

#### buzzed
- 11:40 PM
- 60%
- larger group
- overlapping panels
- stronger halftone/photocopy treatment
- more visible clock

#### drunk
- 1:20 AM
- 40%
- oversized artwork
- overlapping snapshots
- cropped character
- unusual scale
- rotated/torn paper
- typography crossing panels
- clock intrudes
- meter partly obscured

#### party-peak
- 3:17 AM
- 20%
- dancing/euphoric
- maximum chaos

#### passed-out
- 7:58 AM
- 0%
- passed out on bed
- alarm
- morning
- college tomorrow ruined

#### question
- 0%
- graphic pause
- only the core question
- no unnecessary interface

#### rebuild
- 0% → 100%
- protagonist regains agency
- world reconstructs
- composition becomes controlled again

#### reveal
- morning
- 100%
- IYKYK dominant
- confident/reassembled
- same visual system
- minimal supporting copy
- CTA:

```text
KNOW MORE →
```

### Deliverable
A complete rough-cut interactive film.

It may be visually ugly at this stage. That is acceptable.

It must:
- tell the correct story
- use the correct scene order
- have correct meter states
- have correct clock states
- contain the question
- contain the rebuild
- reach the reveal

### Exit condition
The entire experience works as a coherent rough cut before final artwork is integrated.

---

# Phase 5 — Final Artwork & Asset Integration

## Purpose
Replace placeholders with the final IYKYK visual system.

## Asset Batch A — Characters

Required character states:

- preparing
- holding drink
- socialising
- buzzed
- drunk
- dancing
- exhausted
- passed out
- reassembled / restored

Character language:
- anonymous
- faceless or obscured
- editorial
- silhouette-driven where appropriate
- expressive through pose

---

## Asset Batch B — Environments

Required environments:

- bedroom
- study/desk area
- party environment
- bed
- morning environment

---

## Asset Batch C — Objects

Potential required objects:

- phone
- books
- college bag
- timetable
- glass/cup
- bottles
- speaker
- alarm
- party objects

Do not invent product-specific objects that are not approved.

---

## Asset Batch D — Textures

Required texture vocabulary:

- paper texture
- photocopy grain
- halftone
- scan lines
- scratches
- torn paper
- tape
- rough ink
- imperfect print registration

The goal is a printed object brought to life, not a generic grain overlay.

---

## Asset Batch E — Graphic Vocabulary

Required/reusable graphics may include:

- arrows
- scribbles
- stars
- circles
- smiley marks
- crowns
- grids
- underlines
- barcode-like marks
- purple blobs
- acid-green strokes
- torn-paper shapes
- tape strips
- hand-drawn symbols

---

## Asset Batch F — Code/SVG Systems

Prefer code/SVG for:

- meter
- clock
- simple marks
- icons
- logos

Do not rasterize these unnecessarily.

---

## Asset Batch G — Typography

Use real HTML/CSS text wherever possible.

Use raster/SVG only when a custom distressed treatment cannot reasonably be reproduced in code.

---

## Asset Batch H — Brand

Required/possible brand assets:

- `IYKYK.svg`
- wordmark treatment
- reveal lockup
- CTA treatment

Do not invent a product packshot unless approved assets exist.

### Deliverable
Final visual assets integrated into the existing scene framework.

### Exit condition
The rough-cut placeholder assets have been replaced with the approved IYKYK visual system without changing the narrative or interaction model.

---

# Phase 6 — Motion Direction & Polish

## Purpose
Make the experience feel like a cinematic illustrated film rather than a collection of animated website components.

### Polish
- easing
- timing
- stagger
- panel movement
- crop shifts
- texture movement
- typography interruptions
- chaos escalation
- scene transitions
- question pause
- rebuild timing
- reveal timing

### Motion rhythm

```text
movement → pause → impact → movement
```

### Approved transition vocabulary
- panel slide
- layer reveal
- paper tear
- crop shift
- graphic interruption
- reconstruction

### Do not introduce
- generic UI animation
- excessive continuous parallax
- gratuitous 3D
- unrelated transition styles
- motion that distracts from the story

### Deliverable
A polished cinematic scroll experience with a consistent visual world.

---

# Phase 7 — Responsive & Performance

## Purpose
Make the experience work properly across devices without destroying the art direction.

### Test
- mobile
- larger mobile
- tablet
- desktop
- wide desktop
- mobile Safari

### Responsive rules
- use intentional cropping
- preserve text readability
- preserve scene hierarchy
- do not simply shrink desktop compositions
- reuse artwork intelligently
- adapt crop/scale/position for viewport differences

### Performance
- image preloading where appropriate
- efficient asset formats
- cleanup GSAP contexts
- prevent duplicate ScrollTriggers
- avoid unnecessary animation work
- watch memory usage
- test mobile Safari
- provide reduced-motion behavior

### Reduced motion
The experience must remain understandable and usable when motion is reduced.

### Deliverable
Stable responsive experience with acceptable loading and runtime performance.

---

# Phase 8 — QA & Launch

## Purpose
Verify the experience against the source of truth and ship it.

### Visual QA
Compare against:
- `storyboard.md`
- `design.md`
- `architecture.md`
- approved reference images

### Functional QA
Verify:
- all scenes
- scene order
- meter
- clock
- question
- rebuild
- reveal
- CTA
- loading failures
- keyboard accessibility
- reduced motion

### Analytics events

Implement/verify:

```text
experience_loaded
scene_entered
question_reached
rebuild_started
reveal_reached
cta_clicked
```

### Launch
- GitHub
- Vercel
- static React/Vite deployment
- CDN delivery

### Deliverable
Production-ready IYKYK pre-launch experience.

### Exit condition
No known critical narrative, visual, accessibility, responsive, or performance blockers remain.

---

# 3. Global Anti-Drift Rules

These apply to every phase.

## Do not redesign the concept

Do not introduce:
- new narrative beats
- new scenes
- alternate story structures
- conventional landing-page sections
- dashboards
- persistent HUDs
- fixed navigation
- unrelated interactions

## Do not change the visual language

Avoid:
- realistic photographic/video footage
- clean corporate UI
- SaaS cards
- generic drop shadows
- blurry pastel gradients
- glassmorphism
- excessive 3D/WebGL
- separate visual aesthetics per act

The experience should feel like:

> **Moving printed collage pushed into digital space.**

## Do not turn the meter into a medical UI

The meter is an illustrative storytelling device.

It is not:
- a blood alcohol indicator
- a medical measurement
- a scientific recovery score
- a clinical health metric

## Do not invent product claims

The product is still in pre-launch/validation.

Do not invent:
- formula details
- efficacy claims
- guaranteed outcomes
- side-effect claims
- packaging specifications
- pricing
- launch dates
- product mechanics not present in the source documents

---

# 4. Asset Generation Plan

Final artwork should be generated/integrated in batches rather than randomly.

## Priority 1 — Character system
The character appears throughout the story, so consistency matters more than any individual illustration.

Generate:
- 9 core character states
- consistent proportions
- consistent clothing/identity cues
- transparent-background assets where useful

## Priority 2 — Environment system
Generate the major environments:
- bedroom
- party
- bed/morning
- study/college context

## Priority 3 — Object library
Generate reusable objects that can be rearranged across scenes.

## Priority 4 — Texture library
Build the reusable print/collage texture system.

## Priority 5 — Graphic library
Build the reusable hand-drawn graphic vocabulary.

## Priority 6 — Brand/reveal assets
Only after brand assets are approved.

---

# 5. How Antigravity Must Work

For every task:

### Step 1
State the current phase.

### Step 2
State the specific objective.

### Step 3
Inspect existing work before creating new infrastructure.

### Step 4
Reuse existing infrastructure where possible.

### Step 5
Implement only work belonging to the current phase.

### Step 6
Test the implementation.

### Step 7
Report:
- what changed
- what was intentionally not changed
- what remains
- blockers
- assets needed
- whether the phase exit criteria are satisfied

### Step 8
Do not automatically advance to the next phase.

The user explicitly controls phase advancement.

---

# 6. Current Assignment

## CURRENT PHASE: 0 — PRODUCTION LOCK / AUDIT

### Task

Audit the existing repository against this execution plan and the project source-of-truth documents.

### Produce

1. Current project state
2. Existing implementation
3. Existing reusable infrastructure
4. Missing implementation
5. Asset dependencies
6. Dependency/library assessment
7. Mobile/Safari risks
8. Performance risks
9. Source-of-truth conflicts, if any
10. Recommended Phase 1 implementation order
11. Phase 1 entry checklist
12. Whether the project is ready to enter Phase 1

### Important

**Do not perform major implementation during this audit.**

**Do not generate final artwork.**

**Do not redesign anything.**

The expected output of Phase 0 is understanding and an actionable implementation checklist.

---

# 7. Phase Handoff Protocol

A phase is complete only when its exit criteria are satisfied.

At the end of each phase, Antigravity must produce:

```text
PHASE:
STATUS:

COMPLETED:
- ...

NOT COMPLETED:
- ...

FILES CHANGED:
- ...

ASSETS NEEDED:
- ...

RISKS:
- ...

TESTS:
- ...

EXIT CRITERIA:
- [ ] ...
- [ ] ...

RECOMMENDATION:
READY FOR NEXT PHASE / NOT READY
```

Antigravity must not silently move into the next phase.

---

# 8. Final Principle

The experience should feel like:

> **Same style. Same world. Different states.**

What changes:
- character state
- composition density
- passage of time
- meter
- chaos
- arrangement

What does not change:
- the visual language
- the world
- the narrative identity
- the core art direction

This is one continuous illustrated world, not a collection of separate website sections.
