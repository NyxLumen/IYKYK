# IYKYK --- Design System & Experience Design

# 01. Purpose

This document defines the visual, interaction, responsive, and
experience design rules for the IYKYK pre-launch experience.

-   `storyboard.md` defines the **narrative sequence, story beats, scene script, and copy**.
-   `design.md` defines **how that story should look, feel, and behave visually**.
-   `architecture.md` defines the **frontend technical architecture, component hierarchy, and implementation**.

The experience is a mobile-first, scroll-driven illustrated film built
from editorial collage compositions rather than conventional
landing-page sections or realistic video.

------------------------------------------------------------------------

# 02. Design North Star

## Core feeling

**Cinematic. Editorial. Chaotic. Young. Mysterious. Tactile.**

The site should feel like a moving printed collage pushed into a digital
space.

The visual language draws from punk/editorial poster design, photocopied
zines, torn paper, scanned textures, imperfect print registration,
maximalist Gen-Z collage, post-internet visual culture, and
comic/snapshot storytelling.

The experience should feel intentionally imperfect. Imperfections are
part of the design, not defects to clean up.

------------------------------------------------------------------------

# 03. Visual Identity

## Canonical colour palette

| Colour | Hex | Primary role |
|:---|:---|:---|
| **Ink Black** | `#0B0B0B` | Primary background / dominant field |
| **Warm Paper** | `#EDE4D9` | Paper, cards, typography, contrast |
| **Electric Purple** | `#7A3BFF` | Energy, atmosphere, secondary accent |
| **Acid Green** | `#39EF88` | Highlight, interaction, CTA, visual punch |

## Colour hierarchy

The interface should remain predominantly dark.

A useful starting distribution is:

-   **Black:** dominant
-   **Paper:** structural contrast
-   **Purple:** energetic accent
-   **Green:** sharp highlight / action

Green should feel more precious than purple. Use it for moments that
need attention rather than covering the interface in neon green.

------------------------------------------------------------------------

# 04. Typography

Typography is a major visual component rather than merely a content
layer.

## Display

Use a **bold, condensed, imperfect display typeface** for:

-   major statements
-   scene titles
-   percentage states
-   IYKYK
-   large editorial moments

Preferred characteristics:

-   condensed
-   heavy
-   high visual impact
-   slightly imperfect
-   strong uppercase forms

## Body / UI

Use a clean modern sans-serif for:

-   supporting copy
-   labels
-   technical information
-   small navigation
-   CTA supporting text

The body font should provide contrast against the expressive display
typography.

## Handwritten / custom type

Use selectively for:

-   annotations
-   marginalia
-   arrows
-   short phrases
-   collage notes
-   expressive interruptions

Do not use handwritten type for long-form content.

------------------------------------------------------------------------

# 05. Texture Language

Texture is fundamental to the visual identity.

Preferred textures:

-   photocopy grain
-   paper fibres
-   halftone dots
-   scan lines
-   rough ink
-   distressed edges
-   torn paper
-   tape
-   imperfect print registration
-   scratches
-   scribbles
-   hand-drawn marks
-   rough masking

Textures should create physicality without destroying readability.

The goal is **printed object brought to life**, not simply adding a
grain overlay.

------------------------------------------------------------------------

# 06. Illustration Direction

## Character

The protagonist should remain:

-   anonymous
-   faceless or obscured
-   non-recognisable
-   editorial
-   silhouette-driven where appropriate
-   expressive through pose rather than facial detail

## Illustration treatment

Use:

-   high-contrast imagery
-   collage cut-outs
-   rough masking
-   paper overlays
-   monochrome/near-monochrome base imagery
-   purple and green interventions
-   hand-drawn marks
-   oversized graphic elements

The same character and object language should carry through the entire
experience.

------------------------------------------------------------------------

# 07. Visual Hierarchy & Composition Stack

The website is built around **composable editorial scenes**.

Do not think of each scene as a single flat image. Each scene is constructed from an 8-tier visual hierarchy:

