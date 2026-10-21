import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { Panel } from '../components/Panel';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

export const Scene03Buzzed: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: 'buzzed',
    start: 'top 70%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      if (panel1Ref.current) {
        tl.fromTo(panel1Ref.current, { y: 60, rotation: -6, opacity: 0 }, { y: 0, rotation: -3, opacity: 1, duration: 1 }, 0);
      }
      if (panel2Ref.current) {
        tl.fromTo(panel2Ref.current, { y: -50, rotation: 8, opacity: 0 }, { y: 0, rotation: 4, opacity: 1, duration: 1 }, 0.1);
      }
      if (panel3Ref.current) {
        tl.fromTo(panel3Ref.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 0.2);
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id="scene-buzzed"
      data-scene-id="buzzed"
      aria-label="Scene 03: Buzzed — 11:40 PM"
      className="scene-section scene-buzzed"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-lg)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-ink)',
        borderBottom: '1px solid rgba(237, 228, 217, 0.08)',
      }}
    >
      {/* Narrative HUD (Clock & Meter) */}
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
        <Clock time="11:40 PM" variant="analog" visible={true} />
        <Meter value={60} mode="story" visible={true} />
      </header>

      {/* Halftone Texture Overlay */}
      <div className="texture-halftone" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} aria-hidden="true" />

      <ResponsiveFrame mobile={{ scale: 1.1, x: -5, y: 0 }} desktop={{ scale: 1, x: 0, y: 0 }}>
        <div
          style={{
            maxWidth: '960px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 'var(--z-character)',
          }}
        >
          {/* Overlapping Multi-Panel Collage */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '280px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 'var(--space-xl)',
            }}
          >
            {/* Left Snapshot: Crowded room */}
            <div
              ref={panel1Ref}
              style={{
                position: 'relative',
                width: 'clamp(220px, 30vw, 300px)',
                zIndex: 10,
                transform: 'rotate(-3deg)',
              }}
            >
              <Panel variant="paper" tape={true} torn="both" style={{ padding: 'var(--space-md)' }}>
                <span className="body-xs" style={{ color: 'var(--color-purple)' }}>CROWD // 11:40 PM</span>
                <div
                  style={{
                    height: '90px',
                    margin: 'var(--space-xs) 0',
                    background: 'rgba(11, 11, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-ink)' }}>[DANCING CROWD]</span>
                </div>
              </Panel>
            </div>

            {/* Center Snapshot: Protagonist buzzed posture */}
            <div
              ref={panel3Ref}
              style={{
                position: 'relative',
                width: 'clamp(240px, 34vw, 340px)',
                margin: '0 -30px',
                zIndex: 20,
              }}
            >
              <Panel
                variant="ink"
                tape={true}
                style={{
                  padding: 'var(--space-lg)',
                  border: '1px solid var(--color-green)',
                  boxShadow: '0 0 30px var(--color-green-alpha)',
                }}
              >
                <span className="body-xs" style={{ color: 'var(--color-green)' }}>STATE // BUZZED</span>
                <div
                  style={{
                    height: '110px',
                    margin: 'var(--space-xs) 0',
                    background: 'rgba(57, 239, 136, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-paper)' }}>
                    [PROTAGONIST ENERGETIC // LOOSE]
                  </span>
                </div>
              </Panel>
            </div>

            {/* Right Snapshot: Speaker / Music */}
            <div
              ref={panel2Ref}
              style={{
                position: 'relative',
                width: 'clamp(200px, 26vw, 260px)',
                zIndex: 15,
                transform: 'rotate(4deg)',
              }}
            >
              <Panel variant="paper" tape={true} style={{ padding: 'var(--space-md)' }}>
                <span className="body-xs" style={{ color: 'var(--color-ink)' }}>AUDIO // BASS</span>
                <div
                  style={{
                    height: '80px',
                    margin: 'var(--space-xs) 0',
                    background: 'rgba(11, 11, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-ink)' }}>[SPEAKERS // SOUND WAVES]</span>
                </div>
              </Panel>
            </div>
          </div>

          {/* Scene Headlines */}
          <span className="badge-tape badge-purple" style={{ marginBottom: 'var(--space-xs)' }}>
            SCENE 03 // 11:40 PM
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-paper)' }}>
            BUZZED
          </h2>
          <div className="handwritten-accent" style={{ color: 'var(--color-green)', marginBottom: 'var(--space-xs)' }}>
            ★ TIME ACCELERATING
          </div>
          <p className="body-sm" style={{ maxWidth: '480px', margin: '0 auto' }}>
            Energy builds. Stimulation multiplies across panels. The meter dips to 60%. Midnight approaches fast.
          </p>
        </div>
      </ResponsiveFrame>
    </section>
  );
};
