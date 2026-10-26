import React, { useRef } from 'react';
import { CTA } from '../components/CTA';
import { useAnimation } from '@/app/providers/AnimationProvider';

export interface RevealSceneProps {
  id?: string;
}

/**
 * RevealScene delivers the bold editorial end card and footer (Task 04A/04B).
 * Directly follows Scene 08: Rebuild without a duplicate morning CTA frame.
 */
export const RevealScene: React.FC<RevealSceneProps> = ({ id = 'reveal' }) => {
  const containerRef = useRef<HTMLElement>(null);
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
      {/* ========================================================================= */}
      {/* BOLD EDITORIAL END CARD & FOOTER                                          */}
      {/* ========================================================================= */}
      <div id="editorial-endcard" className="reveal-endcard-frame">
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
