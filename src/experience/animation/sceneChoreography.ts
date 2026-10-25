import type { SceneId } from '../data/types';
import type { DepthPlane, EntranceStyle, ExitStyle } from '../scenes/SceneArtwork';

/**
 * Per-scene scroll choreography configuration.
 * Drives independent 5-plane depth motion, differentiated pinning, timing,
 * and scrubbed parallax across the narrative arc.
 *
 * Depth Plane Mapping:
 * - Plane A: Continuous Environment Plate (untouched, in ContinuousBackground)
 * - Plane B: Distant collage material & integrated textures (slow drift ~0.3x)
 * - Plane C: Protagonist Hero (independent narrative movement ~1.0x)
 * - Plane D: Secondary props and narrative objects (responsive movement ~1.6x)
 * - Plane E: Near-field collage fragments & stickers (rapid foreground parallax ~2.4x)
 * - Independent HUD & Typography layers
 *
 * Art-Direction Rules (Task 03B.1):
 * - NO circular or continuous rotation during scroll parallax
 * - Parallax is purely positional (x, y displacement across depth planes)
 * - Deliberate exit choreography for all elements (slide-down, slide-left, slide-right, slide-up, scatter)
 * - Textures enter/exit as integrated material washes (fade-material), never as cartoon stickers
 */

type StorySceneId = Extract<SceneId, 'plan' | 'first-drink' | 'buzzed' | 'drunk' | 'party-peak' | 'passed-out'>;

export interface SceneScrollConfig {
  pin: boolean;
  pinSpacing: boolean;
  start: string;
  end: string;
  scrub: number;
  anticipatePin?: number;
}

export interface SceneChoreography {
  scroll: SceneScrollConfig;
  buildTimeline: (
    tl: GSAPTimeline,
    container: HTMLElement,
    collage: HTMLElement | null,
  ) => void;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const select = (el: HTMLElement, selector: string) =>
  el.querySelector<HTMLElement>(selector);

/**
 * Animate tactile physical collage entrances for all secondary elements
 * based on their data-entrance and data-role attributes.
 */
const animateCardsEntrance = (
  tl: GSAPTimeline,
  container: HTMLElement,
  planeDelayMap: { B: number; C: number; D: number; E: number } = { B: 0.06, C: 0.1, D: 0.16, E: 0.22 },
  durationScale = 1.0
) => {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('.scene-layer'));
  elements.forEach((el, i) => {
    const role = el.dataset.role || 'object';
    if (role === 'protagonist') return; // Protagonist handled individually per scene

    const entrance = (el.dataset.entrance as EntranceStyle) || (role === 'texture' ? 'fade-material' : 'slide');
    const plane = (el.dataset.plane as DepthPlane) || 'D';

    const baseTime = planeDelayMap[plane] ?? 0.15;
    const startTime = baseTime + ((i % 5) * 0.035);

    // Textures enter softly as ambient material washes (never bouncy stickers)
    if (role === 'texture' || entrance === 'fade-material') {
      tl.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.35 * durationScale, ease: 'power1.out' },
        startTime
      );
      return;
    }

    switch (entrance) {
      case 'stamp':
        tl.fromTo(
          el,
          { scale: 1.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.26 * durationScale, ease: 'back.out(1.8)' },
          startTime
        );
        break;
      case 'drop':
        tl.fromTo(
          el,
          { y: -70, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.28 * durationScale, ease: 'power3.out' },
          startTime
        );
        break;
      case 'paper':
        tl.fromTo(
          el,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.32 * durationScale, ease: 'power2.out' },
          startTime
        );
        break;
      case 'burst':
        tl.fromTo(
          el,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.24 * durationScale, ease: 'back.out(1.6)' },
          startTime
        );
        break;
      case 'whip':
        tl.fromTo(
          el,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.28 * durationScale, ease: 'power3.out' },
          startTime
        );
        break;
      case 'slide':
      default:
        tl.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.26 * durationScale, ease: 'power2.out' },
          startTime
        );
        break;
    }
  });
};

/**
 * Animate deliberate exit choreography for all secondary elements
 * based on their data-exit attribute (slide-down, slide-left, slide-right, slide-up, scatter, fade-material).
 */
