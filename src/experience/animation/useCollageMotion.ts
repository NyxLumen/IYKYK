import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAnimation } from '@/app/providers/AnimationProvider';
import type { SceneId } from '../data/types';

/**
 * Task 03C: Cursor-Responsive Collage & Ambient Idle Motion
 *
 * Implements two complementary motion behaviours:
 * 1. Subtle deterministic ambient movement (1–3px, 0.15–0.40deg) that gives selected
 *    collage elements a slight restless tactile life without interacting.
 * 2. Cursor repulsion field that smoothly translates nearby decorative elements away
 *    from the pointer (160–240px radius) and smoothly settles back to rest on exit.
 *
 * Transform Separation Architecture:
 * - Layout / Scroll Layer: outer .scene-layer / .art-card (owned by CSS & GSAP ScrollTrigger)
 * - Pointer Repulsion Layer: .motion-pointer-layer (owned by cursor field)
 * - Ambient Idle Layer: .motion-ambient-layer (owned by ambient math ticker)
 * - Artwork: innermost <img> / figure content
 */

interface PointerState {
  x: number;
  y: number;
  active: boolean;
  isFinePointer: boolean;
}

// Global shared pointer state across all scenes to avoid redundant listeners
const globalPointer: PointerState = {
  x: -9999,
  y: -9999,
  active: false,
  isFinePointer: false,
};

let globalListenersInitialized = false;

function initGlobalPointerListeners() {
  if (typeof window === 'undefined' || globalListenersInitialized) return;
  globalListenersInitialized = true;

  const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  globalPointer.isFinePointer = fineQuery.matches;

  const handlePointerChange = (e: MediaQueryListEvent) => {
    globalPointer.isFinePointer = e.matches;
    if (!globalPointer.isFinePointer) {
      globalPointer.active = false;
    }
  };
  fineQuery.addEventListener('change', handlePointerChange);

  window.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      // Ignore touch and pen events entirely for desktop cursor repulsion
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        globalPointer.active = false;
        return;
      }
      if (!globalPointer.isFinePointer) return;

      globalPointer.x = e.clientX;
      globalPointer.y = e.clientY;
      globalPointer.active = true;
    },
    { passive: true }
  );

  document.documentElement.addEventListener('pointerleave', () => {
    globalPointer.active = false;
  });

  window.addEventListener('blur', () => {
    globalPointer.active = false;
  });
}

