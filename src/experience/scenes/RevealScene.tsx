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
 * Strictly honors anti-drift rules: No invented packshots, claims, or packaging.
 */
export const RevealScene: React.FC<RevealSceneProps> = ({ id = 'reveal' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: id,
    start: 'top 80%',
    end: 'bottom bottom',
    scrub: false,
    buildTimeline: (tl) => {
      if (wordmarkRef.current) {
        tl.fromTo(
          wordmarkRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
        );
      }
      if (ctaContainerRef.current) {
        tl.fromTo(
          ctaContainerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.4'
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
        backgroundColor: 'var(--color-ink)',
        overflow: 'hidden',
        padding: 'var(--space-2xl) var(--space-md)',
        textAlign: 'center',
      }}
    >
      {/* Background Halftone & Grain */}
      <div className="texture-halftone" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} aria-hidden="true" />

      {/* Top Narrative Context HUD */}
      <header
        style={{
          position: 'absolute',
          top: 'var(--space-md)',
          left: 'var(--space-md)',
          right: 'var(--space-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 'var(--z-meter)',
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
          The night took everything, but the story didn't end there. Ready for college tomorrow with full clarity and control.
        </p>
      </div>

      {/* CTA Button Action */}
      <div ref={ctaContainerRef} style={{ zIndex: 'var(--z-cta)' }}>
        <CTA
          label="KNOW MORE →"
          onClick={() => {
            alert('IYKYK — Pre-launch waitlist registration opening soon.');
          }}
        />
      </div>

      {/* Editorial Footnote */}
      <footer
        style={{
          position: 'absolute',
          bottom: 'var(--space-md)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(237, 228, 217, 0.4)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        ONE NIGHT // ONE STORY // IYKYK © 2026
      </footer>
    </section>
  );
};
