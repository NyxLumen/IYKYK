# IYKYK --- Architecture

# 01. Purpose

This document defines the implementation architecture for the IYKYK
pre-launch experience.

It translates the rules in:

-   `design.md` --- visual identity, art direction, composition rules, motion aesthetics, and asset strategy
-   `storyboard.md` --- narrative sequence, story beats, scene script, meter progression, and copy

into a practical frontend structure.

The goal is to build a **mobile-first, scroll-driven illustrated film**
using composable 2D assets, not a traditional landing page, video
scrubber or full 3D scene.

------------------------------------------------------------------------

# 02. Architecture Principles

The implementation should follow these principles:

1.  **Story is data.** Scene content, meter state, clock state and
    composition mode should be declarative.

2.  **Visual composition is separate from story data.** A scene should
    describe what happens; components decide how it is rendered.

3.  **Animation is orchestrated centrally.** GSAP/ScrollTrigger should
    control scene timelines rather than every component independently
    attaching arbitrary scroll listeners.

4.  **Lenis owns smooth scrolling.** GSAP should respond to the scroll
    system rather than replacing native scrolling with a custom scroll
    implementation.

5.  **Assets are reusable.** The same character, texture, clock, meter
    and graphic elements should be composable across multiple scenes.

6.  **Responsive composition is intentional.** Mobile and desktop should
    often use the same artwork with different crop, scale and
    positioning rules.

7.  **2D first.** No Three.js, WebGL scene or full 3D pipeline is
    required.

8.  **Performance is a feature.** Heavy artwork must be loaded and
    animated deliberately.

------------------------------------------------------------------------

# 03. Technology Stack

## Core

-   React
-   Vite
-   TypeScript

## Animation

-   GSAP
-   ScrollTrigger
-   Lenis

## Rendering

-   HTML
-   CSS
-   SVG
-   Optimised raster images

## Optional utilities

Only add additional libraries when they solve a concrete problem.

Avoid accumulating animation/layout libraries simply because they exist.
The project already has enough moving parts without inviting the entire
npm ecosystem to dinner.

------------------------------------------------------------------------

# 04. High-Level Runtime Model

The application can be thought of as four layers:

``` text
┌─────────────────────────────────────────┐
│              EXPERIENCE UI              │
│                                         │
│  Scene 01 → Scene 02 → ... → Reveal    │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│          SCENE / COMPOSITION            │
│                                         │
│ background / panels / character / type  │
│ clock / meter / textures / graphics     │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│           ANIMATION SYSTEM              │
│                                         │
│ GSAP + ScrollTrigger + scene timelines  │
└─────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│             SCROLL SYSTEM               │
│                                         │
│                 Lenis                   │
└─────────────────────────────────────────┘
```

The important relationship is:

**Lenis → scroll position → ScrollTrigger → scene timeline → visual
state**

------------------------------------------------------------------------

# 05. Suggested Project Structure

``` text
src/
├── app/
│   ├── App.tsx
│   ├── routes.ts
│   └── providers/
│       └── AnimationProvider.tsx
│
├── experience/
│   ├── Experience.tsx
│   ├── ExperienceShell.tsx
│   │
│   ├── scenes/
│   │   ├── Scene.tsx
│   │   ├── Scene01Plan.tsx
│   │   ├── Scene02FirstDrink.tsx
│   │   ├── Scene03Buzzed.tsx
│   │   ├── Scene04Drunk.tsx
│   │   ├── Scene05PartyPeak.tsx
│   │   ├── Scene06PassedOut.tsx
│   │   ├── QuestionScene.tsx
│   │   ├── RebuildScene.tsx
│   │   └── RevealScene.tsx
│   │
│   ├── components/
│   │   ├── Composition.tsx
│   │   ├── Panel.tsx
│   │   ├── Layer.tsx
│   │   ├── Clock.tsx
│   │   ├── Meter.tsx
│   │   ├── TypographyLayer.tsx
│   │   ├── GraphicMark.tsx
│   │   └── TextureLayer.tsx
│   │
│   ├── animation/
│   │   ├── useSceneTimeline.ts
│   │   ├── useScrollScene.ts
│   │   ├── sceneTimelines.ts
│   │   ├── transitions.ts
│   │   └── easing.ts
│   │
│   └── data/
│       ├── scenes.ts
│       ├── assets.ts
│       └── breakpoints.ts
│
├── components/
│   ├── Button.tsx
│   ├── ImageAsset.tsx
│   └── ResponsiveFrame.tsx
│
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   ├── typography.css
│   └── textures.css
│
├── assets/
│   ├── characters/
│   ├── environments/
│   ├── objects/
│   ├── textures/
│   ├── graphics/
│   └── brand/
│
└── main.tsx
```