``` text
┌────────────────────────────────────────────────────────┐
│ 1. VIEWPORT FRAME (Responsive Aspect Ratio / Crop)    │
│   ┌──────────────────────────────────────────────────┐ │
│   │ 2. BASE ENVIRONMENT & PAPER FIELD (Black / Grain)│ │
│   │   ┌────────────────────────────────────────────┐ │ │
│   │   │ 3. COLLAGE PANELS (Snapshots / Rips / Tape)│ │ │
│   │   │   ┌──────────────────────────────────────┐ │ │ │
│   │   │   │ 4. CHARACTER CUT-OUTS (Poses)        │ │ │ │
│   │   │   │   ┌────────────────────────────────┐ │ │ │ │
│   │   │   │   │ 5. PROPS & OBJECTS (Desk/Cups) │ │ │ │ │
│   │   │   │   │   ┌──────────────────────────┐ │ │ │ │ │
│   │   │   │   │   │ 6. CLOCK & FLOATING METER│ │ │ │ │ │
│   │   │   │   │   │   ┌────────────────────┐ │ │ │ │ │ │
│   │   │   │   │   │   │ 7. TYPOGRAPHY &    │ │ │ │ │ │ │
│   │   │   │   │   │   │    GRAPHIC ACCENTS │ │ │ │ │ │ │
│   │   │   │   │   │   │   ┌──────────────┐ │ │ │ │ │ │ │
│   │   │   │   │   │   │   │ 8. CTA / UI  │ │ │ │ │ │ │ │
│   │   │   │   │   │   │   └──────────────┘ │ │ │ │ │ │ │
│   │   │   │   │   │   └────────────────────┘ │ │ │ │ │ │
│   │   │   │   │   └──────────────────────────┘ │ │ │ │ │
│   │   │   │   └────────────────────────────────┘ │ │ │ │
│   │   │   └──────────────────────────────────────┘ │ │ │
│   │   └────────────────────────────────────────────┘ │ │
│   └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

1.  **Viewport Frame:** The outer boundary establishing responsive scale, crop window, and aspect ratio.
2.  **Base Environment & Paper Field:** The dark ink background and foundational warm paper / photocopy textures.
3.  **Collage Panels:** Illustrated snapshots that slide, overlap, tear, stack, or rotate.
4.  **Character Cut-outs:** Anonymous, high-contrast protagonist silhouettes and poses.
5.  **Environmental Props & Objects:** Recurring thematic items (cups, books, phone, alarm clock) placed within the depth stack.
6.  **Temporal & Narrative Overlays:** The horizontal floating meter and intrusive narrative clock.
7.  **Editorial Typography & Graphic Accents:** Bold headline statements, handwritten marginalia, and acid-green / electric-purple paint marks.
8.  **Interactive Elements / CTA:** Subtle interactive cues and the final brand reveal button.

Layers can be rearranged and animated independently when useful. Not every scene needs every layer.

For the corresponding React software component tree and CSS Z-index mapping, see `architecture.md` Sections 06 and 30.

------------------------------------------------------------------------

# 08. Panel System

The primary storytelling format is an **illustrated snapshot / comic
panel system**.

Panels should not behave like a conventional comic strip.

They can:

-   overlap
-   slide into the composition
-   scale
-   rotate slightly
-   change crop
-   reveal layers
-   disappear or fall away
-   tear apart
-   stack
-   move behind or in front of other elements
-   become partially obscured
-   rearrange between scenes

The goal is to make the user feel that the **composition itself is
changing**, not that they are simply scrolling through static images.

------------------------------------------------------------------------

# 09. World Disintegration & Reconstruction Dynamics

The visual world undergoes a dramatic visual evolution that mirrors the narrative arc while strictly adhering to the same design system:

## 1. Ordered Baseline (Scene 01)
- Clean, balanced collage composition.
- Controlled margins and minimal panel overlap.
- Quiet texture application (subtle paper grain).
- Clear, upright typography and stable horizontal meter.

## 2. Escalating Disintegration (Scenes 02–05)
As intoxication and chaos increase:
- **Density increase:** Panels accumulate and aggressively overlap.
- **Scale distortion:** Recurring objects (cups, bottles, speakers) appear at surreal, oversized scales.
- **Perspective instability:** Artwork frames tilt, rotate, and break their boundaries.
- **Typographic intrusion:** Display text crosses panel borders, scales up, and clashes with artwork.
- **Texture accumulation:** Halftone screens, photocopy noise, scan lines, and tape strips intensify.
- **Meter fragility:** The horizontal meter is pushed across the layout, becoming partially obscured and visually strained.

## 3. Stillness & Collapse (Scene 06)
- At 0%, the hyperactive energy abruptly drops away.
- The composition empties into cold, still, morning realism (empty bed, harsh light, alarm clock).
- Collage pieces settle or fall away into dead silence.

## 4. The Graphic Interruption (Scene 06.5)
- All collage elements vanish, replaced by stark, oversized typography against black:
  > **WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?**
- Zero decorative distraction; maximum typographic impact.

## 5. Active Reconstruction (Scenes 07–08)
The rebuild does not merely rewind the previous frames; it reorganizes into a cleaner, more confident state:
- The meter visibly expands and recharges across the viewport.
- Scattered collage fragments realign and reconnect along clean geometric lines.
- Heavy textures subside into crisp vector edges and balanced paper surfaces.
- The clock transforms from jarring morning alarm into confident resolution.
- The final composition (Scene 08) arrives at composed clarity with the IYKYK brand reveal.

------------------------------------------------------------------------

# 10. Oversized Artwork & Viewport Cropping

This is a core responsive and artistic technique.

Some compositions should intentionally be created **larger than the
visible viewport**.

The viewport acts as a frame over the artwork.

``` text
                LARGE ARTWORK
