import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';

export interface QuestionSceneProps {
  id?: string;
}

/**
 * QuestionScene implements the pivotal graphic pause (storyboard.md Sec 4.3, architecture.md Sec 24).
 * Strips all ambient UI/HUD and commands maximum typographic focus.
 * Connects causally from the passed-out scene's emptying exit into stark interruption.
 */
export const QuestionScene: React.FC<QuestionSceneProps> = ({ id = 'question' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: id,
    pin: true,
    start: 'top top',
    end: '+=1200',
    scrub: 0.6,
    anticipatePin: 1,
    buildTimeline: (tl) => {
      // Phase 1: Hold on emptiness — deliberate pause after passed-out collapse (0 → 0.25)
      // No animation — the screen stays dark, building tension

      // Phase 2: Card materializes from the void (0.25 → 0.6)
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { scale: 0.8, opacity: 0, y: 50, rotation: -2 },
          { scale: 1, opacity: 1, y: 0, rotation: -0.8, duration: 0.35, ease: 'power3.out' },
          0.25
        );
      }

      // Phase 3: Stamp appears — editorial punctuation (0.55 → 0.7)
      if (stampRef.current) {
        tl.fromTo(
          stampRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.55
        );
      }

      // Phase 4: Hold for contemplation (0.7 → 0.85)
      // Intentionally empty — let the question breathe

      // Phase 5: Card recedes as we prepare for the rebuild (0.85 → 1.0)
      if (cardRef.current) {
        tl.to(cardRef.current, { scale: 0.92, opacity: 0.4, y: -20, duration: 0.15, ease: 'power2.in' }, 0.85);
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id={`scene-${id}`}
      data-scene-id={id}
      aria-label="The Turning Question: What if you did not have to miss college tomorrow?"
      className="scene-section scene-question"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        padding: 'var(--space-xl)',
      }}
    >
      {/* Background Halftone Texture */}
      <div className="texture-halftone" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} aria-hidden="true" />

      {/* Stark Question Card */}
      <div
        ref={cardRef}
        className="question-card torn-edge-top torn-edge-bottom"
        style={{
          position: 'relative',
          maxWidth: '880px',
          width: '100%',
          backgroundColor: 'var(--color-paper)',
          color: 'var(--color-ink)',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          textAlign: 'center',
          transform: 'rotate(-0.8deg)',
          opacity: 0,
        }}
      >
        {/* Collage tape strips */}
        <div className="tape-strip" style={{ top: -12, left: '15%', width: '80px' }} aria-hidden="true" />
        <div className="tape-strip" style={{ top: -12, right: '15%', width: '80px' }} aria-hidden="true" />

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 5.8rem)',
            lineHeight: 0.88,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            margin: 0,
          }}
        >
          WHAT IF YOU DIDN&apos;T HAVE TO MISS COLLEGE TOMORROW?
        </h2>

        {/* Small editorial stamp */}
        <div
          ref={stampRef}
          style={{
            marginTop: 'var(--space-lg)',
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-purple)',
            borderTop: '2px solid var(--color-purple)',
            paddingTop: 'var(--space-xs)',
            opacity: 0,
          }}
        >
          // THE QUESTION THAT CHANGES THE NIGHT
        </div>
      </div>
    </section>
  );
};
