# IYKYK --- Design System & Experience Design

## 01. Purpose

This document defines the visual, interaction, responsive, and
implementation-facing design rules for the IYKYK pre-launch experience.

The **storyboard.md** defines the narrative sequence and scene-by-scene
story.

This document defines **how that story should look and feel**.

The experience is a mobile-first, scroll-driven illustrated film built
from editorial collage compositions rather than conventional
landing-page sections or realistic video.

------------------------------------------------------------------------

## 02. Design North Star

### Core feeling

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

## 03. Visual Identity

### Canonical colour palette

  Colour            Hex         Primary role
  ----------------- ----------- -------------------------------------------
  Ink Black         `#0B0B0B`   Primary background / dominant field
  Warm Paper        `#EDE4D9`   Paper, cards, typography, contrast
  Electric Purple   `#7A3BFF`   Energy, atmosphere, secondary accent
  Acid Green        `#39EF88`   Highlight, interaction, CTA, visual punch

### Colour hierarchy

The interface should remain predominantly dark.

A useful starting distribution is:

-   **Black:** dominant
-   **Paper:** structural contrast
-   **Purple:** energetic accent
-   **Green:** sharp highlight / action

Green should feel more precious than purple. Use it for moments that
need attention rather than covering the interface in neon green.

------------------------------------------------------------------------

## 04. Typography

Typography is a major visual component rather than merely a content
layer.

### Display

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

### Body / UI

Use a clean modern sans-serif for:

-   supporting copy
-   labels
-   technical information
-   small navigation
-   CTA supporting text

The body font should provide contrast against the expressive display
typography.

### Handwritten / custom type

Use selectively for:

-   annotations
-   marginalia
-   arrows
-   short phrases
-   collage notes
-   expressive interruptions

Do not use handwritten type for long-form content.

------------------------------------------------------------------------

## 05. Texture Language

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

## 06. Illustration Direction

### Character

The protagonist should remain:

-   anonymous
-   faceless or obscured
-   non-recognisable
-   editorial
-   silhouette-driven where appropriate
-   expressive through pose rather than facial detail

### Illustration treatment

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

## 07. Composition System

The website is built around **composable editorial scenes**.

Do not think of each scene as a single flat image.

Think in layers:

``` text
BACKGROUND
    ↓
PAPER / TEXTURE
    ↓
ENVIRONMENT
    ↓
CHARACTER
    ↓
OBJECTS
    ↓
CLOCK
    ↓
METER
    ↓
TYPOGRAPHY
    ↓
GRAPHIC MARKS
```

Layers can be rearranged and animated independently when useful.

Not every scene needs every layer.

------------------------------------------------------------------------

## 08. Panel System

The primary storytelling format is an **illustrated snapshot / comic
panel system**.

Panels should not behave like a conventional comic strip.

They can:

-   overlap
-   slide
-   scale
-   rotate
-   crop
-   reveal
-   disappear
-   tear
-   stack
-   move behind other elements
-   become part of larger compositions

The goal is to make the user feel that the **composition itself is
changing**, not that they are simply scrolling through images.

------------------------------------------------------------------------

## 09. Oversized Artwork & Viewport Cropping

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

### Mobile

Prioritise:

-   character
-   main action
-   key typography
-   essential visual object

### Desktop

Reveal:

-   wider environment
-   secondary collage elements
-   additional panels
-   surrounding texture
-   more negative space

This should feel like intentional art direction, not a responsive
workaround.

------------------------------------------------------------------------

## 10. Responsive Philosophy

The experience is **mobile-first**, but desktop should not feel like a
stretched mobile website.

Use three approaches as appropriate:

### Fixed composition

A complete scene scales responsively.

### Oversized crop

A larger composition is framed differently at different viewport sizes.

### Layered composition

Individual elements are positioned and animated independently.

The project should favour **asset reuse + composition changes** over
separate mobile and desktop artwork sets.

------------------------------------------------------------------------

## 11. The Meter

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

### Narrative behaviour

The meter begins at:

**100%**

and progressively falls:

**100 → 80 → 60 → 40 → 20 → 0**

At the turning point it becomes a major visual event:

**0 → 20 → 40 → 60 → 80 → 100**

The meter is a storytelling metaphor and should not be presented as a
scientifically measured probability.

