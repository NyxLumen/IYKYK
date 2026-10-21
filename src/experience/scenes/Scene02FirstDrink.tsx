import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { Panel } from '../components/Panel';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

export const Scene02FirstDrink: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const drinkPanelRef = useRef<HTMLDivElement>(null);
  const crowdPanelRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: 'first-drink',
    start: 'top 70%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (tl) => {
      if (drinkPanelRef.current) {
        tl.fromTo(
          drinkPanelRef.current,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          0
        );
      }
      if (crowdPanelRef.current) {
        tl.fromTo(
          crowdPanelRef.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          0.1
        );
      }
      if (stickerRef.current) {
        tl.fromTo(
          stickerRef.current,
          { scale: 0.4, rotation: -25, opacity: 0 },
          { scale: 1, rotation: 6, opacity: 1, duration: 0.8, ease: 'back.out(2)' },
          0.3
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id="scene-first-drink"
      data-scene-id="first-drink"
      aria-label="Scene 02: First Drink — 10:15 PM"
      className="scene-section scene-first-drink"
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
        <Clock time="10:15 PM" variant="digital" visible={true} />
        <Meter value={80} mode="story" visible={true} />
      </header>

      <ResponsiveFrame mobile={{ scale: 1.05, x: 0, y: 0 }} desktop={{ scale: 1, x: 0, y: 0 }}>
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
          {/* First Drink Collage Panels */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-xl)',
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Hand Holding Drink Snapshot */}
            <div ref={drinkPanelRef} style={{ width: 'clamp(260px, 34vw, 340px)' }}>
              <Panel
                variant="ink"
                tape={true}
                style={{
                  padding: 'var(--space-lg)',
                  border: '1px solid var(--color-purple)',
                  boxShadow: '0 0 25px var(--color-purple-alpha)',
                  minHeight: '220px',
                }}
              >
                <span className="body-xs" style={{ color: 'var(--color-purple)' }}>
                  ACTION // FIRST GLASS
                </span>
                <div
                  style={{
                    height: '110px',
                    margin: 'var(--space-sm) 0',
                    background: 'rgba(122, 59, 255, 0.1)',
                    border: '1px dashed var(--color-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="body-xs" style={{ color: 'var(--color-paper)' }}>
                    [HAND HOLDING DRINK // PURPLE ACCENT]
                  </span>
                </div>
                <p className="body-sm" style={{ color: 'var(--color-paper-muted)' }}>
                  Social ease. First glass poured.
                </p>
              </Panel>
            </div>

            {/* Social Party Crowd Snapshot */}
            <div ref={crowdPanelRef} style={{ width: 'clamp(260px, 34vw, 340px)' }}>
              <Panel variant="paper" tape={true} torn="top" style={{ padding: 'var(--space-lg)', minHeight: '220px' }}>
                <span className="body-xs" style={{ color: 'var(--color-ink)' }}>
                  ENVIRONMENT // PARTY ENTRANCE
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
                    [FRIENDS GATHERED // TALKING]
                  </span>
                </div>
                <p className="body-sm" style={{ color: 'var(--color-ink)' }}>
                  Laughter starts. The vibe is warm and energetic.
                </p>
              </Panel>
            </div>

            {/* "JUST ONE MORE?" Sticker Overlay */}
            <div
              ref={stickerRef}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '10%',
                zIndex: 20,
              }}
            >
              <div
                className="badge-tape badge-green"
                style={{
                  fontSize: 'var(--text-base)',
                  padding: '0.4rem 1rem',
                  boxShadow: '3px 3px 0 #000',
                }}
              >
                JUST ONE MORE?
              </div>
            </div>
          </div>

          {/* Scene Headlines */}
          <span className="badge-tape badge-purple" style={{ marginBottom: 'var(--space-xs)' }}>
            SCENE 02 // 10:15 PM
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-paper)' }}>
            FIRST DRINK
          </h2>
          <p className="body-sm" style={{ maxWidth: '480px', margin: 'var(--space-xs) auto 0 auto' }}>
            The night begins. One social drink. Meter slips from 100% to 80%. Still completely composed and excited.
          </p>
        </div>
      </ResponsiveFrame>
    </section>
  );
};
