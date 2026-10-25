import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { CTA } from '../components/CTA';

export interface RevealSceneProps {
  id?: string;
}

/**
 * RevealScene delivers the confident resolution and IYKYK brand reveal (storyboard.md Sec 05 Scene 08).
 * Connected to the rebuild's exit via scrub-based scroll animation.
 * Strictly honors anti-drift rules: No invented packshots, claims, or packaging.
 */
export const RevealScene: React.FC<RevealSceneProps> = ({ id = 'reveal' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: id,
    start: 'top 80%',
    end: 'top 10%',
    scrub: 1,
    buildTimeline: (tl) => {
      // Entrance connected from rebuild's exit — elements emerge with confidence
      if (hudRef.current) {
        tl.fromTo(
          hudRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
          0
        );
      }
      if (wordmarkRef.current) {
        tl.fromTo(
          wordmarkRef.current,
          { scale: 0.88, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.1
        );
      }
      if (ctaContainerRef.current) {
        tl.fromTo(
          ctaContainerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
          0.5
        );
      }
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'power1.out' },
          0.7
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id={`scene-${id}`}
      data-scene-id={id}
      aria-label="Scene 09: The Reveal — IYKYK"
      className="scene-section scene-reveal"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        padding: 'var(--space-2xl) var(--space-md)',
        textAlign: 'center',
      }}
    >
      {/* Background Halftone & Grain */}
      <div className="texture-halftone" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} aria-hidden="true" />

      {/* Top Narrative Context HUD */}
      <header
        ref={hudRef}
        style={{
          position: 'absolute',
          top: 'var(--space-md)',
          left: 'var(--space-md)',
          right: 'var(--space-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 'var(--z-meter)',
          opacity: 0,
        }}
      >
        <Clock time="MORNING" variant="digital" visible={true} />
        <Meter value={100} mode="story" visible={true} />
      </header>

      {/* Central Brand Lockup */}
      <div
        ref={wordmarkRef}
        style={{
          position: 'relative',
          zIndex: 'var(--z-typography)',
          maxWidth: '960px',
          width: '100%',
          opacity: 0,
        }}
      >
        <div className="badge-tape badge-purple" style={{ marginBottom: 'var(--space-md)' }}>
          PRE-LAUNCH EXPERIENCE
        </div>

        <h1
          className="headline-monumental font-display"
          style={{
            color: 'var(--color-paper)',
            letterSpacing: '0.04em',
            lineHeight: 0.85,
            textShadow: '0 0 50px var(--color-purple-glow)',
            marginBottom: 'var(--space-xs)',
          }}
        >
          IYKYK
        </h1>

        <p
          className="body-lg"
          style={{
            color: 'var(--color-green)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: 'var(--space-lg)',
          }}
        >
          SAME BRAIN. DIFFERENT WORLD.
        </p>

        <p
          className="body-sm"
          style={{
            maxWidth: '520px',
            margin: '0 auto var(--space-2xl) auto',
            color: 'var(--color-paper-muted)',
          }}
        >
          The night took everything, but the story didn&apos;t end there. Ready for college tomorrow with full clarity and control.
        </p>
      </div>

      {/* CTA Button Action */}
      <div ref={ctaContainerRef} style={{ zIndex: 'var(--z-cta)', opacity: 0 }}>
        <CTA
          label="KNOW MORE →"
          onClick={() => {
            alert('IYKYK — Pre-launch waitlist registration opening soon.');
          }}
        />
      </div>

      {/* Editorial Footnote */}
      <footer
        ref={footerRef}
        style={{
          position: 'absolute',
          bottom: 'var(--space-md)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(237, 228, 217, 0.4)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        ONE NIGHT // ONE STORY // IYKYK © 2026
      </footer>
    </section>
  );
};
