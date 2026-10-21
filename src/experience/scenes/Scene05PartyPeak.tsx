import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { Panel } from '../components/Panel';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

export const Scene05PartyPeak: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: 'party-peak',
    start: 'top 70%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      if (chaosRef.current) {
        tl.fromTo(
          chaosRef.current,
          { scale: 0.9, y: 50 },
          { scale: 1.1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id="scene-party-peak"
      data-scene-id="party-peak"
      aria-label="Scene 05: Party Peak — 3:17 AM"
      className="scene-section scene-party-peak"
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
      {/* Narrative HUD (Clock & Meter) - Peak Warning */}
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
        <div style={{ transform: 'rotate(-5deg)' }}>
          <Clock time="3:17 AM" variant="oversized" visible={true} />
        </div>
        <div style={{ transform: 'rotate(4deg)' }}>
          <Meter value={20} mode="story" visible={true} />
        </div>
      </header>

      {/* Halftone dense noise background */}
      <div className="texture-halftone-dense" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} aria-hidden="true" />

      <ResponsiveFrame mobile={{ scale: 1.35, x: 10, y: -5 }} desktop={{ scale: 1.1, x: 0, y: 0 }}>
        <div
          ref={chaosRef}
          style={{
            maxWidth: '1020px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 'var(--z-character)',
          }}
        >
          {/* Maximum Collage Density Cluster */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '320px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 'var(--space-xl)',
            }}
          >
            {/* Center Dancing Snapshot */}
            <div
              style={{
                width: 'clamp(280px, 38vw, 400px)',
                zIndex: 20,
                transform: 'rotate(-2deg)',
              }}
            >
              <Panel
                variant="paper"
                tape={true}
                torn="both"
                style={{
                  padding: 'var(--space-lg)',
                  boxShadow: '0 0 50px rgba(57, 239, 136, 0.3)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="badge-tape badge-green">3:17 AM</span>
                  <span className="badge-tape badge-purple">PEAK CHAOS</span>
                </div>
                <div
                  style={{
                    height: '140px',
                    margin: 'var(--space-sm) 0',
                    background: 'rgba(11, 11, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--color-ink)',
                  }}
                >
                  <span className="headline-sm" style={{ color: 'var(--color-ink)' }}>
                    [DANCING EUPHORIA SILHOUETTE]
                  </span>
                </div>
                <p className="body-sm" style={{ color: 'var(--color-ink)', fontWeight: 600 }}>
                  Completely in the moment. Arms up. Noise at maximum.
                </p>
              </Panel>
            </div>

            {/* Graphic mark: Acid Green Smiley */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: '12%',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-green)',
                color: 'var(--color-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '32px',
                transform: 'rotate(15deg)',
                boxShadow: '0 0 20px var(--color-green-glow)',
                zIndex: 35,
              }}
            >
              ☻
            </div>

            {/* Graphic mark: Crown Doodle */}
            <div
              className="handwritten-accent"
              style={{
                position: 'absolute',
                bottom: 20,
                left: '10%',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-purple)',
                zIndex: 35,
                transform: 'rotate(-20deg)',
              }}
            >
              👑 NO RULES
            </div>
          </div>

          {/* Scene Headlines */}
          <span className="badge-tape badge-green" style={{ marginBottom: 'var(--space-xs)' }}>
            SCENE 05 // 3:17 AM // 20%
          </span>
          <h2 className="headline-hero" style={{ color: 'var(--color-paper)' }}>
            PARTY PEAK
          </h2>
          <p className="body-sm" style={{ maxWidth: '520px', margin: 'var(--space-xs) auto 0 auto' }}>
            The character feels invincible. The night feels infinite. But the clock says 3:17 AM and the meter is down to 20%.
          </p>
        </div>
      </ResponsiveFrame>
    </section>
  );
};