const animateCardsExit = (
  tl: GSAPTimeline,
  container: HTMLElement,
  exitStart = 0.72,
  durationScale = 1.0
) => {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('.scene-layer'));
  elements.forEach((el, i) => {
    const role = el.dataset.role || 'object';
    if (role === 'protagonist') return; // Protagonist handled individually

    const exit = (el.dataset.exit as ExitStyle) || (role === 'texture' ? 'fade-material' : 'slide-down');
    const plane = (el.dataset.plane as DepthPlane) || 'D';

    // Stagger exits: near-field stickers leave first, props second, distant textures last
    const planeOffset = plane === 'E' ? 0 : plane === 'D' ? 0.03 : 0.06;
    const startTime = exitStart + planeOffset + ((i % 4) * 0.02);

    if (role === 'texture' || exit === 'fade-material') {
      tl.to(
        el,
        { opacity: 0, duration: 0.22 * durationScale, ease: 'power1.in' },
        startTime
      );
      return;
    }

    switch (exit) {
      case 'slide-left':
        tl.to(
          el,
          { x: -80, opacity: 0, duration: 0.22 * durationScale, ease: 'power2.in' },
          startTime
        );
        break;
      case 'slide-right':
        tl.to(
          el,
          { x: 80, opacity: 0, duration: 0.22 * durationScale, ease: 'power2.in' },
          startTime
        );
        break;
      case 'slide-up':
        tl.to(
          el,
          { y: -70, opacity: 0, duration: 0.22 * durationScale, ease: 'power2.in' },
          startTime
        );
        break;
      case 'scatter':
        tl.to(
          el,
          {
            x: i % 2 === 0 ? 100 : -100,
            y: i % 3 === 0 ? -70 : 80,
            opacity: 0,
            duration: 0.25 * durationScale,
            ease: 'power3.in',
          },
          startTime
        );
        break;
      case 'slide-down':
      default:
        tl.to(
          el,
          { y: 80, opacity: 0, duration: 0.22 * durationScale, ease: 'power2.in' },
          startTime
        );
        break;
    }
  });
};

/* ------------------------------------------------------------------ */
/* Scene 01 — THE PLAN                                                 */
/* Calm, structured study collage. Character right, typography left.  */
/* ------------------------------------------------------------------ */

