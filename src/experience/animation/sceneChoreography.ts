import type { SceneId } from '../data/types';

/**
 * Per-scene scroll choreography configuration.
 * Drives independent 5-plane depth motion, differentiated pinning, timing,
 * and scrubbed parallax across the narrative arc.
 *
 * Depth Plane Mapping:
 * - Plane A: Continuous Environment Plate (untouched, in ContinuousBackground)
 * - Plane B: Distant collage material (slow drift ~0.3x)
 * - Plane C: Protagonist Hero (independent narrative movement ~1.0x)
 * - Plane D: Secondary props and narrative objects (responsive movement ~1.4x)
 * - Plane E: Near-field collage fragments (rapid foreground parallax ~2.2x)
 * - Independent HUD & Typography layers
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

/* ------------------------------------------------------------------ */
/* Scene 01 — THE PLAN                                                 */
/* Calm, structured, sober preparation. Protagonist commands focus.    */
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

    // Phase 1: Staggered Entrance by Depth Plane (0.0 → 0.42)
    if (hud) {
      tl.fromTo(hud, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.05);
    }
    if (planeB) {
      tl.fromTo(planeB, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.08);
    }
    if (planeC) {
      // Protagonist rises with weight and composure
      tl.fromTo(planeC, { opacity: 0, y: 35, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }, 0.12);
    }
    if (planeD) {
      // Props enter from lower desk perimeter
      tl.fromTo(planeD, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.32, ease: 'back.out(1.3)' }, 0.18);
    }
    if (planeE) {
      // Timetable note pins to top right
      tl.fromTo(planeE, { opacity: 0, y: 25, scale: 1.08 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power3.out' }, 0.24);
    }
    if (copy) {
      tl.fromTo(copy, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.26);
    }

    // Phase 2: Independent Multiplane Scrubbed Parallax Hold (0.42 → 0.72)
    if (planeB) {
      tl.to(planeB, { y: -8, ease: 'none', duration: 0.3 }, 0.42); // 0.3x
    }
    if (planeC) {
      tl.to(planeC, { y: -20, ease: 'none', duration: 0.3 }, 0.42); // 1.0x (Hero reference)
    }
    if (planeD) {
      tl.to(planeD, { y: -32, ease: 'none', duration: 0.3 }, 0.42); // 1.6x
    }
    if (planeE) {
      tl.to(planeE, { y: -48, x: 6, ease: 'none', duration: 0.3 }, 0.42); // 2.4x
    }

    // Phase 3: Staggered Exit (0.72 → 1.0)
    if (planeE) {
      tl.to(planeE, { y: -30, opacity: 0, rotation: 8, duration: 0.18, ease: 'power2.in' }, 0.72);
    }
    if (planeD) {
      tl.to(planeD, { y: 20, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.75);
    }
    if (copy) {
      tl.to(copy, { y: -20, opacity: 0, duration: 0.18, ease: 'power2.in' }, 0.76);
    }
    if (planeC) {
      tl.to(planeC, { x: -30, opacity: 0.15, scale: 0.98, duration: 0.22, ease: 'power2.in' }, 0.78);
    }
    if (planeB) {
      tl.to(planeB, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.15, ease: 'power1.in' }, 0.84);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 02 — FIRST DRINK                                              */
/* Social arrival. Holding drink close-up. Glassware & sticker enter.  */
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
    if (planeB) {
      tl.fromTo(planeB, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.08);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, y: 35, x: 20 }, { opacity: 1, y: 0, x: 0, duration: 0.38, ease: 'power2.out' }, 0.1);
    }
    if (planeD) {
      tl.fromTo(planeD, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.32, ease: 'back.out(1.4)' }, 0.18);
    }
    if (planeE) {
      tl.fromTo(planeE, { opacity: 0, scale: 0.7, rotation: -4 }, { opacity: 1, scale: 1, rotation: 6, duration: 0.28, ease: 'back.out(1.5)' }, 0.24);
    }
    if (copy) {
      tl.fromTo(copy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.26);
    }

    // Parallax Hold
    if (planeB) {
      tl.to(planeB, { y: -10, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeC) {
      tl.to(planeC, { y: -24, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeD) {
      tl.to(planeD, { y: -36, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeE) {
      tl.to(planeE, { y: -54, x: -8, rotation: 10, ease: 'none', duration: 0.3 }, 0.42);
    }

    // Exit
    if (planeE) {
      tl.to(planeE, { scale: 0.8, opacity: 0, y: -25, duration: 0.18, ease: 'power2.in' }, 0.72);
    }
    if (planeD) {
      tl.to(planeD, { y: 25, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.75);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: -15, duration: 0.18, ease: 'power1.in' }, 0.76);
    }
    if (planeC) {
      tl.to(planeC, { scale: 1.04, opacity: 0.2, y: -20, duration: 0.22, ease: 'power2.in' }, 0.78);
    }
    if (planeB) {
      tl.to(planeB, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 03 — BUZZED                                                   */
/* Energy rises. Looser posture. Vibrations & graphic swirls.         */
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
    if (planeB) {
      tl.fromTo(planeB, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.08);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, scale: 0.92, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.1);
    }
    if (planeD) {
      tl.fromTo(planeD, { opacity: 0, y: 35, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.3, ease: 'back.out(1.4)' }, 0.16);
    }
    if (planeE) {
      tl.fromTo(planeE, { opacity: 0, scale: 0.5, rotation: 25 }, { opacity: 1, scale: 1, rotation: 12, duration: 0.26, ease: 'back.out(1.7)' }, 0.22);
    }
    if (copy) {
      tl.fromTo(copy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.26);
    }

    // Parallax Hold
    if (planeB) {
      tl.to(planeB, { y: -12, rotation: 2, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeC) {
      tl.to(planeC, { y: -26, x: 8, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeD) {
      tl.to(planeD, { y: -42, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeE) {
      tl.to(planeE, { y: -62, x: 12, rotation: 18, ease: 'none', duration: 0.3 }, 0.42);
    }

    // Exit
    if (planeE) {
      tl.to(planeE, { opacity: 0, scale: 0.7, y: -25, duration: 0.18, ease: 'power2.in' }, 0.72);
    }
    if (planeD) {
      tl.to(planeD, { y: 30, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.75);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: -15, duration: 0.18, ease: 'power1.in' }, 0.76);
    }
    if (planeC) {
      tl.to(planeC, { rotation: 2, scale: 1.05, opacity: 0.22, duration: 0.22, ease: 'power2.in' }, 0.78);
    }
    if (planeB) {
      tl.to(planeB, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 04 — DRUNK                                                    */
/* Asymmetric overlaps, distortion, clock fragment intrudes.           */
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
      tl.fromTo(hud, { opacity: 0, rotation: -2 }, { opacity: 1, rotation: -0.5, duration: 0.2, ease: 'power1.out' }, 0.05);
    }
    if (planeB) {
      tl.fromTo(planeB, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.06);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, y: 40, rotation: -6 }, { opacity: 1, y: 0, rotation: -3, duration: 0.36, ease: 'power3.out' }, 0.1);
    }
    if (planeD) {
      tl.fromTo(planeD, { opacity: 0, y: 30, rotation: -20 }, { opacity: 1, y: 0, rotation: -14, duration: 0.32, ease: 'back.out(1.4)' }, 0.18);
    }
    if (planeE) {
      tl.fromTo(planeE, { opacity: 0, scale: 0.7, rotation: 5 }, { opacity: 1, scale: 1, rotation: 15, duration: 0.26, ease: 'back.out(1.5)' }, 0.22);
    }
    if (copy) {
      tl.fromTo(copy, { y: 25, opacity: 0, rotation: 1 }, { y: 0, opacity: 1, rotation: 0, duration: 0.25, ease: 'power2.out' }, 0.28);
    }

    // Parallax Hold
    if (planeB) {
      tl.to(planeB, { y: -14, rotation: -2, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeC) {
      tl.to(planeC, { y: -22, rotation: -1, scale: 1.02, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeD) {
      tl.to(planeD, { y: -44, rotation: -22, ease: 'none', duration: 0.3 }, 0.42);
    }
    if (planeE) {
      tl.to(planeE, { y: -68, x: -10, rotation: 20, ease: 'none', duration: 0.3 }, 0.42);
    }

    // Exit
    if (planeE) {
      tl.to(planeE, { opacity: 0, y: -30, duration: 0.18, ease: 'power2.in' }, 0.72);
    }
    if (planeD) {
      tl.to(planeD, { y: 40, rotation: -30, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.74);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: -15, duration: 0.18, ease: 'power1.in' }, 0.76);
    }
    if (planeC) {
      tl.to(planeC, { rotation: 4, scale: 1.08, opacity: 0.2, duration: 0.24, ease: 'power2.in' }, 0.76);
    }
    if (planeB) {
      tl.to(planeB, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.82);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 05 — PARTY PEAK                                               */
/* Euphoric dancing. Maximum foreground energy. Sudden collapse.      */
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

    // Entrance: Explosive burst
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.05);
    }
    if (planeB) {
      tl.fromTo(planeB, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.05);
    }
    if (planeC) {
      tl.fromTo(planeC, { opacity: 0, scale: 0.85, y: 35 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }, 0.08);
    }
    if (planeD) {
      tl.fromTo(planeD, { opacity: 0, y: 30, rotation: -18 }, { opacity: 1, y: 0, rotation: -12, duration: 0.3, ease: 'back.out(1.5)' }, 0.16);
    }
    if (planeE) {
      tl.fromTo(planeE, { opacity: 0, scale: 0.6, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.6)' }, 0.20);
    }
    if (copy) {
      tl.fromTo(copy, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.3)' }, 0.25);
    }

    // Parallax Hold: Peak energy
    if (planeB) {
      tl.to(planeB, { y: -12, ease: 'none', duration: 0.28 }, 0.42);
    }
    if (planeC) {
      tl.to(planeC, { y: -28, scale: 1.03, ease: 'none', duration: 0.28 }, 0.42);
    }
    if (planeD) {
      tl.to(planeD, { y: -45, rotation: -18, ease: 'none', duration: 0.28 }, 0.42);
    }
    if (planeE) {
      tl.to(planeE, { y: -72, x: 12, ease: 'none', duration: 0.28 }, 0.42);
    }

    // Exit: Hard Sudden Collapse into Morning
    if (planeE) {
      tl.to(planeE, { y: 60, opacity: 0, duration: 0.22, ease: 'power3.in' }, 0.70);
    }
    if (planeD) {
      tl.to(planeD, { y: 50, opacity: 0, duration: 0.22, ease: 'power3.in' }, 0.72);
    }
    if (planeC) {
      tl.to(planeC, { y: 70, scale: 0.9, opacity: 0, duration: 0.25, ease: 'power3.in' }, 0.74);
    }
    if (copy) {
      tl.to(copy, { y: 30, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.76);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, y: -10, duration: 0.15, ease: 'power1.in' }, 0.78);
    }
    if (planeB) {
      tl.to(planeB, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.80);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 06 — PASSED OUT                                               */
/* Exhaustion, stillness. Heavy downward settle. Morning interruption. */
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

    // Entrance: Cold reality arrival
    if (planeB) {
      tl.fromTo(planeB, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0.06);
    }
    if (planeC) {
      // Protagonist motionless close-up on bed
      tl.fromTo(planeC, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power1.out' }, 0.1);
    }
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15);
    }
    if (planeD) {
      tl.fromTo(planeD, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power1.out' }, 0.18);
    }
    if (planeE) {
      tl.fromTo(planeE, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power1.out' }, 0.22);
    }
    if (copy) {
      tl.fromTo(copy, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power1.out' }, 0.26);
    }

    // Parallax Hold: Character remains motionless (0.0x), alarm clock rings & vibrates
    if (planeC) {
      tl.to(planeC, { y: -4, ease: 'none', duration: 0.28 }, 0.42); // Stillness
    }
    if (planeB) {
      tl.to(planeB, { y: -8, ease: 'none', duration: 0.28 }, 0.42);
    }
    if (planeD) {
      tl.to(planeD, { y: -18, rotation: 3, ease: 'none', duration: 0.28 }, 0.42);
    }
    if (planeE) {
      tl.to(planeE, { y: -25, ease: 'none', duration: 0.28 }, 0.42);
    }

    // Exit: Screen empties into the void for Scene 07 Question pause
    if (planeD) {
      tl.to(planeD, { y: 25, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.70);
    }
    if (planeE) {
      tl.to(planeE, { opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.73);
    }
    if (planeC) {
      tl.to(planeC, { opacity: 0, y: 15, duration: 0.25, ease: 'power2.in' }, 0.75);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: 10, duration: 0.15, ease: 'power1.in' }, 0.78);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.15 }, 0.80);
    }
    if (planeB) {
      tl.to(planeB, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.82);
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