------------------------------------------------------------------------

## 12. The Clock

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

The clock should become increasingly intrusive as the night progresses.

At the end of the night, the morning clock/alarm should create a strong
contrast with the party sequence.

------------------------------------------------------------------------

## 13. Graphic Vocabulary

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

## 14. Motion Direction

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

## 15. Scroll Experience

The website should feel like an **interactive illustrated film**.

Scroll is the primary navigation mechanism.

Use **Lenis** for smooth scrolling and **GSAP/ScrollTrigger** for
choreography.

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

## 16. Scene Transitions

Approved transition vocabulary:

### Panel Slide

A new panel pushes into the composition.

### Layer Reveal

Elements appear independently, creating depth.

### Paper Tear

A torn paper edge reveals the next visual.

### Crop Shift

The visible area moves across oversized artwork.

### Graphic Interruption

The story briefly becomes a typography-led composition.

### Reconstruction

At the end, the meter rebuilds and pulls the visual system back into a
coherent composition.

Transitions should always belong to the same collage world.

------------------------------------------------------------------------

## 17. Desktop Experience

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

## 18. Mobile Experience

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

## 19. Technical Foundation

### Frontend

-   React
-   Vite
-   TypeScript

### Motion

-   GSAP
-   ScrollTrigger
-   **Lenis**

### Graphics

-   CSS
-   SVG
-   Raster illustrations/textures where appropriate

No full 3D environment is required.

No realistic video is required.

The experience should be constructed from composable 2D assets.

------------------------------------------------------------------------

## 20. Component Architecture

A useful conceptual structure:

``` text
Experience
│
├── Scene
│   ├── Composition
│   ├── Layers
│   ├── Clock
│   ├── Meter
│   └── Typography
│
├── GraphicInterruption
│
└── Reveal
```

Each scene should be independently understandable and reusable.

Narrative data should remain separate from presentation logic wherever
practical.

------------------------------------------------------------------------

## 21. Asset Strategy

### Character assets

Create a limited reusable set of protagonist poses:

-   preparing
-   holding drink
-   socialising
-   buzzed
-   drinking/partying
-   dancing
-   exhausted
-   passed out

### Environment assets

-   bedroom
-   desk/study area
-   party environment
-   bed
-   morning environment
-   college-related objects

### Object assets

-   drinks
-   cups
-   phone
-   speakers
-   books
-   college bag
-   alarm clock
-   party objects

### Texture assets

-   paper
-   photocopy grain
-   halftone
-   torn edges
-   tape
-   scribbles
-   rough marks

Assets should be designed for reuse and recomposition.

------------------------------------------------------------------------

## 22. Performance

The visual system is intentionally asset-heavy, so performance is part
of the design.

### Requirements

-   Optimise raster images.
-   Prefer SVG for simple graphic elements.
-   Reuse assets.
-   Avoid unnecessary duplicate mobile/desktop exports.
-   Lazy-load heavy scenes/assets where appropriate.
-   Keep continuous animations limited.
-   Prefer transform/opacity-based animation.
-   Avoid large unnecessary video files.
-   Avoid full 3D.
-   Keep independently animated layers under control.

The goal is for the experience to feel **rich without feeling heavy**.

------------------------------------------------------------------------

## 23. Accessibility & Usability

The visual language can be chaotic, but the interface cannot become
unusable.

Maintain:

-   readable body text
-   sufficient contrast
-   clear CTA states
-   accessible interactive targets
-   logical DOM order
-   reduced-motion consideration
-   meaningful alternative text for important non-decorative imagery

Decorative texture should never interfere with essential content.

------------------------------------------------------------------------

## 24. Content & Brand Guardrails

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

## 25. What This Design System Is Not

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

## 26. Source-of-Truth Documents

### `design.md`

Defines:

-   visual identity
-   colour
-   typography
-   texture
-   illustration
-   composition
-   responsive philosophy
-   motion language
-   technical design principles
-   asset strategy
-   performance and content guardrails

### `storyboard.md`

Defines:

-   narrative
-   scene sequence
-   scene timing
-   meter states
-   clock states
-   character states
-   transitions
-   rebuild sequence
-   final reveal

The two documents should be used together.

------------------------------------------------------------------------

## 27. Final Design Principle

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
