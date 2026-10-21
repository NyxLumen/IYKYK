import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';

export interface QuestionSceneProps {
  id?: string;
}

/**
 * QuestionScene implements the pivotal graphic pause (storyboard.md Sec 4.3, architecture.md Sec 24).
 * Strips all ambient UI/HUD and commands maximum typographic focus.
 */
export const QuestionScene: React.FC<QuestionSceneProps> = ({ id = 'question' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: id,
    pin: true,
    start: 'top top',
    end: '+=1000',
    scrub: 0.6,
    buildTimeline: (tl) => {
      if (!cardRef.current) return;
      tl.fromTo(
        cardRef.current,
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
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
        backgroundColor: 'var(--color-ink)',
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
          WHAT IF YOU DIDN'T HAVE TO MISS COLLEGE TOMORROW?
        </h2>

        {/* Small editorial stamp */}
        <div
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
          }}
        >
          // THE QUESTION THAT CHANGES THE NIGHT
        </div>
      </div>
    </section>
  );
};