The exact folder naming can change during implementation. The separation
of responsibilities should not.

------------------------------------------------------------------------

# 06. Application Shell & Component Hierarchy

The application has a lightweight top-level shell that coordinates scroll
and narrative scenes:

``` text
App
└── ExperienceShell
    ├── LenisProvider / ScrollController
    ├── GlobalOverlay / DebugLayer (dev only)
    └── Experience
        ├── Scene (plan, first-drink, buzzed, drunk, party-peak, passed-out)
        │   ├── Composition (fixed | crop | layered)
        │   │   ├── ResponsiveFrame
        │   │   ├── Panel[]
        │   │   └── Layer[] (background, environment, character, objects, texture)
        │   ├── Clock (digital | analog | oversized)
        │   ├── Meter (story mode | rebuild mode)
        │   └── TypographyLayer
        ├── QuestionScene (graphic interruption)
        ├── RebuildScene (reconstruction sequence)
        └── RevealScene (IYKYK brand payoff & CTA)
```

There should not be a traditional multi-page navigation system unless
the final product requirements introduce one.

The primary experience is one continuous scroll journey. All scenes are
mapped declaratively from the scene registry, keeping presentation and
narrative concerns decoupled.

------------------------------------------------------------------------

# 07. Scene Architecture

Each scene should have three conceptual parts:

``` text
Scene
├── Narrative State
├── Composition
└── Animation Timeline
```

For example:

``` ts
type SceneConfig = {
  id: string;
  time?: string;
  meter?: number;
  composition: CompositionMode;
  assets: AssetReference[];
  layers: LayerConfig[];
  animation: AnimationConfig;
};
```

The scene component should consume this information rather than
hard-coding every visual property into JSX.

------------------------------------------------------------------------

# 08. Scene Types

Use three primary composition modes:

``` ts
type CompositionMode = "fixed" | "crop" | "layered";
```

## Fixed (`"fixed"`)

A complete illustration scales within the viewport.

Use for:

-   simpler scenes
-   graphic interruptions
-   final reveal

## Oversized Crop (`"crop"`)

The artwork is larger than the viewport and the visible frame reveals
only part of it.

Use for:

-   high-impact party scenes
-   distorted drunk state
-   artistic mobile/desktop differences

## Layered (`"layered"`)

The composition consists of independently positioned elements.

Use for:

-   important transitions
-   meter interactions
-   clock interactions
-   reconstruction sequence
-   scenes where depth is important

------------------------------------------------------------------------

# 09. Scene Data Model

A scene can be represented approximately as:

``` ts
type SceneConfig = {
  id: string;
  title: string;

  time?: string;

  meter?: {
    value: number;
    visible?: boolean;
  };

  composition: {
    mode: "fixed" | "crop" | "layered";

    mobile?: {
      scale?: number;
      x?: number;
      y?: number;
      focus?: string;
    };

    desktop?: {
      scale?: number;
      x?: number;
      y?: number;
      focus?: string;
    };
  };

  layers: LayerConfig[];

  transition?: TransitionConfig;
};
```

This is a conceptual model, not a requirement to freeze the exact
TypeScript interface before implementation.

------------------------------------------------------------------------

# 10. Layer Model

A layer should be independently addressable when it needs animation.

