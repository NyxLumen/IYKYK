import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '@/app/providers/AnimationProvider';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSection: Opening Cover / Poster for the IYKYK Experience.
 *
 * Visual World:
 * - Ink Black #0B0B0B poster field
 * - Monumental Acid Green (#39EF88) "YOU READY?" display headline
 * - Oversized protagonist cutout sitting in front of typography
 * - Tactile photocopy & graphic marks: lightning bolt, eye, smiley
 * - Subtle editorial navigation annotations: "↓ SCROLL TO START" and "GO TO THE REVEAL ↗"
 * - Restrained physical scroll transition handing off directly into Scene 01 (The Plan)
 */
export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const smileyRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLButtonElement>(null);
  const skipCueRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const { lenis, isReducedMotion } = useAnimation();

  const handleScrollToStart = () => {
    if (lenis) {
      lenis.scrollTo('#scene-plan', { duration: 1.2 });
    } else {
      const target = document.querySelector('#scene-plan');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToReveal = () => {
    if (lenis) {
      lenis.scrollTo('#scene-reveal', { duration: 1.6 });
    } else {
      const target = document.querySelector('#scene-reveal');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const headline = headlineRef.current;
      const character = characterRef.current;
      const lightning = lightningRef.current;
      const eye = eyeRef.current;
      const smiley = smileyRef.current;
      const scrollCue = scrollCueRef.current;
      const skipCue = skipCueRef.current;
      const backdrop = backdropRef.current;

      if (isReducedMotion) {
        gsap.set(
          [headline, character, lightning, eye, smiley, scrollCue, skipCue],
          {
            opacity: 1,
            visibility: 'visible',
            clearProps: 'transform',
          }
        );
        return;
      }

      // Initial Entrance: Subtle settling into poster field (Poster -> Alive)
      const tlEnter = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (headline) {
        tlEnter.fromTo(
          headline,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          0.05
        );
      }

      if (character) {
        tlEnter.fromTo(
          character,
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          0.12
        );
      }

      const graphics = [lightning, eye, smiley].filter(Boolean);
      if (graphics.length > 0) {
        tlEnter.fromTo(
          graphics,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.65, stagger: 0.08, ease: 'back.out(1.6)' },
          0.25
        );
      }

      const cues = [scrollCue, skipCue].filter(Boolean);
      if (cues.length > 0) {
        tlEnter.fromTo(
          cues,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.45
        );
      }

      // Scroll Transition: Camera moves from poster cover into the film (Scene 01)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=800',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Navigation cues immediately disappear on intentional scroll
      if (cues.length > 0) {
        tlScroll.to(cues, { opacity: 0, y: -10, duration: 0.2, ease: 'power1.in' }, 0);
      }

      // Phase 2: Graphic elements drift and disperse
      if (headline) {
        tlScroll.to(
          headline,
          { y: -90, opacity: 0, scale: 1.04, duration: 0.7, ease: 'power2.inOut' },
          0.08
        );
      }

      if (lightning) {
        tlScroll.to(
          lightning,
          { x: -70, y: -50, rotate: -22, opacity: 0, duration: 0.65, ease: 'power2.inOut' },
          0.1
        );
      }

      if (eye) {
        tlScroll.to(
          eye,
          { x: -65, y: 45, rotate: -16, opacity: 0, duration: 0.65, ease: 'power2.inOut' },
          0.12
        );
      }

      if (smiley) {
        tlScroll.to(
          smiley,
          { x: 75, y: -30, rotate: 22, opacity: 0, duration: 0.65, ease: 'power2.inOut' },
          0.12
        );
      }

      // Phase 3: Protagonist subtly scales & repositions downward into the story frame
      if (character) {
        tlScroll.to(
          character,
          { y: 70, scale: 0.94, opacity: 0, duration: 0.7, ease: 'power2.inOut' },
          0.15
        );
      }

      // Phase 4: Poster backdrop dissolves, revealing Scene 01 environment
      if (backdrop) {
        tlScroll.to(backdrop, { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.45);
      }

      // Phase 5: Complete handoff — hide hero container when scroll reaches Scene 01
      tlScroll.to(el, { autoAlpha: 0, duration: 0.08, ease: 'none' }, 0.92);
    }, el);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="scene-hero"
      data-scene-id="hero"
      aria-label="Opening Cover: YOU READY?"
      className="scene-section scene-hero scene-vertical-pass"
    >
      {/* Ink-black poster field backdrop */}
      <div ref={backdropRef} className="hero-backdrop" aria-hidden="true" />

      {/* Subtle physical print / photocopy texture substrate */}
      <div className="hero-texture-wash" aria-hidden="true" />

      {/* Hero Headline: Behind Protagonist */}
      <div className="hero-headline-layer">
        <h1 ref={headlineRef} className="hero-monumental-headline font-display">
          YOU READY?
        </h1>
      </div>

      {/* Main Character: Cutout waist-up crop centered in front of typography */}
      <div ref={characterRef} className="hero-character-wrap">
        <img
          src="/production/source/assetsReady/characters/full/protagonist-full-getting-ready.png"
          alt="Faceless protagonist in jacket zipping up collar"
          className="hero-character-img"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Graphic Elements: Sparse collage assets */}
      <div ref={lightningRef} className="hero-graphic hero-graphic-lightning" aria-hidden="true">
        <img
          src="/production/source/assetsReady/graphics/graphic-lightning-green-purple.png"
          alt=""
          loading="eager"
          decoding="async"
        />
      </div>

      <div ref={eyeRef} className="hero-graphic hero-graphic-eye" aria-hidden="true">
        <img
          src="/production/source/assetsReady/graphics/graphic-eye-green.png"
          alt=""
          loading="eager"
          decoding="async"
        />
      </div>

      <div ref={smileyRef} className="hero-graphic hero-graphic-smiley" aria-hidden="true">
        <img
          src="/production/source/assetsReady/graphics/graphic-smiley-green.png"
          alt=""
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Interactive Editorial Navigation Controls */}
      <div className="hero-controls-layer">
        <button
          ref={scrollCueRef}
          type="button"
          onClick={handleScrollToStart}
          className="hero-scroll-cue font-body"
          aria-label="Scroll down to begin story"
        >
          <span className="hero-scroll-arrow" aria-hidden="true">
            ↓
          </span>
          <span className="hero-scroll-label">SCROLL TO START</span>
        </button>

        <button
          ref={skipCueRef}
          type="button"
          onClick={handleScrollToReveal}
          className="hero-skip-cue font-body"
          aria-label="Skip story and go to final reveal"
        >
          <span className="hero-skip-label">GO TO THE REVEAL</span>
          <span className="hero-skip-arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
};
