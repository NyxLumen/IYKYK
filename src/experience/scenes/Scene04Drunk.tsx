import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { Panel } from '../components/Panel';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

export const Scene04Drunk: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const chaoticClusterRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: 'drunk',
    start: 'top 70%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      if (chaoticClusterRef.current) {
        tl.fromTo(
          chaoticClusterRef.current,
          { rotation: 8, scale: 0.9, opacity: 0 },
          { rotation: -3, scale: 1.05, opacity: 1, duration: 1.2, ease: 'power2.out' },
          0
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id="scene-drunk"
      data-scene-id="drunk"
      aria-label="Scene 04: Drunk — 1:20 AM"
      className="scene-section scene-drunk"
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
      {/* Narrative HUD (Clock & Meter) - Strained & Intruding */}
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
        <div style={{ transform: 'rotate(-4deg)' }}>
          <Clock time="1:20 AM" variant="oversized" visible={true} />
        </div>
        <div style={{ opacity: 0.8, transform: 'rotate(2deg)' }}>
          <Meter value={40} mode="story" visible={true} />
        </div>
      </header>

      {/* Scanline + Noise overlay */}
      <div className="texture-scanlines" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} aria-hidden="true" />

      <ResponsiveFrame mobile={{ scale: 1.25, x: -10, y: 5 }} desktop={{ scale: 1.05, x: 0, y: 0 }}>
        <div
          ref={chaoticClusterRef}
          style={{
            maxWidth: '980px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 'var(--z-character)',
          }}
        >
          {/* Tilted, Torn Paper Overlaps */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 'var(--space-lg)',
            }}
          >
            {/* Tilted Torn Card 1 */}
            <div
              style={{
                position: 'absolute',
                left: '10%',
                top: 0,
                width: 'clamp(220px, 32vw, 320px)',
                zIndex: 10,
                transform: 'rotate(-9deg)',
              }}
            >
              <Panel variant="paper" tape={true} torn="top" style={{ padding: 'var(--space-md)' }}>
                <span className="body-xs" style={{ color: 'var(--color-purple)' }}>SKEWED REALITY</span>
                <div
                  style={{
                    height: '100px',
                    margin: 'var(--space-xs) 0',
                    background: 'rgba(122, 59, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-ink)' }}>[OVERSIZED BOTTLE CUTOUT]</span>
                </div>
              </Panel>
            </div>

            {/* Distorted Center Card */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(260px, 36vw, 360px)',
                zIndex: 25,
                transform: 'rotate(5deg)',
              }}
            >
              <Panel
                variant="ink"
                tape={true}
                style={{
                  padding: 'var(--space-lg)',
                  border: '2px solid var(--color-purple)',
                  boxShadow: '0 0 35px var(--color-purple-glow)',
                }}
              >
                <span className="body-xs" style={{ color: 'var(--color-purple)' }}>STATE // 40% CONTROL</span>
                <div
                  style={{
                    height: '120px',
                    margin: 'var(--space-sm) 0',
                    background: 'rgba(11, 11, 11, 0.6)',
                    border: '1px dashed var(--color-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-paper)' }}>
                    [PROTAGONIST DISORIENTED / CROPPED]
                  </span>
                </div>
                <p className="body-xs" style={{ color: 'var(--color-paper-muted)' }}>
                  Perception skews. Room borders blur.
                </p>
              </Panel>
            </div>
          </div>

          {/* Typography Crossing Panels */}
          <div
            style={{
              background: 'var(--color-ink)',
              padding: 'var(--space-xs) var(--space-md)',
              border: '1px solid var(--color-paper-faint)',
              transform: 'rotate(-2deg)',
            }}
          >
            <span className="badge-tape badge-purple" style={{ marginRight: 'var(--space-xs)' }}>
              SCENE 04 // 1:20 AM
            </span>
            <h2 className="headline-lg" style={{ display: 'inline', color: 'var(--color-paper)' }}>
              DRUNK
            </h2>
          </div>

          <p className="body-sm" style={{ maxWidth: '480px', margin: 'var(--space-sm) auto 0 auto' }}>
            Things get messy. The world gets louder and visually unstable. Meter falls to 40%.
          </p>
        </div>
      </ResponsiveFrame>
    </section>
  );
};
