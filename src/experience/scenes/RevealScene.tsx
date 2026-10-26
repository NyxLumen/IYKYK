import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { useCollageMotion } from '../animation/useCollageMotion';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { CTA } from '../components/CTA';
import { ASSET_MANIFEST } from '../data/assets';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

export interface RevealSceneProps {
  id?: string;
}

/**
 * RevealScene delivers the confident resolution and IYKYK brand reveal (storyboard.md Sec 05 Scene 08).
 * Premium editorial poster composition:
 * - Robust vertical centering via dedicated layout column (zero transform clashes)
 * - Authentic torn paper label with clear tape accent
 * - Monumental "IYKYK" typography with risograph halftone wash
 * - Neon green/purple hand-painted brackets framing the subhead
 * - Confident full-body protagonist grounded on the right with integrated star cluster
 * - Launch pass barcode integrated into the CTA lockup
 * - Zero element collisions on desktop and mobile
 */
export const RevealScene: React.FC<RevealSceneProps> = ({ id = 'reveal' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const protagonistRef = useRef<HTMLDivElement>(null);

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

      // 3. Central Brand Poster Lockup & CTA arrives
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
        const revealLayers = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.reveal-layer'));
        revealLayers.forEach((layer, idx) => {
          tl.fromTo(
            layer,
            { scale: 1.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.8)' },
            0.18 + (idx * 0.05)
          );
        });
      }

      // 5. Footer footnote settles
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power1.out' },
          0.5
        );
      }
    },
  });

  useCollageMotion(containerRef, 'reveal');

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

      {/* Main Content & CTA Action Lockup */}
      <div className="reveal-content-container">
        <div ref={cardRef} className="reveal-content-card">
          {/* Halftone risograph wash behind brand headline */}
          <figure className="art-card reveal-layer reveal-halftone" data-plane="B" data-role="texture" aria-hidden="true">
            <div className="motion-pointer-layer">
              <div className="motion-ambient-layer">
                <img src={assetSrc('textures.colorHalftone01')} alt="" loading="lazy" />
              </div>
            </div>
          </figure>

          {/* Authentic Torn Paper Badge with Clear Tape */}
          <div className="reveal-badge-wrapper">
            <figure className="art-card reveal-layer reveal-tape" data-plane="E" data-role="paper" aria-hidden="true">
              <div className="motion-pointer-layer">
                <div className="motion-ambient-layer">
                  <img src={assetSrc('textures.clearTape01')} alt="" loading="lazy" />
                </div>
              </div>
            </figure>
            <div className="paper-badge-lockup">
              <img src={assetSrc('graphics.paperBadge')} alt="" className="paper-badge-bg" aria-hidden="true" />
              <span className="paper-badge-text font-display">PRE-LAUNCH EXPERIENCE</span>
            </div>
            <figure className="art-card reveal-layer reveal-bracket" data-plane="E" data-role="graphic" aria-hidden="true">
              <div className="motion-pointer-layer">
                <div className="motion-ambient-layer">
                  <img src={assetSrc('graphics.bracketGreenPurple')} alt="" loading="lazy" />
                </div>
              </div>
            </figure>
          </div>

          <h1 className="headline-monumental font-display">
            IYKYK
          </h1>

          <div className="reveal-subhead">
            SAME BRAIN. DIFFERENT WORLD.
          </div>

          <p className="reveal-description">
            The night took everything, but the story didn&apos;t end there. Ready for college tomorrow with full clarity and control.
          </p>

          <div className="reveal-cta-group">
            <div className="reveal-cta-action-row">
              <CTA
                label="KNOW MORE →"
                onClick={() => {
                  alert('IYKYK — Pre-launch waitlist registration opening soon.');
                }}
              />
              <figure className="art-card reveal-layer reveal-barcode-stamp" data-plane="E" data-role="graphic" aria-hidden="true">
                <div className="motion-pointer-layer">
                  <div className="motion-ambient-layer">
                    <img src={assetSrc('graphics.barcodePurpleGreen')} alt="Barcode" loading="lazy" />
                  </div>
                </div>
              </figure>
            </div>
            <span className="reveal-microcopy">
              ★ LIMITED PRE-LAUNCH WAITLIST // ZERO JARGON
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Footnote */}
      <footer ref={footerRef} className="scene-footer">
        <span className="footer-item">ONE NIGHT // ONE STORY</span>
        <span className="footer-divider" aria-hidden="true"> // </span>
        <span className="footer-item">IYKYK © 2026</span>
      </footer>
    </section>
  );
};
