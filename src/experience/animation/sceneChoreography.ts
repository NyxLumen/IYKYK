
import type { SceneId } from '../data/types';

/**
 * Per-scene scroll choreography configuration.
 * Drives differentiated pinning, timing, and animation across the nine-state narrative.
 * Designed so that scene-to-scene transitions feel causally connected (architecture.md Sec 15-16).
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

const selectAll = (el: HTMLElement, selector: string) =>
  Array.from(el.querySelectorAll<HTMLElement>(selector));

const select = (el: HTMLElement, selector: string) =>
  el.querySelector<HTMLElement>(selector);

/* ------------------------------------------------------------------ */
/* Scene 01 — THE PLAN                                                 */
/* Pin + slow settle of the composition.                               */
/* Exit: composition drifts to prepare for the party entrance.         */
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
  buildTimeline(tl, container, collage) {
    const cards = collage ? selectAll(collage, '.art-card') : [];
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Phase 1: Entrance — elements settle into composition (0 → 0.45)
    if (collage) {
      tl.fromTo(collage, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);
    }
    cards.forEach((card, i) => {
      tl.fromTo(card, { y: 20 + i * 8, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.05 + i * 0.06);
    });
    if (hud) {
      tl.fromTo(hud, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.2);
    }
    if (copy) {
      tl.fromTo(copy, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.3);
    }

    // Phase 2: Subtle hold — slight parallax drift (0.45 → 0.7)
    if (collage) {
      tl.to(collage, { y: -6, duration: 0.25, ease: 'none' }, 0.45);
    }

    // Phase 3: Exit — slide away for party transition (0.7 → 1.0)
    if (collage) {
      tl.to(collage, { x: -20, opacity: 0.3, scale: 0.97, duration: 0.3, ease: 'power2.in' }, 0.7);
    }
    if (copy) {
      tl.to(copy, { y: -20, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.75);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.15, ease: 'power1.in' }, 0.8);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 02 — FIRST DRINK                                              */
/* Panel slide entrance. Pinned for deliberate pacing.                 */
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
  buildTimeline(tl, container, collage) {
    const cards = collage ? selectAll(collage, '.art-card') : [];
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance: panels slide in from edges
    if (collage) {
      tl.fromTo(collage, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);
    }
    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -30 : 30;
      tl.fromTo(card, { x: fromX, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.05 + i * 0.05);
    });
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.15);
    }
    if (copy) {
      tl.fromTo(copy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.25);
    }

    // Hold — subtle drift (0.5 → 0.7)
    if (collage) {
      tl.to(collage, { y: -4, duration: 0.2, ease: 'none' }, 0.5);
    }

    // Exit — density hint for buzzed (0.75 → 1.0)
    if (collage) {
      tl.to(collage, { scale: 1.03, opacity: 0.5, duration: 0.25, ease: 'power1.in' }, 0.75);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: -15, duration: 0.15, ease: 'power1.in' }, 0.8);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 03 — BUZZED                                                   */
/* Composition expands outward. Pinned for deliberate pacing.          */
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
  buildTimeline(tl, container, collage) {
    const cards = collage ? selectAll(collage, '.art-card') : [];
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance: expand outward from center
    if (collage) {
      tl.fromTo(collage, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);
    }
    cards.forEach((card, i) => {
      tl.fromTo(card, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' }, 0.08 + i * 0.04);
    });
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.15);
    }
    if (copy) {
      tl.fromTo(copy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.3);
    }

    // Exit: tilt begins, preparing for drunk distortion (0.7 → 1.0)
    if (collage) {
      tl.to(collage, { rotation: 1.5, scale: 1.06, opacity: 0.4, duration: 0.3, ease: 'power1.in' }, 0.7);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, duration: 0.15, ease: 'power1.in' }, 0.8);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 04 — DRUNK                                                    */