``` ts
type LayerConfig = {
  id: string;
  type:
    | "image"
    | "svg"
    | "text"
    | "clock"
    | "meter"
    | "texture"
    | "graphic";

  asset?: string;

  position?: {
    x: number;
    y: number;
  };

  scale?: number;
  rotation?: number;
  opacity?: number;
  zIndex?: number;

  mobile?: Partial<LayerPosition>;
  desktop?: Partial<LayerPosition>;
};
```

Layers that never animate do not need to be unnecessarily separated.

The goal is controlled composability, not maximum fragmentation.

------------------------------------------------------------------------

# 11. Asset Architecture

Assets should be grouped by function.

``` text
assets/
├── characters/
│   ├── protagonist-ready.webp
│   ├── protagonist-drink.webp
│   ├── protagonist-buzzed.webp
│   ├── protagonist-drunk.webp
│   ├── protagonist-dance.webp
│   ├── protagonist-exhausted.webp
│   ├── protagonist-passed-out.webp
│   └── protagonist-reassembled.webp
│
├── environments/
│   ├── bedroom.webp
│   ├── party.webp
│   ├── bed.webp
│   └── morning.webp
│
├── objects/
│   ├── phone.svg
│   ├── books.svg
│   ├── cup.svg
│   ├── speaker.svg
│   └── bag.svg
│
├── textures/
│   ├── paper.webp
│   ├── photocopy.webp
│   ├── halftone.svg
│   └── grain.webp
│
├── graphics/
│   ├── arrows.svg
│   ├── scribbles.svg
│   ├── stars.svg
│   └── torn-paper.svg
│
└── brand/
    └── iykyk.svg
```

Exact filenames will depend on final production assets.

------------------------------------------------------------------------

# 12. Asset Formats

## SVG

Prefer SVG for:

-   meter
-   clock graphics
-   arrows
-   simple marks
-   icons
-   logos
-   simple typography graphics
-   geometric shapes

## WebP / AVIF

Prefer modern compressed raster formats for:

-   large illustrations
-   photographic/collage imagery
-   textures
-   environments

## PNG

Use only when transparency or source constraints make it necessary.

## Video

No realistic video is required for the planned architecture.

Avoid video unless a future approved creative direction specifically
introduces it.

------------------------------------------------------------------------

# 13. Responsive Composition Architecture

The responsive system should not duplicate every scene.

Instead:

``` text
Scene Asset
     ↓
Composition Frame
     ↓
Breakpoint Rules
     ↓
Mobile / Desktop Crop
```

A reusable `ResponsiveFrame` can expose:

``` tsx
<ResponsiveFrame
  mobile={{ scale: 1.35, x: -12, y: 4 }}
  desktop={{ scale: 1.0, x: 0, y: 0 }}
>
  <Artwork />
</ResponsiveFrame>
```

The implementation can use CSS custom properties, data attributes, or
GSAP values depending on the animation requirements.

------------------------------------------------------------------------

# 14. Viewport Cropping

Oversized artwork should be rendered inside a clipped frame.

Conceptually:

``` css
.frame {
  position: relative;
  overflow: hidden;
}

.artwork {
  position: absolute;
  width: 120%;
  height: 120%;
}
```

The actual scale and dimensions should be tuned per scene.

For animated crop movement, GSAP can manipulate:

-   `x`
-   `y`
-   `scale`
-   `rotation`

The crop itself becomes part of the camera language.

------------------------------------------------------------------------

# 15. Animation Architecture

Animation should be scene-oriented.

Avoid scattering ScrollTrigger instances throughout every visual
component.

Prefer:

``` text
Scene
  ↓
useSceneTimeline()
  ↓
GSAP timeline
  ↓
Layer refs
```

A scene timeline should own the major choreography for that scene.

Example conceptual structure:

``` ts
const timeline = gsap.timeline();

timeline
  .from(panel, { ... })
  .from(clock, { ... }, "<")
  .to(meter, { ... })
  .to(texture, { ... });
```

The actual values should be determined during visual implementation.

