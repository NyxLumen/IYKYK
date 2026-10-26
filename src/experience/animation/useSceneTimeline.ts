import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '@/app/providers/AnimationProvider';

gsap.registerPlugin(ScrollTrigger);

export interface SceneTimelineOptions {
  sceneId: string;
  pin?: boolean;
  pinSpacing?: boolean;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  anticipatePin?: number;
  buildTimeline?: (tl: gsap.core.Timeline, target: HTMLElement) => void;
}

/**
 * useSceneTimeline hook manages GSAP ScrollTrigger creation and lifecycle cleanup (architecture.md Section 15 & 19).
 * Prevents memory leaks and duplicate ScrollTriggers on React remounts.
 */
export const useSceneTimeline = (
  containerRef: React.RefObject<HTMLElement>,
  options: SceneTimelineOptions
) => {
  const { isReducedMotion } = useAnimation();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use GSAP context for strict React lifecycle cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 75%',
          end: options.end || (options.pin ? '+=1200' : 'bottom 25%'),
          pin: !isReducedMotion && (options.pin ?? false),
          pinSpacing: options.pinSpacing ?? true,
          scrub: isReducedMotion ? false : (options.scrub ?? 0.8),
          anticipatePin: options.anticipatePin ?? 0,
          invalidateOnRefresh: true,
        },
      });

      timelineRef.current = tl;

      if (isReducedMotion) {
        // Reduced motion: ensure all narrative copy, cards, and CTA are immediately visible and readable
        gsap.set(el.querySelectorAll('.art-card, .scene-plane, .rebuild-protagonist-wrapper, .reveal-protagonist-wrapper, .scene-copy, .scene-hud, .question-card, .rebuild-canvas > div, .scene-typography-content, .brand-cta, header, footer, .meter-bar-fill, .meter-bar-label'), {
          opacity: 1,
          visibility: 'visible',
          clearProps: 'transform',
        });
        const rebuildFill = el.querySelector<HTMLElement>('.meter-bar-fill');
        if (rebuildFill && options.sceneId === 'rebuild') {
          rebuildFill.style.width = '100%';
        }
        const rebuildClip = el.querySelector<SVGRectElement>('.battery-clip-rect');
        if (rebuildClip && options.sceneId === 'rebuild') {
          rebuildClip.setAttribute('width', '112');
          rebuildClip.style.width = '112px';
        }
        const rebuildSvg = el.querySelector<SVGSVGElement>('.battery-svg');
        if (rebuildSvg && options.sceneId === 'rebuild') {
          rebuildSvg.style.setProperty('--battery-fill', '100%');
        }
        const rebuildLabel = el.querySelector<HTMLElement>('.meter-bar-label');
        if (rebuildLabel && options.sceneId === 'rebuild') {
          rebuildLabel.textContent = '100%';
        }
        return;
      }

      if (options.buildTimeline) {
        options.buildTimeline(tl, el);
      }
    }, el);

    return () => {
      ctx.revert(); // Reverts all animations and kills attached ScrollTriggers cleanly
    };
  }, [containerRef, options.sceneId, options.pin, options.scrub, isReducedMotion]);

  return timelineRef;
};