/* Tight crop, rotation, distortion. Pinned for emphasis.              */
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
  buildTimeline(tl, container, collage) {
    const cards = collage ? selectAll(collage, '.art-card') : [];
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance: tight crop pushes in with rotation
    if (collage) {
      tl.fromTo(collage, { scale: 0.9, rotation: -2, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, 0);
    }
    cards.forEach((card, i) => {
      const rot = (i % 2 === 0 ? -1 : 1) * (3 + i * 1.5);
      tl.fromTo(card, { rotation: rot, opacity: 0 }, { rotation: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.05 + i * 0.05);
    });
    if (hud) {
      tl.fromTo(hud, { opacity: 0, rotation: -1 }, { opacity: 1, rotation: -0.5, duration: 0.2, ease: 'power1.out' }, 0.2);
    }
    if (copy) {
      tl.fromTo(copy, { y: 25, opacity: 0, rotation: 1 }, { y: 0, opacity: 1, rotation: 0, duration: 0.25, ease: 'power2.out' }, 0.3);
    }

    // Internal: wobble / distortion micro-movement (0.45 → 0.65)
    if (collage) {
      tl.to(collage, { rotation: 1, scale: 1.02, duration: 0.2, ease: 'power1.inOut' }, 0.45);
    }

    // Exit: everything spins slightly, chaos intensifies (0.7 → 1.0)
    if (collage) {
      tl.to(collage, { rotation: 2.5, scale: 1.08, opacity: 0.3, duration: 0.3, ease: 'power2.in' }, 0.7);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: -15, duration: 0.15, ease: 'power1.in' }, 0.8);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 05 — PARTY PEAK                                               */
/* Maximum chaos. Pinned. Elements explode in.                         */
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
  buildTimeline(tl, container, collage) {
    const cards = collage ? selectAll(collage, '.art-card') : [];
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');

    // Entrance: explosive burst from all directions
    if (collage) {
      tl.fromTo(collage, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' }, 0);
    }
    cards.forEach((card, i) => {
      const angle = (i / Math.max(cards.length, 1)) * Math.PI * 2;
      const fromX = Math.cos(angle) * 60;
      const fromY = Math.sin(angle) * 40;
      tl.fromTo(card, { x: fromX, y: fromY, scale: 0.7, opacity: 0, rotation: (i - 2) * 6 }, { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.25, ease: 'back.out(1.4)' }, 0.02 + i * 0.03);
    });
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15);
    }
    if (copy) {
      tl.fromTo(copy, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.3)' }, 0.25);
    }

    // Hold: peak energy micro-pulse (0.4 → 0.6)
    if (collage) {
      tl.to(collage, { scale: 1.03, duration: 0.1, ease: 'power1.inOut' }, 0.4);
      tl.to(collage, { scale: 1, duration: 0.1, ease: 'power1.inOut' }, 0.5);
    }

    // Exit: HARD COLLAPSE — everything freezes then drops (0.65 → 1.0)
    if (collage) {
      tl.to(collage, { y: 60, scale: 0.85, opacity: 0, rotation: -1, duration: 0.35, ease: 'power3.in' }, 0.65);
    }
    if (copy) {
      tl.to(copy, { y: 30, opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.7);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, y: -10, duration: 0.15, ease: 'power1.in' }, 0.75);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Scene 06 — PASSED OUT                                               */
/* Hard tonal shift. Stillness. Pinned for the moment of emptiness.    */
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
  buildTimeline(tl, container, collage) {
    const cards = collage ? selectAll(collage, '.art-card') : [];
    const copy = select(container, '.scene-copy');
    const hud = select(container, '.scene-hud');
    const env = select(container, '.scene-environment');

    // Entrance: hard cut — immediate appearance with cold reveal
    if (env) {
      tl.fromTo(env, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'none' }, 0);
    }
    if (collage) {
      tl.fromTo(collage, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0.05);
    }
    cards.forEach((card, i) => {
      tl.fromTo(card, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.1 + i * 0.04);
    });
    if (hud) {
      tl.fromTo(hud, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15);
    }
    if (copy) {
      tl.fromTo(copy, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power1.out' }, 0.25);
    }

    // Hold: stillness (0.4 → 0.6) — minimal movement
    // intentionally sparse

    // Exit: elements fall away and screen empties toward black (0.6 → 1.0)
    cards.forEach((card, i) => {
      tl.to(card, { y: 20 + i * 10, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.6 + i * 0.03);
    });
    if (collage) {
      tl.to(collage, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.7);
    }
    if (copy) {
      tl.to(copy, { opacity: 0, y: 10, duration: 0.15, ease: 'power1.in' }, 0.7);
    }
    if (hud) {
      tl.to(hud, { opacity: 0, duration: 0.15 }, 0.75);
    }
    if (env) {
      tl.to(env, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.8);
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