------------------------------------------------------------------------

# 16. ScrollTrigger Architecture

Each major scene can have a ScrollTrigger-controlled timeline.

Conceptually:

``` ts
ScrollTrigger.create({
  trigger: sceneRef,
  start: "top top",
  end: "+=1800",
  pin: true,
  scrub: 1,
  animation: timeline,
});
```

Not every scene needs to be pinned.

Use pinning when the composition needs enough scroll distance for
internal animation.

Use normal document flow when a scene can transition naturally.

------------------------------------------------------------------------

# 17. Lenis Architecture

Lenis should provide the smooth scrolling layer.

Conceptual runtime:

``` text
User scroll input
       ↓
     Lenis
       ↓
smooth scroll position
       ↓
ScrollTrigger.update()
       ↓
GSAP scene timelines
```

The application should initialise Lenis once at the experience level
rather than once per scene.

Avoid multiple independent smooth-scroll controllers.

------------------------------------------------------------------------

# 18. Lenis + GSAP Synchronisation

The implementation should establish a single integration between Lenis
and GSAP/ScrollTrigger.

Conceptually:

``` ts
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

The exact integration should follow the installed versions' current
APIs.

The important rule is that Lenis and ScrollTrigger share one consistent
scroll state.

------------------------------------------------------------------------

# 19. Animation Lifecycle

Every scene should clean up its animation context when unmounted.

Use GSAP context or an equivalent cleanup strategy.

Conceptually:

``` ts
const ctx = gsap.context(() => {
  // scene animation
}, sceneRef);

return () => ctx.revert();
```

This prevents:

-   duplicate timelines
-   stale ScrollTriggers
-   memory leaks
-   animations running against removed DOM
-   development hot-reload chaos

------------------------------------------------------------------------

# 20. Meter Architecture

The meter should be a reusable component:

``` tsx
<Meter
  value={scene.meter.value}
  mode="story"
/>
```

It should not be implemented as a native progress bar.

The component should expose a visual value that GSAP can animate.

Conceptually:

``` ts
meter.setValue(80);
```

or:

``` ts
gsap.to(meterState, {
  value: 80,
  onUpdate: renderMeter,
});
```

The visual fill should be SVG/CSS-driven where practical.

------------------------------------------------------------------------

# 21. Meter State

The narrative meter values are:

``` ts
const storyMeter = [
  100,
  80,
  60,
  40,
  20,
  0,
];
```

The rebuild sequence is:

``` ts
const rebuildMeter = [
  0,
  20,
  40,
  60,
  80,
  100,
];
```

The meter is illustrative.

The implementation must not imply that the percentages are
scientifically calculated probabilities.

------------------------------------------------------------------------

# 22. Clock Architecture

The clock should be a reusable component:

``` tsx
<Clock
  time="03:17 AM"
  variant="digital"
/>
```

Possible variants:

``` ts
type ClockVariant =
  | "digital"
  | "analog"
  | "oversized";
```

The clock can be animated independently of the scene.

The displayed time should be driven by scene data rather than calculated
from the user's real-world time.

This is a narrative timeline, not a live clock.

------------------------------------------------------------------------

# 23. Typography Architecture

Large statements should be rendered as real text whenever possible.

Do not convert every piece of typography into raster images.

Use CSS for:

-   scale
-   tracking
-   line-height
-   rotation
-   clipping
-   transforms

Use raster/SVG typography only when a specific distressed/custom
treatment cannot be reproduced reliably with the selected font.

------------------------------------------------------------------------

# 24. Graphic Interruption Architecture

The question scene is a distinct experience state.

Conceptually:

``` text
Scene 06
    ↓
0%
    ↓
freeze
    ↓
QuestionScene
    ↓
RebuildScene
```

The question should not inherit unnecessary scene UI.

It should have a dedicated composition component:

``` tsx
<QuestionScene
  text="WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?"
/>
```

The typography should dominate.

------------------------------------------------------------------------

# 25. Reconstruction Architecture

The rebuild is one of the most important animation sequences.

It should not simply reverse Scene 06.

Instead:

``` text
0%
 ↓
