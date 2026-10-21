import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { Panel } from '../components/Panel';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

export const Scene01Plan: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const deskPanelRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: 'plan',
    start: 'top 70%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      if (deskPanelRef.current) {
        tl.fromTo(
          deskPanelRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          0
        );
      }
      if (characterRef.current) {
        tl.fromTo(
          characterRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
          0.2
        );
      }
      if (noteRef.current) {
        tl.fromTo(
          noteRef.current,
          { rotation: -8, y: 20, opacity: 0 },
          { rotation: -2, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
          0.4
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id="scene-plan"
      data-scene-id="plan"
      aria-label="Scene 01: The Plan — 9:30 PM"
      className="scene-section scene-plan"
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
        <Clock time="9:30 PM" variant="digital" visible={true} />
        <Meter value={100} mode="story" visible={true} />
      </header>

      {/* Responsive Composition Frame */}
      <ResponsiveFrame mobile={{ scale: 1, x: 0, y: 0 }} desktop={{ scale: 1, x: 0, y: 0 }}>
        <div
          style={{
            maxWidth: '920px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 'var(--z-character)',
          }}
        >
          {/* Calm collage arrangement */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-xl)',
              width: '100%',
            }}
          >
            {/* Bedroom / Desk Plate Placeholder */}
            <div ref={deskPanelRef} style={{ width: 'clamp(260px, 36vw, 360px)' }}>
              <Panel variant="ink" tape={true} style={{ padding: 'var(--space-lg)', textAlign: 'left', minHeight: '220px' }}>
                <span className="body-xs" style={{ color: 'var(--color-paper-muted)' }}>
                  ENVIRONMENT // BEDROOM
                </span>
                <div
                  style={{
                    height: '110px',
                    margin: 'var(--space-sm) 0',
                    background: 'rgba(237, 228, 217, 0.05)',
                    border: '1px dashed rgba(237, 228, 217, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-paper-muted)' }}>
                    [STUDY DESK // BOOKS // LAPTOP]
                  </span>
                </div>
                <p className="body-sm" style={{ color: 'var(--color-paper-muted)' }}>
                  Orderly bedroom. Academic routine intact.
                </p>
              </Panel>
            </div>

            {/* Protagonist Silhouette Placeholder */}
            <div ref={characterRef} style={{ width: 'clamp(240px, 32vw, 320px)' }}>
              <Panel variant="paper" tape={true} torn="top" style={{ padding: 'var(--space-lg)', minHeight: '220px' }}>
                <span className="body-xs" style={{ color: 'var(--color-purple)' }}>
                  CHARACTER // SOBER
                </span>
                <div
                  style={{
                    height: '110px',
                    margin: 'var(--space-sm) 0',
                    background: 'rgba(11, 11, 11, 0.08)',
                    border: '1px dashed rgba(11, 11, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-ink)' }}>
                    [PROTAGONIST PREPARING SILHOUETTE]
                  </span>
                </div>
                <p className="body-sm" style={{ color: 'var(--color-ink)' }}>
                  Fresh, composed, confident about tomorrow.
                </p>
              </Panel>
            </div>

            {/* Sticky Timetable Reminder */}
            <div ref={noteRef} style={{ width: 'clamp(180px, 22vw, 220px)' }}>
              <Panel variant="paper" tape={true} torn="bottom" style={{ padding: 'var(--space-md)', background: '#f5edd6' }}>
                <div className="handwritten-note">
                  ★ COLLEGE TOMORROW<br />
                  8:30 AM LAB<br />
                  100% INTACT
                </div>
              </Panel>
            </div>
          </div>

          {/* Scene Headlines */}
          <span className="badge-tape badge-purple" style={{ marginBottom: 'var(--space-xs)' }}>
            SCENE 01 // 9:30 PM
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-paper)' }}>
            THE PLAN
          </h2>
          <p className="body-sm" style={{ maxWidth: '480px', margin: 'var(--space-xs) auto 0 auto' }}>
            Getting ready. Tomorrow is completely in place. Everything feels controlled, calm, and expectant.
          </p>
        </div>
      </ResponsiveFrame>
    </section>
  );
};