/**
 * Simple deterministic string hasher for seeding reproducible motion parameters.
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface AnimatedElementConfig {
  el: HTMLElement;
  pointerEl: HTMLElement;
  ambientEl: HTMLElement;
  hasAmbient: boolean;
  hasRepulsion: boolean;
  // Ambient math parameters
  ax: number;
  ay: number;
  ar: number;
  w1: number;
  w2: number;
  w3: number;
  w4: number;
  wr: number;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  pr: number;
  // Repulsion parameters
  radius: number;
  maxDisplacement: number;
  currentX: number;
  currentY: number;
  lastAppliedX: number;
  lastAppliedY: number;
}

// Scene-specific narrative motion profile multipliers (Task 03C.4)
const SCENE_MOTION_PROFILES: Record<
  SceneId,
  { ambientScale: number; repulsionScale: number }
> = {
  plan: { ambientScale: 0.35, repulsionScale: 0.75 },
  'first-drink': { ambientScale: 0.65, repulsionScale: 0.90 },
  buzzed: { ambientScale: 1.0, repulsionScale: 1.05 },
  drunk: { ambientScale: 1.35, repulsionScale: 1.20 },
  'party-peak': { ambientScale: 1.60, repulsionScale: 1.35 },
  'passed-out': { ambientScale: 0.25, repulsionScale: 0.50 },
  question: { ambientScale: 0.0, repulsionScale: 0.0 }, // Question: completely still
  rebuild: { ambientScale: 0.45, repulsionScale: 0.80 },
  reveal: { ambientScale: 0.25, repulsionScale: 0.70 },
};

export const useCollageMotion = (
  containerRef: React.RefObject<HTMLElement>,
  sceneId: SceneId
) => {
  const { isReducedMotion } = useAnimation();
  const cleanupRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Question scene is intentionally completely still
    if (sceneId === 'question') {
      return;
    }

    if (isReducedMotion) {
      // Ensure any inline motion transforms are cleared
      const pointerLayers = container.querySelectorAll<HTMLElement>('.motion-pointer-layer');
      const ambientLayers = container.querySelectorAll<HTMLElement>('.motion-ambient-layer');
      pointerLayers.forEach((layer) => {
        layer.style.transform = '';
      });
      ambientLayers.forEach((layer) => {
        layer.style.transform = '';
      });
      return;
    }

    initGlobalPointerListeners();

    const profile = SCENE_MOTION_PROFILES[sceneId] ?? { ambientScale: 1.0, repulsionScale: 1.0 };
    if (profile.ambientScale === 0 && profile.repulsionScale === 0) {
      return;
    }

    // Discover eligible elements within the scene container
    const domElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        '.scene-layer.art-card, .rebuild-fragment, .reveal-layer'
      )
    );

    const items: AnimatedElementConfig[] = [];

    domElements.forEach((el, index) => {
      const pointerEl = el.querySelector<HTMLElement>('.motion-pointer-layer');
      const ambientEl = el.querySelector<HTMLElement>('.motion-ambient-layer');
      if (!pointerEl || !ambientEl) return;

      const role = el.dataset.role || 'object';
      const plane = el.dataset.plane || 'D';
      const className = el.className || '';

      // Main character / protagonist exclusion check (Task 03C.1)
      const isProtagonist =
        el.classList.contains('art-card-protagonist') ||
        el.classList.contains('plan-character') ||
        el.classList.contains('drink-character') ||
        el.classList.contains('buzzed-character') ||
        el.classList.contains('drunk-character') ||
        el.classList.contains('peak-character') ||
        el.classList.contains('passed-character') ||
        el.classList.contains('rebuild-protagonist-wrapper') ||
        el.classList.contains('reveal-protagonist-wrapper') ||
        role === 'protagonist';

      const isTexture = role === 'texture' || el.classList.contains('material-texture-overlay');

      // 1. Ambient eligibility per scene narrative guidelines (Task 03C.4)
      let ambientMultiplier = 0;
      if (!isProtagonist && !isTexture && profile.ambientScale > 0) {
        if (sceneId === 'plan') {
          // Only selected paper scraps or graphic marks
          if (role === 'paper' || role === 'graphic') {
            ambientMultiplier = 0.8;
          }
        } else if (sceneId === 'first-drink') {
          // Stickers, party graphics, and near-field objects
          if (role === 'graphic' || role === 'paper') {
            ambientMultiplier = 1.0;
          } else if (role === 'object' && plane === 'E') {
            ambientMultiplier = 0.7;
          }
        } else if (sceneId === 'passed-out') {
          // Depleted, settled state: only faint drift on paper scraps
          if (role === 'paper') {
            ambientMultiplier = 0.5;
          }
        } else if (sceneId === 'rebuild') {
          if (role === 'graphic' || role === 'paper') {
            ambientMultiplier = 0.7;
          }
        } else if (sceneId === 'reveal') {
          if (role === 'graphic' || role === 'paper') {
            ambientMultiplier = 0.6;
          }
        } else {
          // Buzzed, Drunk, Party Peak: active layers
          if (role === 'graphic' || role === 'paper') {
            ambientMultiplier = 1.1;
          } else if (role === 'object') {
            ambientMultiplier = 0.85;
          }
        }
      }

      // 2. Repulsion eligibility and response tuning by depth & role (Task 03C.5)
      let maxDisplacement = 0;
      let radius = 200;

      if (!isProtagonist && !isTexture && profile.repulsionScale > 0) {
        if (plane === 'E' || role === 'graphic' || role === 'paper') {
          // Near-field stickers and small paper fragments: most responsive
          maxDisplacement = 34 * profile.repulsionScale;
          radius = 220;
        } else if (plane === 'D' || role === 'object') {
          // Mid-ground objects: moderate response
          maxDisplacement = 18 * profile.repulsionScale;
          radius = 185;
        } else if (plane === 'B') {
          // Distant decorative layers: very subtle response
          maxDisplacement = 7 * profile.repulsionScale;
          radius = 150;
        }
      }

      const hasAmbient = ambientMultiplier > 0;
      const hasRepulsion = maxDisplacement > 0;

      if (!hasAmbient && !hasRepulsion) return;

      // Deterministic PRNG seeding from class and index
      const hash = hashString(`${className}-${index}-${sceneId}`);
      const rnd = (step: number) => {
        const s = (hash + step * 1337) % 233280;
        return s / 233280;
      };

      // Incommensurate periods (4.0s - 9.5s) preventing circular / orbital paths
      const t1 = 4.8 + rnd(1) * 3.4;
      const t2 = 6.6 + rnd(2) * 3.6;
      const t3 = 4.2 + rnd(3) * 3.2;
      const t4 = 6.0 + rnd(4) * 3.5;
      const tr = 7.5 + rnd(5) * 4.5;

      const ax = (1.4 + rnd(11) * 0.9) * profile.ambientScale * ambientMultiplier;
      const ay = (1.4 + rnd(12) * 0.9) * profile.ambientScale * ambientMultiplier;
      const ar = (0.2 + rnd(13) * 0.16) * profile.ambientScale * ambientMultiplier;

      items.push({
        el,
        pointerEl,
        ambientEl,
        hasAmbient,
        hasRepulsion,
        ax,
        ay,
        ar,
        w1: (2 * Math.PI) / t1,
        w2: (2 * Math.PI) / t2,
        w3: (2 * Math.PI) / t3,
        w4: (2 * Math.PI) / t4,
        wr: (2 * Math.PI) / tr,
        p1: rnd(6) * 2 * Math.PI,
        p2: rnd(7) * 2 * Math.PI,
        p3: rnd(8) * 2 * Math.PI,
        p4: rnd(9) * 2 * Math.PI,
        pr: rnd(10) * 2 * Math.PI,
        radius,
        maxDisplacement,
        currentX: 0,
        currentY: 0,
        lastAppliedX: 0,
        lastAppliedY: 0,
      });
    });

    if (items.length === 0) return;

    // Viewport visibility tracking via IntersectionObserver
    let isIntersecting = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0 }
    );
    observer.observe(container);

    // Master ticker loop driven by GSAP central ticker
    const tickCallback = (time: number, deltaTime: number) => {
      if (!isIntersecting) return;

      const dtSeconds = Math.min(deltaTime / 1000, 0.1);
      const hasPointer =
        globalPointer.active &&
        globalPointer.isFinePointer &&
        !isReducedMotion;
      const px = globalPointer.x;
      const py = globalPointer.y;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // 1. Subtle Ambient Motion
        if (item.hasAmbient) {
          const ambX =
            item.ax *
            (0.72 * Math.sin(item.w1 * time + item.p1) +
              0.28 * Math.cos(item.w2 * time + item.p2));
          const ambY =
            item.ay *
            (0.72 * Math.cos(item.w3 * time + item.p3) +
              0.28 * Math.sin(item.w4 * time + item.p4));
          const ambRot = item.ar * Math.sin(item.wr * time + item.pr);

          item.ambientEl.style.transform = `translate3d(${ambX.toFixed(2)}px, ${ambY.toFixed(2)}px, 0) rotate(${ambRot.toFixed(3)}deg)`;
        }

        // 2. Cursor Repulsion Field
        if (item.hasRepulsion) {
          let targetX = 0;
          let targetY = 0;

          if (hasPointer) {
            const rect = item.el.getBoundingClientRect();
            const cx = rect.left + rect.width * 0.5;
            const cy = rect.top + rect.height * 0.5;
            const dx = cx - px;
            const dy = cy - py;
            const dist = Math.hypot(dx, dy);

            if (dist < item.radius && dist > 0.5) {
              const q = 1 - dist / item.radius;
              // Smooth Hermite smoothstep falloff: zero derivative at dist = radius
              const falloff = q * q * (3 - 2 * q);
              const ux = dx / dist;
              const uy = dy / dist;
              targetX = ux * item.maxDisplacement * falloff;
              targetY = uy * item.maxDisplacement * falloff;
            }
          }

          // Frame-rate independent critically damped return (half-life ~70-100ms)
          const isSettling = targetX === 0 && targetY === 0;
          const kSpeed = isSettling ? 8.0 : 15.0;
          const lerpFactor = 1 - Math.exp(-kSpeed * dtSeconds);

          item.currentX += (targetX - item.currentX) * lerpFactor;
          item.currentY += (targetY - item.currentY) * lerpFactor;

          if (isSettling) {
            if (Math.abs(item.currentX) < 0.1) item.currentX = 0;
            if (Math.abs(item.currentY) < 0.1) item.currentY = 0;
          }

          if (
            item.currentX !== item.lastAppliedX ||
            item.currentY !== item.lastAppliedY
          ) {
            item.lastAppliedX = item.currentX;
            item.lastAppliedY = item.currentY;
            if (item.currentX === 0 && item.currentY === 0) {
              item.pointerEl.style.transform = 'translate3d(0, 0, 0)';
            } else {
              item.pointerEl.style.transform = `translate3d(${item.currentX.toFixed(2)}px, ${item.currentY.toFixed(2)}px, 0)`;
            }
          }
        }
      }
    };

    gsap.ticker.add(tickCallback);

    cleanupRef.current = () => {
      observer.disconnect();
      gsap.ticker.remove(tickCallback);
      items.forEach((item) => {
        item.ambientEl.style.transform = '';
        item.pointerEl.style.transform = '';
      });
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [containerRef, sceneId, isReducedMotion]);
};