meter expands
 ↓
collage fragments move
 ↓
panels reconnect
 ↓
clock transforms
 ↓
typography settles
 ↓
composition becomes coherent
 ↓
100%
 ↓
IYKYK reveal
```

This can be implemented as one controlled GSAP timeline spanning the
rebuild section.

------------------------------------------------------------------------

# 26. Scene Registry

A central registry makes the story easier to modify.

Example:

``` ts
export const scenes = [
  scene01Plan,
  scene02FirstDrink,
  scene03Buzzed,
  scene04Drunk,
  scene05PartyPeak,
  scene06PassedOut,
  questionScene,
  rebuildScene,
  revealScene,
];
```

The `Experience` component can map over the registry.

This keeps narrative ordering explicit and makes it easier to
add/remove/reorder scenes.

------------------------------------------------------------------------

# 27. Suggested Scene IDs

Use stable IDs:

``` text
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

These IDs can also be useful for:

-   analytics
-   debugging
-   QA
-   screenshots
-   deep internal testing
-   development markers

------------------------------------------------------------------------

# 28. State Management

A large global state library is not necessary for the planned
experience.

Prefer:

-   React props
-   local component state
-   scene configuration
-   GSAP animation state

Only introduce global state if there is a concrete cross-scene
requirement.

The primary narrative state can remain declarative in the scene
registry.

------------------------------------------------------------------------

# 29. CSS Architecture

Use a small set of global design tokens.

Example:

``` css
:root {
  --color-ink: #0B0B0B;
  --color-paper: #EDE4D9;
  --color-purple: #7A3BFF;
  --color-green: #39EF88;
}
```

Additional tokens can cover:

-   spacing
-   typography scale
-   z-index layers
-   border widths
-   texture opacity
-   scene timing constants

Avoid scattering raw colour values across components.

------------------------------------------------------------------------

# 30. Z-Index System

Because the experience is collage-driven, layering needs an explicit
system.

Example:

``` text
0     background
10    paper
20    environment
30    character
40    objects
50    texture
60    clock
70    meter
80    typography
90    interaction / CTA
100   transition overlay
```

Actual values can change.

The important thing is that layering is intentional and consistent.

------------------------------------------------------------------------

# 31. Interaction Architecture

The experience is primarily scroll-driven.

Interactive elements should remain limited and meaningful.

Primary interaction:

**scroll**

Secondary interaction:

**KNOW MORE**

Potential future interactions can be added without changing the scene
architecture.

Avoid adding interactions simply to make the page "feel interactive."

The visual storytelling already provides the interaction.

------------------------------------------------------------------------

# 32. CTA Architecture

The final CTA should be a reusable component:

``` tsx
<CTA
  label="KNOW MORE"
  href="/..."
/>
```

The exact destination is not assumed by this architecture.

If the final CTA becomes an early-access form or registration flow, the
implementation can add that functionality without changing the core
scene system.

------------------------------------------------------------------------

# 33. Accessibility Architecture

The animation layer must not become the only way to understand the site.

Requirements:

-   Semantic HTML
-   Real text for important messaging
-   Accessible CTA
-   Logical reading order
-   Appropriate alt text
-   Keyboard-accessible interactive elements
-   Reduced-motion mode

The visual experience can be rich while the underlying document remains
understandable.

------------------------------------------------------------------------

# 34. Reduced Motion

Respect:

``` css
@media (prefers-reduced-motion: reduce) {
  /* simplify scene transitions */
}
```

In reduced-motion mode:

-   disable unnecessary smooth scrolling
-   reduce large transforms
-   reduce rotation
-   avoid rapid movement
-   preserve scene order
-   preserve the meter states
-   preserve the narrative

The story should remain intact without requiring the full animation
system.

------------------------------------------------------------------------

# 35. Performance Architecture

## Images

