import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '@/app/providers/AnimationProvider';
import { PopArtLabel } from '@/components/comic';
import { assets } from '@/experience/data/assets';
import './Scene00Opening.css';

gsap.registerPlugin(ScrollTrigger);

export interface Scene00OpeningProps {
  /** If true, runs a preview intro animation without requiring page scroll */
  standalone?: boolean;
}

/**
 * Scene 0: Comic-Book Opening Establishing Card.
 *
 * Visual World:
 * - Full-scene bedroom/study environment background (env-bedroom-study-night)
 * - Main focal point: Pop Art Label featuring "FINALLY BACK FROM COLLEGE"
 *   (reusing existing Pop Art Label / ComicAction component, cream variant)
 * - College backpack sticker (object-college-bag-01) dropped into lower-left
 * - Desk lamp sticker (object-desk-lamp-01) anchored to the study desk in lower-right
 * - Green and purple lightning graphic (graphic-lightning-green-purple) upper-right comic accent
 * - Expressive, asymmetrical, editorial zine composition with tactile comic energy
 */
export const Scene00Opening: React.FC<Scene00OpeningProps> = ({ standalone = false }) => {
  const containerRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);

  const { isReducedMotion } = useAnimation();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const bag = bagRef.current;
      const lamp = lampRef.current;
      const lightning = lightningRef.current;
      const env = envRef.current;

      if (isReducedMotion) {
        gsap.set([label, bag, lamp, lightning, env], {
          opacity: 1,
          visibility: 'visible',
          clearProps: 'transform',
        });
        return;
      }

      if (standalone) {
        // Standalone preview animation
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.fromTo(
          label,
          { opacity: 0, scale: 0.92, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.65 },
          0.05
        );

        tl.fromTo(
          bag,
          { opacity: 0, y: 35, rotate: -12 },
          { opacity: 1, y: 0, rotate: -6, duration: 0.6 },
          0.15
        );

        tl.fromTo(
          lamp,
          { opacity: 0, y: 35, rotate: 10 },
          { opacity: 1, y: 0, rotate: 4, duration: 0.6 },
          0.2
        );

        tl.fromTo(
          lightning,
          { opacity: 0, scale: 0.6, rotate: -24 },
          { opacity: 1, scale: 1, rotate: -14, duration: 0.5, ease: 'back.out(1.8)' },
          0.28
        );

        return;
      }

      // Scroll-driven pinned sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=650',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Comic panel entrance (0.00 -> 0.35)
      // Pop Art Label stamps into view as the primary headline
      tl.fromTo(
        label,
        { opacity: 0, scale: 0.9, y: -25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: 'power2.out' },
        0.04
      );

      // Backpack settles on the floor
      tl.fromTo(
        bag,
        { opacity: 0, y: 40, rotate: -14 },
        { opacity: 1, y: 0, rotate: -6, duration: 0.3, ease: 'power2.out' },
        0.08
      );

      // Desk lamp anchors to the study desk
      tl.fromTo(
        lamp,
        { opacity: 0, y: 40, rotate: 10 },
        { opacity: 1, y: 0, rotate: 4, duration: 0.3, ease: 'power2.out' },
        0.1
      );

      // Lightning crackles into upper-right corner pointing back to headline
      tl.fromTo(
        lightning,
        { opacity: 0, scale: 0.5, rotate: -24 },
        { opacity: 1, scale: 1, rotate: -14, duration: 0.25, ease: 'back.out(1.8)' },
        0.14
      );

      // Phase 2: Positional Multiplane Comic Read Hold (0.35 -> 0.70)
      // Subtle physical drift allowing the reader to read the panel comfortably
      tl.to(label, { y: -10, duration: 0.35, ease: 'none' }, 0.35);
      tl.to(bag, { y: -14, duration: 0.35, ease: 'none' }, 0.35);
      tl.to(lamp, { y: -18, duration: 0.35, ease: 'none' }, 0.35);
      tl.to(lightning, { y: -8, duration: 0.35, ease: 'none' }, 0.35);

      // Phase 3: Seamless transition into Scene 1 (The Plan) (0.70 -> 1.0)
      // Opening panel lifts away and hands off cleanly into the bedroom preparation
      tl.to(label, { opacity: 0, y: -36, scale: 0.96, duration: 0.26, ease: 'power2.in' }, 0.72);
      tl.to(lightning, { opacity: 0, scale: 0.7, duration: 0.22, ease: 'power2.in' }, 0.72);
      tl.to(lamp, { opacity: 0, x: 25, duration: 0.24, ease: 'power2.in' }, 0.74);
      tl.to(bag, { opacity: 0, x: -25, duration: 0.24, ease: 'power2.in' }, 0.74);

      // Final handoff: fade section cleanly before Scene 1 pins
      tl.to(el, { autoAlpha: 0, duration: 0.08, ease: 'none' }, 0.94);
    }, el);

    return () => {
      ctx.revert();
    };
  }, [standalone, isReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="scene-0"
      data-scene-id="scene-0"
      aria-label="Scene 0: FINALLY BACK FROM COLLEGE"
      className="scene-section scene-0 scene-vertical-pass"
    >
      {/* 1. Full-scene bedroom/study environment background */}
      <div ref={envRef} className="scene-0-env" aria-hidden="true">
        <img
          src={assets.environments.bedroomStudyNight.src}
          srcSet={assets.environments.bedroomStudyNight.srcSet}
          sizes="100vw"
          alt=""
          className="scene-0-env-img"
          loading="eager"
          decoding="async"
        />
        <div className="scene-0-env-atmosphere" />
      </div>

      {/* 2. Structured composition frame */}
      <div ref={compositionRef} className="scene-0-composition">
        {/* Main Comic Pop Art Label (Focal point: slightly above visual center, intentional offset) */}
        <div ref={labelRef} className="scene-0-label-wrap">
          <PopArtLabel
            variant="cream"
            size="large"
            rotation={-1.8}
            className="scene-0-pop-art-label"
          >
            <span className="scene-0-headline-line">FINALLY BACK FROM</span>{' '}
            <span className="scene-0-headline-line">COLLEGE</span>
          </PopArtLabel>
        </div>

        {/* Lower-left: College Backpack sticker (dropped into room by bed) */}
        <div ref={bagRef} className="scene-0-sticker scene-0-sticker-bag">
          <img
            src={assets.objects.collegeBag01.src}
            srcSet={assets.objects.collegeBag01.srcSet}
            sizes="(max-width: 768px) 38vw, 22vw"
            alt="Purple college backpack dropped on bedroom floor"
            className="scene-0-sticker-img"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Lower-right: Desk Lamp sticker (connected to study desk) */}
        <div ref={lampRef} className="scene-0-sticker scene-0-sticker-lamp">
          <img
            src={assets.objects.deskLamp01.src}
            srcSet={assets.objects.deskLamp01.srcSet}
            sizes="(max-width: 768px) 38vw, 22vw"
            alt="Articulated desk study lamp"
            className="scene-0-sticker-img"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Upper-right: Lightning graphic (accent directing attention back toward headline) */}
        <div
          ref={lightningRef}
          className="scene-0-sticker scene-0-sticker-lightning"
          aria-hidden="true"
        >
          <img
            src={assets.graphics.lightningGreenPurple.src}
            srcSet={assets.graphics.lightningGreenPurple.srcSet}
            sizes="(max-width: 768px) 20vw, 9vw"
            alt=""
            className="scene-0-sticker-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
