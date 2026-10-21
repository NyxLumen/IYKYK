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
          invalidateOnRefresh: true,
        },
      });

      timelineRef.current = tl;

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