-   Use modern image formats (WebP, AVIF) with fallback.
-   Resize assets to realistic maximum display sizes; never serve 4K desktop artwork to mobile viewports.
-   Avoid duplicate art exports; prefer responsive viewport cropping of master compositions.
-   Use responsive image sources (`srcset` / `<picture>`) where practical.

## Scene loading

Heavy assets should be loaded close to when they are needed:

``` text
Initial load
  ↓
Scene 01 assets
  ↓
preload Scene 02
  ↓
Scene 02
  ↓
preload Scene 03
  ↓
...
```

Do not aggressively preload the entire experience upfront if it creates a large
initial network payload.

## Animation & GPU Compositing

-   **Composited properties only:** Animate strictly with `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`.
-   **Zero layout thrashing:** Never animate geometric layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`) during scroll.
-   **Layer budget:** Cap independently animated DOM elements per scene (aim for <= 8 animated nodes per viewport) to keep GPU compositing memory within mobile browser limits.
-   **No continuous idle loops:** ScrollTrigger pins and scrubs should remain idle when the user is not actively scrolling. Avoid continuous background canvas or requestAnimationFrame loops that drain battery.
-   **Ticker & Scroll sync:** Use `gsap.ticker.lagSmoothing(0)` to prevent visual stuttering and jumping when scrolling resumes.
-   **Lifecycle cleanup:** Guarantee every GSAP timeline is created within a `gsap.context()` and reverted on unmount to eliminate memory leaks.

------------------------------------------------------------------------

# 36. Image Preloading Strategy

The first scene should receive priority.

Assets for the next scene can be prefetched once the user is
sufficiently close to the current scene.

The exact threshold should be tested rather than guessed.

A lightweight asset manifest keyed by canonical scene ID (see Section 27) can support this:

``` ts
const sceneAssets: Record<SceneId, AssetReference[]> = {
  'plan': [...],
  'first-drink': [...],
  'buzzed': [...],
  'drunk': [...],
  'party-peak': [...],
  'passed-out': [...],
  'question': [...],
  'rebuild': [...],
  'reveal': [...],
};
```

------------------------------------------------------------------------

# 37. Development / Debug Mode

A development-only debug layer is recommended.

Useful debug information:

``` text
SCENE: drunk
METER: 40%
CLOCK: 01:20 AM
BREAKPOINT: mobile
COMPOSITION: crop
SCROLL PROGRESS: 0.62
```

This should never appear in production.

A simple debug toggle can save a surprising amount of time when tuning
ScrollTrigger timelines.

------------------------------------------------------------------------

# 38. Breakpoint Strategy

Do not build around a huge collection of arbitrary breakpoints.

Use a small number of meaningful layout states, for example:

``` ts
type ViewportMode =
  | "mobile"
  | "tablet"
  | "desktop";
```

The exact pixel thresholds should be defined during implementation based
on the actual compositions.

The design principle is:

**composition changes when the artwork needs it, not because a framework
happens to have a breakpoint.**

------------------------------------------------------------------------

# 39. Testing Strategy

Test every major scene on:

## Mobile

-   narrow phone
-   larger phone
-   portrait orientation

## Tablet

-   portrait
-   landscape

## Desktop

-   laptop
-   large desktop
-   wide desktop

Check:

-   crop
-   typography
-   meter position
-   clock position
-   panel overlap
-   CTA visibility
-   scroll timing
-   pinned sections
-   image loading
-   animation cleanup

------------------------------------------------------------------------

# 40. Browser Considerations

The implementation should target modern evergreen browsers.

Test at minimum:

-   Chrome
-   Safari
-   Firefox
-   Chromium-based mobile browsers
-   iOS Safari
-   Android Chrome

Pay particular attention to mobile Safari because smooth scrolling,
viewport sizing and pinned animation behaviour can differ from desktop
browsers.

------------------------------------------------------------------------

# 41. Deployment Architecture

The project is suitable for a static/frontend deployment.

Recommended model:

``` text
Git repository
      ↓
Vercel build
      ↓
Static React/Vite application
      ↓
