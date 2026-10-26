import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { useCollageMotion } from '../animation/useCollageMotion';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { CTA } from '../components/CTA';
import { ASSET_MANIFEST } from '../data/assets';
import { useAnimation } from '@/app/providers/AnimationProvider';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

export interface RevealSceneProps {
  id?: string;
}

/**
 * RevealScene delivers the confident resolution and IYKYK brand reveal (storyboard.md Sec 05 Scene 08).
 * Task 04A Redesign:
 * 1. Morning Resolution Frame (Beat 1):
 *    - Preserves persistent morning environment plate and HUD (Clock MORNING, Meter 100%)
 *    - Preserves confident protagonist composition on the right
 *    - Torn paper badge, authentic tape, risograph halftone, approved narrative copy
 * 2. Visual Handoff & Ruler/Tick Motif:
 *    - 2-row checkerboard strip and horizontal timeline ruler
 *    - Story narrative milestones (21:30 → 07:58 → MORNING // 100%) with Acid Green indicator dot
 * 3. Bold Editorial CTA & Footer End Card (Beat 2):
 *    - Solid high-contrast Ink Black field (#0B0B0B)
 *    - Supporting kicker line: "SAME BRAIN. DIFFERENT WORLD." (deliberate line break on mobile)
 *    - Oversized monumental "IYKYK" typography spanning viewport width
 *    - Distinctive pill CTA with attached Acid Green circular arrow button centered over headline
 *    - Genuine section navigation (The Plan, Buzzed, Party Peak, Rebuild)
 *    - Editorial split grid (approved narrative description + ticker)
 *    - Compact bottom anchor bar with working replay story action and brand wordmark
 */