┌─────────────────────────────────────┐
│                                     │
│       character        clock        │
│                                     │
│   objects       typography          │
│                                     │
└─────────────────────────────────────┘
        ↑                    ↑
     MOBILE               DESKTOP
      CROP                  CROP
```

The same artwork can therefore produce different compositions on
different devices.

## Mobile

Prioritise:

-   character
-   main action
-   key typography
-   essential visual object

## Desktop

Reveal:

-   wider environment
-   secondary collage elements
-   additional panels
-   surrounding texture
-   more negative space

This should feel like intentional art direction, not a responsive
workaround.

------------------------------------------------------------------------

# 11. Responsive Philosophy

The experience is **mobile-first**, but desktop should not feel like a
stretched mobile website.

Use three approaches as appropriate:

## Fixed composition

A complete scene scales responsively within the viewport frame.

## Oversized crop

A larger composition is framed differently at different viewport sizes.

## Layered composition

Individual elements are positioned and animated independently.

The project should favour **asset reuse + composition changes** over
separate mobile and desktop artwork sets.

------------------------------------------------------------------------

# 12. The Meter

The meter is one of the main narrative graphic devices.

It should be:

-   horizontal
-   textured
-   imperfect
-   floaty
-   slightly physical
-   integrated into the collage
-   visually expressive

It should not look like a standard HTML progress bar.

It may:

-   float across a scene
-   overlap artwork
-   sit behind a character
-   become oversized
-   partially disappear
-   shift position
-   change scale
-   act as a framing element

## Narrative behaviour

The meter begins at:

**100%**

and progressively falls:

**100 → 80 → 60 → 40 → 20 → 0**

At the turning point it becomes a major visual event:

**0 → 20 → 40 → 60 → 80 → 100**

The meter is a storytelling metaphor and should not be presented as a
scientifically measured probability.

------------------------------------------------------------------------

# 13. The Clock

The clock is the second recurring narrative device.

It represents the passage of time.

It should not remain permanently fixed as a dashboard element.

Instead it can:

-   appear briefly
-   disappear
-   become oversized
-   overlap panels
-   become analog or digital
-   be partially obscured
-   become part of the collage
-   embed directly into environmental artwork

## Visual progression

-   **9:30 PM (Scene 01):** Subtle, calm bedroom clock (digital or small analog).
-   **10:15 PM – 11:40 PM (Scenes 02–03):** Integrated into the party environment.
-   **1:20 AM – 3:17 AM (Scenes 04–05):** Oversized, distorted, intruding across panels to highlight how dangerously late it has become.
-   **7:58 AM (Scene 06):** Jarring, loud morning alarm display that breaks the party illusion.

------------------------------------------------------------------------

# 14. Graphic Vocabulary

Reusable graphic elements include:

-   arrows
-   stars
-   scribbles
-   smiley marks
-   crowns
-   circles
-   grids
-   tape
-   torn paper
-   paper strips
-   barcode-like marks
-   hand-drawn symbols
-   abstract purple shapes
-   acid-green paint strokes
-   halftone blocks
-   rough underlines

These should be reused throughout the site so the experience develops a
recognisable visual grammar.

------------------------------------------------------------------------

# 15. Motion Direction

Motion should feel **editorial and physical**, not like generic web
animation.

Preferred movement:

-   slow settling
-   sudden panel pushes
-   paper-like reveals
-   controlled rotations
-   scale shifts
-   crop movement
-   layer reveals
-   typography snaps
-   meter expansion
-   clock transitions
-   collage reconstruction

Avoid excessive micro-parallax.

Avoid making every object move continuously with scroll.

The experience should have moments of:

**movement → pause → impact → movement**

------------------------------------------------------------------------

# 16. Scroll Experience

The website should feel like an **interactive illustrated film**.

Scroll is the primary navigation mechanism.

The motion engine couples smooth scrolling with scene choreography (see `architecture.md` Section 18 for implementation).

The scroll should control chapters and compositions rather than simply
scrubbing a rendered video frame-by-frame.

Preferred rhythm:

``` text
SCENE
↓
MOTION
↓
COMPOSITION SETTLES
↓
GRAPHIC INTERRUPTION
↓
NEXT SCENE
```

Some scenes can be pinned while their internal composition changes.
Others can flow naturally into the next scene.

------------------------------------------------------------------------

# 17. Scene Transitions

Approved transition vocabulary:

## Panel Slide

A new panel pushes into the composition from the edge.

## Layer Reveal

Elements appear independently, creating physical collage depth.

## Paper Tear

A torn paper edge reveals the next visual underneath.

## Crop Shift

The visible area moves across oversized artwork like a roving camera.

## Graphic Interruption

The story briefly halts and is replaced by a high-impact, typography-led composition.

## Reconstruction

At the turn, the meter rebuilds and pulls the visual system back into a coherent, confident composition.

Transitions should always belong to the same collage world.

------------------------------------------------------------------------

# 18. Desktop Experience

Desktop should use the additional width to create:

-   wider collage compositions
-   multiple visible panels
-   stronger environmental context
-   more layered artwork
-   deliberate negative space
-   larger graphic interruptions

Desktop should not simply scale everything relative to the viewport.

The wider screen is an opportunity to reveal more of the artwork.

------------------------------------------------------------------------

# 19. Mobile Experience

Mobile is the primary design target.

Priorities:

1.  Story clarity
2.  Character/action
3.  Typography readability
4.  Meter visibility at key moments
5.  Smooth scrolling
6.  Strong compositions
7.  Fast asset loading

Mobile scenes should generally favour one dominant visual focus.

Secondary details can be revealed through crop changes or subsequent
compositions.

------------------------------------------------------------------------

# 20. Creative Medium & Production Constraints

The visual experience is constrained by design to keep the film cinematic, tactile, and performant:

-   **Medium:** 2D composable digital collage and dynamic graphic layers.
-   **Artwork formats:** Vector SVG for crisp geometric and typography marks; high-compression modern raster (WebP/AVIF) for organic illustrations and paper/photocopy textures.
-   **Motion engine:** Coordinated scroll choreography treating the viewport as an editorial camera frame.
-   **Strict medium boundaries:** No Three.js/WebGL 3D environments and no live-action video pipelines. All visual richness is achieved through layered 2D assets, cropping, and print-inspired texture treatments.

For the frontend engineering implementation and technology stack, see `architecture.md` Section 03.

------------------------------------------------------------------------

# 21. Asset Strategy & Production Inventory

Assets are designed for repeated reuse, re-cropping, and recomposition across scenes.

## Character assets
A unified, anonymous, faceless protagonist rendered across key narrative poses:
-   `preparing` (Scene 01: sober, getting ready)
-   `holding-drink` (Scene 02: socialising, first drink)
-   `socialising` (Scene 03: engaged, conversational)
-   `buzzed` (Scene 03: looser posture, energetic)
-   `drinking-partying` (Scene 04: exaggerated, distorted)
-   `dancing` (Scene 05: euphoric, peak movement)
-   `exhausted` (Scene 05/06: collapsing, heavy)
-   `passed-out` (Scene 06: prone on bed, motionless)
-   `reassembled` / `confident` (Scene 08: composed, resolute, morning clarity)

## Environment assets
-   `bedroom` (preparation context)
-   `desk-study-area` (academic context, books, timetable)
-   `party-environment` (social crowd silhouettes, party interior)
-   `bed` (morning aftermath)
-   `morning-environment` (cold morning light, harsh realism)

## Object assets
-   `drinks` / `cups` (cups, glassware, bottles)
-   `phone` (text messages, notifications, clock display)
-   `speakers` (sound waves, vibration marks)
-   `books` / `college-bag` / `desk-objects` (reminders of tomorrow's responsibility)
-   `alarm-clock` (morning interruption)
-   `party-objects` (confetti, paper streamers)

## Texture assets
-   `paper-fibres` (warm tactile background)
-   `photocopy-grain` (high-contrast noise)
-   `halftone-dots` (comic print screening)
-   `torn-edges` (rips, irregular borders)
-   `tape` (clear and masking tape strips holding collage panels)
-   `scratches` / `scan-lines` / `rough-ink` (print imperfection overlays)

## Graphic vocabulary marks
For the complete catalog of reusable graphic marks, arrows, stars, paint strokes, and symbols, see Section 14.

------------------------------------------------------------------------

# 22. Visual Asset Optimization & Efficiency

Because the collage style is visually dense, asset efficiency must be designed into the artwork from the start:

-   **Raster compression:** Convert all continuous-tone artwork and textures to modern WebP or AVIF formats.
-   **Vector priority:** Use SVG for all geometric marks, graphic vocabulary symbols, clock hands/numerals, and meter frames.
-   **Asset reuse:** Recompose the same character poses and environment fragments across multiple scenes rather than exporting unique full-screen artwork for every beat.
-   **Viewport cropping over duplicate exports:** Use oversized master artwork and viewport cropping rules rather than rendering separate mobile and desktop bitmap files.
-   **Texture layer discipline:** Avoid stacking multiple heavy full-viewport raster textures; combine textures into single composite maps or reusable SVG patterns where feasible.

For runtime DOM compositing, GPU memory, and GSAP ticker optimization, see `architecture.md` Section 35.

------------------------------------------------------------------------

# 23. Accessibility & Usability

The visual language can be chaotic, but the interface cannot become
unusable.

Maintain:

-   readable body text with high typographic contrast
-   WCAG AA color contrast against dark backgrounds
-   clear CTA hover, focus, and active visual states
-   accessible interactive tap targets (minimum 44x44px)
-   reduced-motion consideration (content readable without motion)
-   meaningful alternative text for important narrative imagery

Decorative texture should never interfere with essential content.

------------------------------------------------------------------------

# 24. Content & Brand Guardrails

The site is a pre-launch teaser.

Do not invent:

-   launch dates
-   testimonials
-   social proof
-   product specifications
-   formulation claims
-   medical claims
-   efficacy guarantees
-   unsupported product benefits

The meter remains a **creative storytelling device**.

The experience should create curiosity and lead naturally into the IYKYK
reveal and **KNOW MORE** CTA.

------------------------------------------------------------------------

# 25. Creative & Visual Guardrails

The visual language must remain consistent from beginning to end.

## Always

-   **Canonical palette:** Ink Black, Warm Paper, Electric Purple, Acid Green.
-   **Collage-driven composition:** Distinct layers, physical paper aesthetics, tactile cut-outs.
-   **Imperfect edges:** Torn paper, tape, halftone screens, photocopy noise.
-   **Anonymous protagonist:** Faceless or obscured, expressive through pose and silhouette.
-   **Bold editorial typography:** High-contrast, condensed display type paired with clean sans-serif body copy.
-   **Intentional compositional shifts:** Pacing that moves between movement, pause, and impact.
-   **Cinematic scroll rhythm:** Scroll triggers composition changes rather than mechanical video scrubbing.

## Avoid

-   Switching into realistic photographic or video footage.
-   Sudden clean corporate UI, SaaS cards, or generic tech-startup layouts.
-   Generic drop shadows, blurry pastel gradients, or glassmorphic blur effects.
-   Separate visual aesthetics for different story acts (the world evolves, but the visual rules remain unbroken).
-   Conventional dashboard HUD or fixed navbar.
-   Excessive 3D models or WebGL environments.
-   Overly literal medical, nutritional, or product performance claims.
-   Treating the meter as a scientifically measured probability or clinical diagnostic.

------------------------------------------------------------------------

# 26. What This Design System Is Not

This is not:

-   a traditional SaaS landing page
-   a product dashboard
-   a 3D microsite
-   a realistic video site
-   a clean minimalist brand system
-   a collection of unrelated poster designs
-   a mobile design later stretched for desktop

It is:

> **One illustrated visual world that changes state as the story
> progresses.**

------------------------------------------------------------------------

# 27. Source-of-Truth Documents

The project is governed by three coordinated documents with strict separation of concerns:

## `storyboard.md` (Narrative Source of Truth)
Defines:
-   narrative sequence and story beats
-   scene-by-scene script and copy
-   meter percentage states (100% → 0% → 100%)
-   clock times and chronological progression
-   character emotional journey
-   the turning question and final CTA messaging

## `design.md` (Visual & Experience Design Source of Truth)
Defines:
-   visual identity, colour hierarchy, and palette tokens
-   typography pairing and treatment rules
-   texture, photocopy, and collage language
-   illustration direction and character design
-   visual hierarchy and composition stack
-   world disintegration and reconstruction dynamics
-   panel system and composition rules
-   responsive framing and viewport cropping philosophy
-   motion aesthetics and transition types
-   asset inventory and creative guardrails

## `architecture.md` (Implementation & Engineering Source of Truth)
Defines:
-   frontend technology stack (React, Vite, TypeScript, GSAP, ScrollTrigger, Lenis)
-   runtime architecture and component hierarchy
-   declarative scene data models and TypeScript contracts
-   animation orchestration, ScrollTrigger pinning, and Lenis integration
-   CSS token structure, z-index layering, and responsive frame components
-   runtime performance architecture, image preloading, and lifecycle cleanup
-   testing, browser compatibility, and deployment pipeline

------------------------------------------------------------------------

# 28. Final Design Principle

**Same style. Same world. Different states.**

The visual language never changes.

What changes is:

-   the character's state
-   the density of the composition
-   the passage of time
-   the meter
-   the amount of chaos
-   the arrangement of the collage

The user should feel that they are moving through **one continuous
illustrated world**, not navigating between separate web sections.