CDN delivery
```

The experience does not require a backend for its core animation/story
layer.

If an early-access form is introduced, that can be connected
independently through an appropriate API/service.

------------------------------------------------------------------------

# 42. Analytics

Analytics should be kept lightweight.

Useful events may include:

``` text
experience_loaded
scene_entered
question_reached
rebuild_started
reveal_reached
cta_clicked
```

Do not instrument every animation frame or every scroll pixel.

The useful measurement is **where users reach and whether they engage
with the CTA**, not a database containing the user's every millisecond
of scrolling.

------------------------------------------------------------------------

# 43. Error / Failure Behaviour

If a heavy visual asset fails to load:

-   preserve the composition frame
-   preserve typography
-   preserve scene progression
-   avoid leaving an obvious broken-image icon
-   fall back to the relevant background/texture if possible

The story should still progress.

A missing decorative texture should never break the experience.

------------------------------------------------------------------------

# 44. Implementation Order

Build in this order:

## Phase 1 --- Foundation

-   Vite/React/TypeScript
-   global CSS tokens
-   Lenis
-   GSAP
-   ScrollTrigger
-   base experience shell

## Phase 2 --- Scene framework

-   Scene component
-   Composition component
-   Panel component
-   Layer system
-   responsive frame
-   scene registry

## Phase 3 --- Narrative systems

-   Meter
-   Clock
-   Question scene
-   Rebuild sequence
-   Reveal

## Phase 4 --- First-pass artwork

Implement the actual scenes with placeholder assets first.

The goal is to validate:

-   scroll rhythm
-   pinning
-   crop behaviour
-   responsive layout
-   meter timing
-   reconstruction

before spending excessive time polishing artwork.

## Phase 5 --- Final artwork

Replace placeholders with approved:

-   characters
-   environments
-   objects
-   textures
-   typography
-   graphic marks

## Phase 6 --- Polish

-   timing
-   easing
-   crop tuning
-   texture intensity
-   typography
-   performance
-   accessibility
-   mobile Safari testing

------------------------------------------------------------------------

# 45. What Should Not Be Built

Do not introduce the following unless the project requirements change:

-   Full 3D scene
-   Three.js/WebGL environment
-   Realistic video pipeline
-   Separate rendered video for every breakpoint
-   Multiple smooth-scroll libraries
-   Large global state framework
-   Complex CMS
-   Backend for the story itself
-   Persistent HUD
-   Continuous parallax on every element

These add complexity without solving a problem in the current creative
direction.

------------------------------------------------------------------------

# 46. Architecture Summary

The final system should look conceptually like:

``` text
                         IYKYK EXPERIENCE
                                │
                                ▼
                         EXPERIENCE SHELL
                                │
                    ┌───────────┴───────────┐
                    │                       │
                 LENIS                 SCENE REGISTRY
                    │                       │
                    ▼                       ▼
             SMOOTH SCROLL             SCENE CONFIG
                                            │
                                            ▼
                                      SCENE COMPONENT
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
               COMPOSITION               CLOCK                  METER
                    │                       │                       │
                    ▼                       ▼                       ▼
                 PANELS                  SVG/DOM               SVG/DOM
                    │
                    ▼
                  LAYERS
                    │
                    ▼
              GSAP TIMELINE
                    │
                    ▼
              SCROLLTRIGGER
```

The implementation should remain understandable enough that another
developer can enter the project and identify:

-   where scenes live
-   where assets live
-   where responsive composition is defined
-   where Lenis is initialised
-   where ScrollTrigger timelines are defined
-   where meter/clock state is controlled
-   where the final reveal is implemented

------------------------------------------------------------------------

# 47. Final Architecture Principle

**Build the experience as a system of animated compositions, not as a
collection of animated pages.**

The narrative lives in scene data.

The artwork lives in reusable assets.

The composition lives in scene components.

The scroll lives in Lenis.

The choreography lives in GSAP/ScrollTrigger.

The responsive behaviour lives in composition/crop rules.

The result should feel like one continuous illustrated film while
remaining a maintainable React application.