const planChoreography: SceneChoreography = {
  scroll: {
    pin: true,
    pinSpacing: true,
    start: 'top top',
    end: '+=900',
    scrub: 1,
    anticipatePin: 1,
  },
  buildTimeline(tl, container) {
    const planeB = select(container, '.scene-plane-b');
    const planeC = select(container, '.scene-plane-c');
    const planeD = select(container, '.scene-plane-d');
    const planeE = select(container, '.scene-plane-e');
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Phase 1: Staggered Entrance (0.0 → 0.40)
    if (hud) {
      tl.fromTo(hud, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, y: 35, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }, 0.08);
    }
    animateCardsEntrance(tl, container, { B: 0.06, C: 0.08, D: 0.14, E: 0.20 });
    if (copy) {
      tl.fromTo(copy, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.20);
    }

    // Phase 2: True Positional Multiplane Parallax Hold (0.40 → 0.72)
    // Pure linear displacements, zero rotation
    if (planeB) {
      tl.to(planeB, { y: -8, ease: 'none', duration: 0.32 }, 0.40); // 0.3x
    }
    if (planeC) {
      tl.to(planeC, { y: -22, ease: 'none', duration: 0.32 }, 0.40); // 1.0x (Hero anchor)
    }
    if (planeD) {
      tl.to(planeD, { y: -36, ease: 'none', duration: 0.32 }, 0.40); // 1.6x
    }
    if (planeE) {
      tl.to(planeE, { y: -54, ease: 'none', duration: 0.32 }, 0.40); // 2.4x
    }

    // Phase 3: Deliberate Exit Choreography (0.72 → 1.0)
    animateCardsExit(tl, container, 0.72);
    if (copy) {
      tl.to(copy, { x: -40, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.75);
    }
    if (planeC) {
      tl.to(planeC, { x: -40, opacity: 0.15, scale: 0.98, duration: 0.24, ease: 'power2.in' }, 0.76);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 02 — FIRST DRINK                                              */
/* Social arrival. Character left, glassware & typography right.      */
/* ------------------------------------------------------------------ */

const firstDrinkChoreography: SceneChoreography = {
  scroll: {
    pin: true,
    pinSpacing: true,
    start: 'top top',
    end: '+=900',
    scrub: 0.8,
    anticipatePin: 1,
  },
  buildTimeline(tl, container) {
    const planeB = select(container, '.scene-plane-b');
    const planeC = select(container, '.scene-plane-c');
    const planeD = select(container, '.scene-plane-d');
    const planeE = select(container, '.scene-plane-e');
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance
    if (hud) {
      tl.fromTo(hud, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, y: 35, x: -20 }, { opacity: 1, y: 0, x: 0, duration: 0.36, ease: 'power2.out' }, 0.08);
    }
    animateCardsEntrance(tl, container, { B: 0.06, C: 0.08, D: 0.14, E: 0.20 });
    if (copy) {
      tl.fromTo(copy, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.28, ease: 'power2.out' }, 0.22);
    }

    // Parallax Hold: Positional only, zero rotation
    if (planeB) {
      tl.to(planeB, { y: -10, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeC) {
      tl.to(planeC, { y: -24, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeD) {
      tl.to(planeD, { y: -40, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeE) {
      tl.to(planeE, { y: -60, ease: 'none', duration: 0.32 }, 0.40);
    }

    // Exit: Staggered physical departures
    animateCardsExit(tl, container, 0.72);
    if (copy) {
      tl.to(copy, { x: 40, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.75);
    }
    if (planeC) {
      tl.to(planeC, { x: 30, scale: 1.03, opacity: 0.2, duration: 0.24, ease: 'power2.in' }, 0.76);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 03 — BUZZED                                                   */
/* Energy rises. High-right character, left sound system, angled text. */
/* ------------------------------------------------------------------ */

const buzzedChoreography: SceneChoreography = {
  scroll: {
    pin: true,
    pinSpacing: true,
    start: 'top top',
    end: '+=900',
    scrub: 0.8,
    anticipatePin: 1,
  },
  buildTimeline(tl, container) {
    const planeB = select(container, '.scene-plane-b');
    const planeC = select(container, '.scene-plane-c');
    const planeD = select(container, '.scene-plane-d');
    const planeE = select(container, '.scene-plane-e');
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, scale: 0.94, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.08);
    }
    animateCardsEntrance(tl, container, { B: 0.05, C: 0.08, D: 0.13, E: 0.18 });
    if (copy) {
      tl.fromTo(copy, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.26, ease: 'power2.out' }, 0.22);
    }

    // Parallax Hold: Positional only, zero rotation
    if (planeB) {
      tl.to(planeB, { y: -12, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeC) {
      tl.to(planeC, { y: -26, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeD) {
      tl.to(planeD, { y: -44, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeE) {
      tl.to(planeE, { y: -64, ease: 'none', duration: 0.32 }, 0.40);
    }

    // Exit
    animateCardsExit(tl, container, 0.72);
    if (copy) {
      tl.to(copy, { opacity: 0, y: -20, duration: 0.18, ease: 'power1.in' }, 0.75);
    }
    if (planeC) {
      tl.to(planeC, { x: -30, scale: 1.04, opacity: 0.2, duration: 0.24, ease: 'power2.in' }, 0.76);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 04 — DRUNK                                                    */
/* Asymmetric overlaps, distortion, shattered clocks tumble outwards.  */
/* ------------------------------------------------------------------ */

const drunkChoreography: SceneChoreography = {
  scroll: {
    pin: true,
    pinSpacing: true,
    start: 'top top',
    end: '+=900',
    scrub: 0.6,
    anticipatePin: 1,
  },
  buildTimeline(tl, container) {
    const planeB = select(container, '.scene-plane-b');
    const planeC = select(container, '.scene-plane-c');
    const planeD = select(container, '.scene-plane-d');
    const planeE = select(container, '.scene-plane-e');
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.36, ease: 'power3.out' }, 0.08);
    }
    animateCardsEntrance(tl, container, { B: 0.05, C: 0.08, D: 0.13, E: 0.18 });
    if (copy) {
      tl.fromTo(copy, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.26, ease: 'power2.out' }, 0.24);
    }

    // Parallax Hold: Positional displacement only, zero rotating planes
    if (planeB) {
      tl.to(planeB, { y: -14, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeC) {
      tl.to(planeC, { y: -26, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeD) {
      tl.to(planeD, { y: -48, ease: 'none', duration: 0.32 }, 0.40);
    }
    if (planeE) {
      tl.to(planeE, { y: -68, ease: 'none', duration: 0.32 }, 0.40);
    }

    // Exit: Clocks and shards scatter outward, bottles drop
    animateCardsExit(tl, container, 0.72);
    if (copy) {
      tl.to(copy, { opacity: 0, y: -20, duration: 0.18, ease: 'power1.in' }, 0.75);
    }
    if (planeC) {
      tl.to(planeC, { y: 35, scale: 1.05, opacity: 0.2, duration: 0.24, ease: 'power2.in' }, 0.76);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 05 — PARTY PEAK                                               */
/* Monumental center dancing hero. Confetti frame. Collapse into morning. */
/* ------------------------------------------------------------------ */

const partyPeakChoreography: SceneChoreography = {
  scroll: {
    pin: true,
    pinSpacing: true,
    start: 'top top',
    end: '+=1000',
    scrub: 0.6,
    anticipatePin: 1,
  },
  buildTimeline(tl, container) {
    const planeB = select(container, '.scene-plane-b');
    const planeC = select(container, '.scene-plane-c');
    const planeD = select(container, '.scene-plane-d');
    const planeE = select(container, '.scene-plane-e');
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, scale: 0.88, y: 35 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }, 0.08);
    }
    animateCardsEntrance(tl, container, { B: 0.04, C: 0.08, D: 0.12, E: 0.16 });
    if (copy) {
      tl.fromTo(copy, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.3)' }, 0.22);
    }

    // Parallax Hold: High energy positional drift
    if (planeB) {
      tl.to(planeB, { y: -12, ease: 'none', duration: 0.3 }, 0.40);
    }
    if (planeC) {
      tl.to(planeC, { y: -28, scale: 1.02, ease: 'none', duration: 0.3 }, 0.40);
    }
    if (planeD) {
      tl.to(planeD, { y: -48, ease: 'none', duration: 0.3 }, 0.40);
    }
    if (planeE) {
      tl.to(planeE, { y: -72, ease: 'none', duration: 0.3 }, 0.40);
    }

    // Exit: Hard Sudden Collapse into Morning
    animateCardsExit(tl, container, 0.70);
    if (planeC) {
      tl.to(planeC, { y: 70, scale: 0.9, opacity: 0, duration: 0.24, ease: 'power3.in' }, 0.74);
    }
    if (copy) {
      tl.to(copy, { y: 30, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.75);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, y: -10, duration: 0.15, ease: 'power1.in' }, 0.78);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 06 — PASSED OUT                                               */
/* Exhaustion, stillness. Character low on bed. Alarms blaring.        */
/* ------------------------------------------------------------------ */

const passedOutChoreography: SceneChoreography = {
  scroll: {
    pin: true,
    pinSpacing: true,
    start: 'top top',
    end: '+=800',
    scrub: 0.5,
    anticipatePin: 1,
  },
  buildTimeline(tl, container) {
    const planeB = select(container, '.scene-plane-b');
    const planeC = select(container, '.scene-plane-c');
    const planeD = select(container, '.scene-plane-d');
    const planeE = select(container, '.scene-plane-e');
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power1.out' }, 0.08);
    }
    animateCardsEntrance(tl, container, { B: 0.05, C: 0.08, D: 0.13, E: 0.18 });
    if (copy) {
      tl.fromTo(copy, { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power1.out' }, 0.22);
    }

    // Parallax Hold: Stillness on character, subtle alarm displacement
    if (planeC) {
      tl.to(planeC, { y: -4, ease: 'none', duration: 0.3 }, 0.40); // Motionless focal point
    }
    if (planeB) {
      tl.to(planeB, { y: -8, ease: 'none', duration: 0.3 }, 0.40);
    }
    if (planeD) {
      tl.to(planeD, { y: -22, ease: 'none', duration: 0.3 }, 0.40);
    }
    if (planeE) {
      tl.to(planeE, { y: -32, ease: 'none', duration: 0.3 }, 0.40);
    }

    // Exit: Screen empties into the void for Scene 07 Question pause
    animateCardsExit(tl, container, 0.70);
    if (planeC) {
      tl.to(planeC, { opacity: 0, y: 25, duration: 0.25, ease: 'power2.in' }, 0.74);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: 15, duration: 0.18, ease: 'power1.in' }, 0.76);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.15 }, 0.80);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Export registry                                                      */
/* ------------------------------------------------------------------ */

export const SCENE_CHOREOGRAPHY: Record<StorySceneId, SceneChoreography> = {
  plan: planChoreography,
  'first-drink': firstDrinkChoreography,
  buzzed: buzzedChoreography,
  drunk: drunkChoreography,
  'party-peak': partyPeakChoreography,
  'passed-out': passedOutChoreography,
};
