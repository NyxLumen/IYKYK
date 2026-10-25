import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { Panel } from '../components/Panel';
import { ASSET_MANIFEST } from '../data/assets';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

export interface RebuildSceneProps {
  id?: string;
}

/**
 * RebuildScene executes the 8-step reconstruction sequence (storyboard.md Sec 4.4, architecture.md Sec 25).
 * The meter visibly charges from 0% → 100%, reassembling scattered fragments into order.
 *
 * Performance: Uses direct DOM mutation for the meter value instead of React setState
 * to avoid triggering re-renders on every scroll tick (architecture.md Sec 35).
 */
export const RebuildScene: React.FC<RebuildSceneProps> = ({ id = 'rebuild' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const meterWrapperRef = useRef<HTMLDivElement>(null);
  const meterFillRef = useRef<HTMLDivElement>(null);
  const meterLabelRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const protagonistRef = useRef<HTMLDivElement>(null);

  useSceneTimeline(containerRef, {
    sceneId: id,
    pin: true,
    start: 'top top',
    end: '+=2200',
    scrub: 0.5,
    anticipatePin: 1,
    buildTimeline: (tl) => {
      // Phase 0: Brief darkness hold connecting from question exit (0 → 0.08)
      // Intentionally empty — causal pause

      // Phase 1: Meter appears and begins charging 0% → 100% (0.08 → 0.65)
      const meterTracker = { val: 0 };
      tl.to(meterTracker, {
        val: 100,
        duration: 0.57,
        ease: 'power1.inOut',
        onUpdate: () => {
          const rounded = Math.round(meterTracker.val);
          // Direct DOM mutation — no React re-render
          if (meterFillRef.current) {
            meterFillRef.current.style.width = `${rounded}%`;
          }
          if (meterLabelRef.current) {
            meterLabelRef.current.textContent = `${rounded}%`;
          }
        },
      }, 0.08);

      if (meterWrapperRef.current) {
        tl.fromTo(
          meterWrapperRef.current,
          { scale: 0.7, opacity: 0, y: 20 },
          { scale: 1.1, opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
          0.08
        );
      }

      // Phase 2: Collage fragments move & panels reconnect (0.2 → 0.6)
      if (panel1Ref.current) {
        tl.fromTo(
          panel1Ref.current,
          { x: -160, y: 60, rotation: -18, opacity: 0 },
          { x: 0, y: 0, rotation: -2, opacity: 1, duration: 0.3, ease: 'power3.out' },
          0.2
        );
      }
      if (panel2Ref.current) {
        tl.fromTo(
          panel2Ref.current,
          { x: 180, y: -70, rotation: 22, opacity: 0 },
          { x: 0, y: 0, rotation: 1.5, opacity: 1, duration: 0.3, ease: 'power3.out' },
          0.3
        );
      }
      if (panel3Ref.current) {
        tl.fromTo(
          panel3Ref.current,
          { y: 120, rotation: -8, opacity: 0 },
          { y: 0, rotation: 0, opacity: 1, duration: 0.3, ease: 'power3.out' },
          0.4
        );
      }

      // Reconnecting secondary narrative fragments snap into order around protagonist
      if (containerRef.current) {
        const fragments = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.rebuild-fragment'));
        fragments.forEach((frag, idx) => {
          const fromX = (idx % 2 === 0 ? -1 : 1) * (140 + idx * 25);
          const fromY = (idx % 3 === 0 ? -1 : 1) * (90 + idx * 20);
          const rot = (idx % 2 === 0 ? -1 : 1) * (20 + idx * 8);
          tl.fromTo(
            frag,
            { x: fromX, y: fromY, rotation: rot, opacity: 0, scale: 0.7 },
            { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.34, ease: 'power3.out' },
            0.22 + (idx * 0.04)
          );
          tl.to(frag, { opacity: 0.35, y: -15, duration: 0.12, ease: 'power1.in' }, 0.9);
        });
      }

      // Protagonist materializes and reassembles as panels connect (0.25 → 0.75)
      if (protagonistRef.current) {
        tl.fromTo(
          protagonistRef.current,
          { scale: 0.88, opacity: 0, y: 30 },
          { scale: 1, opacity: 0.65, y: 0, duration: 0.4, ease: 'power2.out' },
          0.25
        );
        tl.to(protagonistRef.current, { opacity: 0.82, duration: 0.15, ease: 'power1.out' }, 0.65);
      }

      // Phase 3: Meter reaches 100%, scales to emphasis (0.65 → 0.75)
      if (meterWrapperRef.current) {
        tl.to(meterWrapperRef.current, {
          scale: 1.2,
          duration: 0.1,
          ease: 'back.out(1.7)',
        }, 0.65);
        tl.to(meterWrapperRef.current, {
          scale: 1,
          duration: 0.08,
          ease: 'power1.out',
        }, 0.75);
      }

      // Phase 4: Typography settles into coherent resolution (0.7 → 0.85)
      if (typographyRef.current) {
        tl.fromTo(
          typographyRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.7
        );
      }

      // Phase 5: Scene prepares to flow into reveal (0.88 → 1.0)
      if (panel1Ref.current) {
        tl.to(panel1Ref.current, { opacity: 0.3, y: -15, duration: 0.12, ease: 'power1.in' }, 0.88);
      }
      if (panel2Ref.current) {
        tl.to(panel2Ref.current, { opacity: 0.3, y: -15, duration: 0.12, ease: 'power1.in' }, 0.9);
      }
      if (panel3Ref.current) {
        tl.to(panel3Ref.current, { opacity: 0.3, y: -15, duration: 0.12, ease: 'power1.in' }, 0.92);
      }
      if (typographyRef.current) {
        tl.to(typographyRef.current, { opacity: 0, y: -10, duration: 0.1, ease: 'power1.in' }, 0.92);
      }
      if (protagonistRef.current) {
        tl.to(protagonistRef.current, { scale: 0.96, opacity: 0.4, y: -15, duration: 0.12, ease: 'power1.in' }, 0.9);
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
        backgroundColor: 'transparent',
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
          opacity: 0,
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
        {/* Inline meter — direct DOM for performance */}
        <div
          className="narrative-meter-wrapper"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Narrative control meter — rebuilding"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            background: 'rgba(11, 11, 11, 0.85)',
            padding: '0.4rem 0.8rem',
            border: '1px solid rgba(237, 228, 217, 0.25)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div
            className="meter-bar-track"
            style={{
              width: 'clamp(140px, 24vw, 240px)',
              height: '16px',
              background: 'rgba(237, 228, 217, 0.1)',
              border: '1px solid var(--color-paper-muted)',
              borderRadius: '12px',
              padding: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              ref={meterFillRef}
              className="meter-bar-fill"
              style={{
                height: '100%',
                width: '0%',
                background: 'linear-gradient(90deg, var(--color-purple) 0%, var(--color-green) 100%)',
                borderRadius: '8px',
                boxShadow: '0 0 10px var(--color-green-glow)',
              }}
            />
          </div>
          <div
            ref={meterLabelRef}
            className="meter-bar-label font-display"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-paper)',
              minWidth: '4ch',
              textAlign: 'right',
              letterSpacing: '0.04em',
            }}
          >
            0%
          </div>
        </div>
      </div>

      {/* Plane B & D & E: 10 Reconnecting Secondary Collage Elements */}
      <div className="rebuild-collage-fragments" aria-hidden="true">
        <figure className="art-card rebuild-fragment rebuild-fiber" data-plane="B">
          <img src={assetSrc('textures.paperFiber01')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-scanlines" data-plane="B">
          <img src={assetSrc('textures.scanLines01')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-textbook" data-plane="D">
          <img src={assetSrc('objects.textbook01')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-notebook" data-plane="D">
          <img src={assetSrc('objects.notebook01')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-stationery" data-plane="D">
          <img src={assetSrc('objects.stationery01')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-folded-paper" data-plane="D">
          <img src={assetSrc('objects.foldedPaper01')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-arrow" data-plane="E">
          <img src={assetSrc('graphics.arrowGreen')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-stars" data-plane="E">
          <img src={assetSrc('graphics.starsGreen')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-bracket" data-plane="E">
          <img src={assetSrc('graphics.bracketGreenPurple')} alt="" loading="lazy" />
        </figure>
        <figure className="art-card rebuild-fragment rebuild-tape" data-plane="E">
          <img src={assetSrc('textures.clearTape01')} alt="" loading="lazy" />
        </figure>
      </div>

      {/* Reassembled Protagonist DOM Figure */}
      <div ref={protagonistRef} className="rebuild-protagonist-wrapper" aria-hidden="true">
        <img
          src="/production/source/assetsReady/characters/rebuild/protagonist-reassembled.png"
          alt="Protagonist reassembled"
        />
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
        <div ref={panel1Ref} style={{ flex: '1', maxWidth: '280px', opacity: 0 }}>
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
        <div ref={panel2Ref} style={{ flex: '1', maxWidth: '280px', opacity: 0 }}>
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
        <div ref={panel3Ref} style={{ flex: '1', maxWidth: '280px', opacity: 0 }}>
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
          opacity: 0,
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