export const RevealScene: React.FC<RevealSceneProps> = ({ id = 'reveal' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLElement>(null);
  const protagonistRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: id,
    start: 'top 75%',
    end: 'top 15%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      // 1. Top HUD enters cleanly from above
      if (hudRef.current) {
        tl.fromTo(
          hudRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
          0
        );
      }

      // 2. Confident Protagonist emerges on right
      if (protagonistRef.current) {
        tl.fromTo(
          protagonistRef.current,
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
          0.08
        );
      }

      // 3. Central Brand Poster Lockup arrives
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { y: 30, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
          0.12
        );
      }

      // 4. Secondary collage marks stamp into position
      if (containerRef.current) {
        const revealLayers = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>('.reveal-morning-frame .reveal-layer')
        );
        revealLayers.forEach((layer, idx) => {
          tl.fromTo(
            layer,
            { scale: 1.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)' },
            0.18 + idx * 0.05
          );
        });
      }
    },
  });

  useCollageMotion(containerRef, 'reveal');

  const { lenis } = useAnimation();

  const scrollToScene = (sceneAnchor: string) => {
    if (lenis) {
      lenis.scrollTo(sceneAnchor, { duration: 1.2 });
    } else {
      const el = document.querySelector(sceneAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const replayStory = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id={`scene-${id}`}
      data-scene-id={id}
      aria-label="Scene 09: The Reveal — IYKYK"
      className="scene-section scene-vertical-pass scene-reveal"
    >
      {/* Background Halftone Atmosphere */}
      <div className="texture-halftone" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* BEAT 1: MORNING NARRATIVE RESOLUTION (Preserves existing character plate) */}
      {/* ========================================================================= */}
      <div className="reveal-morning-frame">
        {/* Top Narrative Context HUD */}
        <header ref={hudRef} className="scene-hud">
          <Clock time="MORNING" variant="digital" visible={true} />
          <Meter value={100} mode="story" visible={true} />
        </header>

        {/* Confident Protagonist Artwork with Integrated Star Cluster */}
        <div ref={protagonistRef} className="reveal-protagonist-wrapper" aria-hidden="true">
          <img
            src="/production/source/assetsReady/characters/full/protagonist-full-neutral.png"
            alt="Confident protagonist ready for tomorrow"
          />
          <figure className="art-card reveal-layer reveal-stars" data-plane="E" data-role="graphic">
            <div className="motion-pointer-layer">
              <div className="motion-ambient-layer">
                <img src={assetSrc('graphics.starsGreen')} alt="" loading="lazy" />
              </div>
            </div>
          </figure>
        </div>

        {/* Main Content Resolution Lockup */}
        <div className="reveal-content-container">
          <div ref={cardRef} className="reveal-content-card">
            {/* Halftone risograph wash behind brand headline */}
            <figure
              className="art-card reveal-layer reveal-halftone"
              data-plane="B"
              data-role="texture"
              aria-hidden="true"
            >
              <div className="motion-pointer-layer">
                <div className="motion-ambient-layer">
                  <img src={assetSrc('textures.colorHalftone01')} alt="" loading="lazy" />
                </div>
              </div>
            </figure>

            {/* Authentic Torn Paper Badge with Clear Tape */}
            <div className="reveal-badge-wrapper">
              <figure
                className="art-card reveal-layer reveal-tape"
                data-plane="E"
                data-role="paper"
                aria-hidden="true"
              >
                <div className="motion-pointer-layer">
                  <div className="motion-ambient-layer">
                    <img src={assetSrc('textures.clearTape01')} alt="" loading="lazy" />
                  </div>
                </div>
              </figure>
              <div className="paper-badge-lockup">
                <img
                  src={assetSrc('graphics.paperBadge')}
                  alt=""
                  className="paper-badge-bg"
                  aria-hidden="true"
                />
                <span className="paper-badge-text font-display">PRE-LAUNCH EXPERIENCE</span>
              </div>
              <figure
                className="art-card reveal-layer reveal-bracket"
                data-plane="E"
                data-role="graphic"
                aria-hidden="true"
              >
                <div className="motion-pointer-layer">
                  <div className="motion-ambient-layer">
                    <img src={assetSrc('graphics.bracketGreenPurple')} alt="" loading="lazy" />
                  </div>
                </div>
              </figure>
            </div>

            <h1 className="headline-monumental font-display">IYKYK</h1>

            <div className="reveal-subhead">SAME BRAIN. DIFFERENT WORLD.</div>

            <p className="reveal-description">
              The night took everything, but the story didn&apos;t end there. Ready for college
              tomorrow with full clarity and control.
            </p>

            <div className="reveal-cta-group">
              <div className="reveal-cta-action-row">
                <CTA
                  label="KNOW MORE →"
                  onClick={() => {
                    alert('IYKYK — Pre-launch waitlist registration opening soon.');
                  }}
                />
                <figure
                  className="art-card reveal-layer reveal-barcode-stamp"
                  data-plane="E"
                  data-role="graphic"
                  aria-hidden="true"
                >
                  <div className="motion-pointer-layer">
                    <div className="motion-ambient-layer">
                      <img
                        src={assetSrc('graphics.barcodePurpleGreen')}
                        alt="Barcode"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </figure>
              </div>
              <span className="reveal-microcopy">
                ★ LIMITED PRE-LAUNCH WAITLIST // ZERO JARGON
              </span>
            </div>

            {/* Scroll indicator prompting transition to end card */}
            <button
              type="button"
              className="reveal-scroll-cue"
              onClick={() => scrollToScene('#editorial-endcard')}
              aria-label="Scroll to final call to action and footer"
            >
              <span>SCROLL TO FINISH</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BEAT 2: BOLD EDITORIAL END CARD & FOOTER (Task 04A Art Direction)          */}
      {/* ========================================================================= */}
      <div id="editorial-endcard" ref={endCardRef} className="reveal-endcard-frame">
        {/* Top Boundary Frame: Checkerboard Strip & Timeline Ruler Motif */}
        <div className="endcard-ruler-motif" aria-label="Narrative timeline ruler">
          <div className="endcard-checkerboard" aria-hidden="true" />
          <div className="endcard-ruler-scale" aria-hidden="true">
            {/* Story milestones */}
            <div className="ruler-milestone milestone-plan">
              <span className="ruler-tick ruler-tick--major" />
              <span className="ruler-label">21:30</span>
            </div>
            <div className="ruler-subticks">
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--medium" />
              <span className="ruler-tick ruler-tick--minor" />
            </div>
            <div className="ruler-milestone milestone-drink">
              <span className="ruler-tick ruler-tick--major" />
              <span className="ruler-label">22:15</span>
            </div>
            <div className="ruler-subticks">
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--medium" />
              <span className="ruler-tick ruler-tick--minor" />
            </div>
            <div className="ruler-milestone milestone-buzzed">
              <span className="ruler-tick ruler-tick--major" />
              <span className="ruler-label">23:40</span>
            </div>
            <div className="ruler-subticks">
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--medium" />
              <span className="ruler-tick ruler-tick--minor" />
            </div>
            <div className="ruler-milestone milestone-drunk">
              <span className="ruler-tick ruler-tick--major" />
              <span className="ruler-label">01:20</span>
            </div>
            <div className="ruler-subticks">
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--medium" />
              <span className="ruler-tick ruler-tick--minor" />
            </div>
            <div className="ruler-milestone milestone-peak">
              <span className="ruler-tick ruler-tick--major" />
              <span className="ruler-label">03:17</span>
            </div>
            <div className="ruler-subticks">
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--medium" />
              <span className="ruler-tick ruler-tick--minor" />
            </div>
            <div className="ruler-milestone milestone-passed">
              <span className="ruler-tick ruler-tick--major" />
              <span className="ruler-label">07:58</span>
            </div>
            <div className="ruler-subticks">
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--minor" />
              <span className="ruler-tick ruler-tick--medium" />
              <span className="ruler-tick ruler-tick--minor" />
            </div>
            <div className="ruler-milestone milestone-morning active-marker">
              <span className="ruler-tick ruler-tick--major ruler-tick--green" />
              <span className="ruler-label ruler-label--green">MORNING</span>
              <span className="ruler-dot-green" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Central Editorial Billboard */}
        <div className="endcard-billboard">
          {/* Supporting line / kicker */}
          <div className="endcard-kicker font-display">
            <span className="endcard-kicker-part">SAME BRAIN.</span>
            <span className="endcard-kicker-part">DIFFERENT WORLD.</span>
          </div>

          {/* Monumental Headline with Integrated Pill CTA Lockup */}
          <div className="endcard-headline-stage">
            <h2 className="endcard-monumental-headline font-display">IYKYK</h2>

            <div className="endcard-cta-lockup">
              <CTA
                label="KNOW MORE →"
                onClick={() => {
                  alert('IYKYK — Pre-launch waitlist registration opening soon.');
                }}
              />
            </div>
          </div>

          {/* Narrative Section Anchor Navigation */}
          <nav className="endcard-section-nav" aria-label="Story chapter navigation">
            <button
              type="button"
              className="endcard-nav-link"
              onClick={() => scrollToScene('#scene-plan')}
            >
              PLAN
            </button>
            <span className="endcard-nav-star" aria-hidden="true">
              ✦
            </span>
            <button
              type="button"
              className="endcard-nav-link"
              onClick={() => scrollToScene('#scene-first-drink')}
            >
              FIRST DRINK
            </button>
            <span className="endcard-nav-star" aria-hidden="true">
              ✦
            </span>
            <button
              type="button"
              className="endcard-nav-link"
              onClick={() => scrollToScene('#scene-party-peak')}
            >
              PARTY PEAK
            </button>
            <span className="endcard-nav-star" aria-hidden="true">
              ✦
            </span>
            <button
              type="button"
              className="endcard-nav-link"
              onClick={() => scrollToScene('#scene-rebuild')}
            >
              REBUILD
            </button>
          </nav>
        </div>

        {/* Compact Editorial Footer */}
        <footer className="endcard-footer" role="contentinfo">
          {/* Upper Tier: Split Grid */}
          <div className="endcard-footer-grid">
            <div className="footer-grid-cell footer-grid-left">
              <p className="footer-narrative-quote">
                THE NIGHT TOOK EVERYTHING, BUT THE STORY DIDN&apos;T END THERE. READY FOR COLLEGE
                TOMORROW WITH FULL CLARITY AND CONTROL.
              </p>
            </div>
            <div className="footer-grid-cell footer-grid-right" aria-hidden="true">
              <div className="footer-ticker-track">
                <span className="footer-ticker-text">
                  ✦ SAME BRAIN. DIFFERENT WORLD. ✦ 100% SOBER ✦ IYKYK PRE-LAUNCH ✦ ONE NIGHT // ONE
                  STORY ✦
                </span>
                <span className="footer-ticker-text">
                  ✦ SAME BRAIN. DIFFERENT WORLD. ✦ 100% SOBER ✦ IYKYK PRE-LAUNCH ✦ ONE NIGHT // ONE
                  STORY ✦
                </span>
              </div>
            </div>
          </div>

          {/* Lower Tier: Anchor Bar */}
          <div className="endcard-footer-anchor">
            <div className="footer-anchor-left">
              <span className="footer-globe-icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <span className="footer-brand-tag">IYKYK PRE-LAUNCH</span>
            </div>

            <div className="footer-anchor-center" aria-label="Navigation controls">
              <button
                type="button"
                className="footer-pill-button"
                onClick={replayStory}
                aria-label="Replay story from the beginning"
              >
                REPLAY STORY
              </button>
              <button
                type="button"
                className="footer-pill-button"
                onClick={() => scrollToScene('#scene-plan')}
              >
                THE PLAN
              </button>
              <button
                type="button"
                className="footer-pill-button"
                onClick={() => scrollToScene('#scene-party-peak')}
              >
                PARTY PEAK
              </button>
              <button
                type="button"
                className="footer-pill-button"
                onClick={() => scrollToScene('#scene-rebuild')}
              >
                REBUILD
              </button>
            </div>

            <div className="footer-anchor-right">
              <span className="footer-signature">
                ONE NIGHT // ONE STORY // <strong className="footer-wordmark font-display">IYKYK</strong>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};
