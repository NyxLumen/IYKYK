import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { Panel } from '../components/Panel';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

export const Scene06PassedOut: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stillCardRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: 'passed-out',
    start: 'top 70%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      if (stillCardRef.current) {
        tl.fromTo(
          stillCardRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id="scene-passed-out"
      data-scene-id="passed-out"
      aria-label="Scene 06: Passed Out — 7:58 AM"
      className="scene-section scene-passed-out"
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
      {/* Narrative HUD (Clock & Meter) - Completely Drained */}
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
        <div style={{ transform: 'rotate(-2deg)' }}>
          <Clock time="7:58 AM" variant="digital" visible={true} />
        </div>
        <Meter value={0} mode="story" visible={true} />
      </header>

      {/* Cold Morning Scanlines */}
      <div className="texture-scanlines" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} aria-hidden="true" />

      <ResponsiveFrame mobile={{ scale: 1, x: 0, y: 0 }} desktop={{ scale: 1, x: 0, y: 0 }}>
        <div
          ref={stillCardRef}
          style={{
            maxWidth: '840px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 'var(--z-character)',
          }}
        >
          {/* Stillness & Collapse Card */}
          <div style={{ width: 'clamp(280px, 42vw, 440px)', marginBottom: 'var(--space-xl)' }}>
            <Panel variant="ink" tape={true} style={{ padding: 'var(--space-xl)', border: '1px solid rgba(237, 228, 217, 0.2)' }}>
              <span className="body-xs" style={{ color: 'var(--color-purple)' }}>
                AFTERMATH // 0% METER
              </span>
              <div
                style={{
                  height: '140px',
                  margin: 'var(--space-md) 0',
                  background: 'rgba(237, 228, 217, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed rgba(237, 228, 217, 0.25)',
                }}
              >
                <span className="body-xs" style={{ color: 'var(--color-paper-muted)' }}>
                  [PROTAGONIST MOTIONLESS ON BED // UNMADE SHEETS]
                </span>
              </div>
              <p className="body-sm" style={{ color: 'var(--color-paper-muted)' }}>
                Dead silence. Energy spent. Alarm blaring.
              </p>
            </Panel>
          </div>

          {/* Scene Headlines */}
          <span className="badge-tape badge-purple" style={{ marginBottom: 'var(--space-xs)' }}>
            SCENE 06 // 7:58 AM // 0%
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-paper)' }}>
            PASSED OUT
          </h2>
          <div className="handwritten-accent" style={{ color: '#ff5c5c', margin: 'var(--space-2xs) 0' }}>
            ★ COLLEGE TOMORROW IS LOST
          </div>
          <p className="body-sm" style={{ maxWidth: '480px', margin: '0 auto' }}>
            The night ends abruptly. The party illusion shatters into the harsh realism of 7:58 AM.
          </p>
        </div>
      </ResponsiveFrame>
    </section>
  );
};
