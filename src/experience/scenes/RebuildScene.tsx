import React, { useRef, useState } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Meter } from '../components/Meter';
import { Panel } from '../components/Panel';

export interface RebuildSceneProps {
  id?: string;
}

/**
 * RebuildScene executes the 8-step reconstruction sequence (storyboard.md Sec 4.4, architecture.md Sec 25).
 * The meter visibly charges from 0% → 100%, reassembling scattered fragments into order.
 */
export const RebuildScene: React.FC<RebuildSceneProps> = ({ id = 'rebuild' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const meterWrapperRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);

  const [meterValue, setMeterValue] = useState<number>(0);

  useSceneTimeline(containerRef, {
    sceneId: id,
    pin: true,
    start: 'top top',
    end: '+=1600',
    scrub: 0.5,
    buildTimeline: (tl) => {
      // 1. Meter expands and charges 0% → 100%
      const meterTracker = { val: 0 };
      tl.to(meterTracker, {
        val: 100,
        duration: 3,
        ease: 'none',
        onUpdate: () => {
          setMeterValue(Math.round(meterTracker.val));
        },
      }, 0);

      if (meterWrapperRef.current) {
        tl.fromTo(
          meterWrapperRef.current,
          { scale: 0.8, opacity: 0.5 },
          { scale: 1.15, opacity: 1, duration: 1.5, ease: 'power2.out' },
          0
        );
      }

      // 2. Collage fragments move & 3. Panels reconnect
      if (panel1Ref.current) {
        tl.fromTo(
          panel1Ref.current,
          { x: -160, y: 60, rotation: -18, opacity: 0.2 },
          { x: 0, y: 0, rotation: -2, opacity: 1, duration: 2, ease: 'power3.out' },
          0.4
        );
      }
      if (panel2Ref.current) {
        tl.fromTo(
          panel2Ref.current,
          { x: 180, y: -70, rotation: 22, opacity: 0.2 },
          { x: 0, y: 0, rotation: 1.5, opacity: 1, duration: 2, ease: 'power3.out' },
          0.6
        );
      }
      if (panel3Ref.current) {
        tl.fromTo(
          panel3Ref.current,
          { y: 120, rotation: -8, opacity: 0.2 },
          { y: 0, rotation: 0, opacity: 1, duration: 2, ease: 'power3.out' },
          0.8
        );
      }

      // 4. Typography settles into coherent resolution
      if (typographyRef.current) {
        tl.fromTo(
          typographyRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          2
        );
      }
    },
  });

  return (
    <section
      ref={containerRef}
      id={`scene-${id}`}
      data-scene-id={id}
      aria-label="Scene 08: The Turn — Active Reconstruction"
      className="scene-section scene-rebuild"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-ink)',
        overflow: 'hidden',
        padding: 'var(--space-md)',
      }}
    >
      {/* Background Grid & Scanlines */}
      <div className="texture-scanlines" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} aria-hidden="true" />

      {/* Floating Recharging Meter Banner */}
      <div
        ref={meterWrapperRef}
        style={{
          position: 'relative',
          zIndex: 'var(--z-meter)',
          marginBottom: 'var(--space-xl)',
          transformOrigin: 'center center',
        }}
      >
        <span
          className="badge-tape badge-green"
          style={{
            position: 'absolute',
            top: -14,
            left: 12,
            fontSize: 'var(--text-xs)',
          }}
        >
          RECONSTRUCTION SEQUENCE
        </span>
        <Meter value={meterValue} mode="rebuild" visible={true} />
      </div>

      {/* Reassembling Panels Canvas */}
      <div
        className="rebuild-canvas"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          height: '380px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--space-md)',
        }}
      >
        {/* Panel 1: Restored Agency */}
        <div ref={panel1Ref} style={{ flex: '1', maxWidth: '280px' }}>
          <Panel variant="paper" tape={true} torn="top" style={{ padding: 'var(--space-lg)' }}>
            <span className="body-xs" style={{ color: 'var(--color-purple)' }}>STATE: RESTORING</span>
            <h3 className="headline-sm" style={{ marginTop: 'var(--space-xs)' }}>
              AGENCY REGAINED
            </h3>
            <p className="body-sm" style={{ color: 'var(--color-ink)', marginTop: 'var(--space-xs)' }}>
              Scattered pieces realign. The morning is not lost.
            </p>
          </Panel>
        </div>

        {/* Panel 2: Clarity & Order */}
        <div ref={panel2Ref} style={{ flex: '1', maxWidth: '280px' }}>
          <Panel variant="ink" tape={true} style={{ padding: 'var(--space-lg)', border: '1px solid var(--color-green)' }}>
            <span className="body-xs" style={{ color: 'var(--color-green)' }}>CLOCK: RESOLVED</span>
            <h3 className="headline-sm" style={{ marginTop: 'var(--space-xs)', color: 'var(--color-paper)' }}>
              TOMORROW IS YOURS
            </h3>
            <p className="body-sm" style={{ color: 'var(--color-paper-muted)', marginTop: 'var(--space-xs)' }}>
              Alarm disarmed. Clarity restored.
            </p>
          </Panel>
        </div>

        {/* Panel 3: Coherence */}
        <div ref={panel3Ref} style={{ flex: '1', maxWidth: '280px' }}>
          <Panel variant="paper" tape={true} torn="bottom" style={{ padding: 'var(--space-lg)' }}>
            <span className="body-xs" style={{ color: 'var(--color-purple)' }}>SYSTEM: 100%</span>
            <h3 className="headline-sm" style={{ marginTop: 'var(--space-xs)' }}>
              CLEAN HORIZON
            </h3>
            <p className="body-sm" style={{ color: 'var(--color-ink)', marginTop: 'var(--space-xs)' }}>
              A new possibility takes shape.
            </p>
          </Panel>
        </div>
      </div>

      {/* Rebuild Typography Settle */}
      <div
        ref={typographyRef}
        style={{
          marginTop: 'var(--space-lg)',
          textAlign: 'center',
          zIndex: 'var(--z-typography)',
        }}
      >
        <div
          className="handwritten-accent"
          style={{ fontSize: 'var(--text-xl)', color: 'var(--color-green)' }}
        >
          ★ SAME STYLE. SAME WORLD. REBUILT.
        </div>
      </div>
    </section>
  );
};
