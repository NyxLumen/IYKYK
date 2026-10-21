import React from 'react';
import { SceneConfig } from '../data/types';
import { Composition } from '../components/Composition';
import { Layer } from '../components/Layer';
import { Meter } from '../components/Meter';
import { Clock } from '../components/Clock';
import { CTA } from '../components/CTA';

export interface SceneProps {
  scene: SceneConfig;
  isActive?: boolean;
}

/**
 * Scene component maps declarative scene data to visual presentation (architecture.md Section 07).
 * Decouples narrative state from JSX composition.
 */
export const Scene: React.FC<SceneProps> = ({ scene }) => {
  const isQuestion = scene.id === 'question';
  const isReveal = scene.id === 'reveal';

  return (
    <section
      id={`scene-${scene.id}`}
      data-scene-id={scene.id}
      aria-label={`Scene ${scene.sceneNumber}: ${scene.title}`}
      className={`scene-section scene-${scene.id}`}
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
        borderBottom: '1px solid rgba(237, 228, 217, 0.08)',
        backgroundColor: 'var(--color-ink)',
      }}
    >
      {/* HUD / Floating Overlays (Clock & Meter) */}
      {!isQuestion && (
        <header
          className="scene-narrative-header"
          style={{
            position: 'absolute',
            top: 'var(--space-md)',
            left: 'var(--space-md)',
            right: 'var(--space-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 'var(--z-meter)',
            pointerEvents: 'none',
          }}
        >
          {/* Cameo Clock */}
          {scene.clock?.visible && (
            <Clock
              time={scene.clock.time}
              variant={scene.clock.variant}
              visible={scene.clock.visible}
            />
          )}

          {/* Floaty Meter */}
          {scene.meter?.visible && (
            <Meter
              value={scene.meter.value}
              mode={scene.meter.mode}
              visible={scene.meter.visible}
            />
          )}
        </header>
      )}

      {/* Primary Composition Frame */}
      <Composition
        mode={scene.composition.mode}
        mobile={scene.composition.mobile}
        desktop={scene.composition.desktop}
      >
        {/* Layer stack */}
        <div
          className="scene-layer-stack"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'var(--frame-max-width)',
            minHeight: '65vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {scene.layers.map((layer) => (
            <Layer key={layer.id} layer={layer} />
          ))}

          {/* Typography / Script Overlay */}
          <div
            className="scene-typography-content"
            style={{
              position: 'relative',
              zIndex: 'var(--z-typography)',
              padding: 'var(--space-md)',
              maxWidth: '820px',
            }}
          >
            {isQuestion ? (
              /* Question Graphic Pause (storyboard.md Scene 06.5) */
              <div
                className="question-pause-card torn-edge-top torn-edge-bottom"
                style={{
                  background: 'var(--color-paper)',
                  color: 'var(--color-ink)',
                  padding: 'var(--space-xl) var(--space-lg)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
                }}
              >
                <h2
                  className="headline-hero font-display"
                  style={{
                    color: 'var(--color-ink)',
                    lineHeight: 0.9,
                    letterSpacing: '0.02em',
                  }}
                >
                  {scene.copy?.headline}
                </h2>
              </div>
            ) : isReveal ? (
              /* Final IYKYK Reveal (storyboard.md Scene 08) */
              <div className="reveal-content-container">
                <h1
                  className="headline-monumental font-display"
                  style={{
                    color: 'var(--color-paper)',
                    textShadow: '0 0 40px var(--color-purple-glow)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  {scene.copy?.headline}
                </h1>
                <p
                  className="body-lg"
                  style={{
                    color: 'var(--color-green)',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  {scene.copy?.subhead}
                </p>
                <CTA label={scene.copy?.cta || 'KNOW MORE →'} />
              </div>
            ) : (
              /* Standard Scene Typography */
              <div className="scene-standard-copy">
                <span
                  className="badge-tape badge-purple"
                  style={{ marginBottom: 'var(--space-sm)' }}
                >
                  SCENE {scene.sceneNumber} // {scene.time || scene.title}
                </span>
                <h2
                  className="headline-lg"
                  style={{ color: 'var(--color-paper)', marginBottom: 'var(--space-xs)' }}
                >
                  {scene.copy?.headline}
                </h2>
                {scene.copy?.note && (
                  <div
                    className="handwritten-accent"
                    style={{
                      marginTop: 'var(--space-2xs)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-green)',
                    }}
                  >
                    ★ {scene.copy.note}
                  </div>
                )}
                <p
                  className="body-sm"
                  style={{
                    marginTop: 'var(--space-sm)',
                    maxWidth: '520px',
                    marginInline: 'auto',
                  }}
                >
                  {scene.storyAction}
                </p>
              </div>
            )}
          </div>
        </div>
      </Composition>

      {/* Mood metadata tag for dev / a11y testing */}
      <footer
        className="scene-footer-metadata"
        style={{
          position: 'absolute',
          bottom: 'var(--space-sm)',
          left: 'var(--space-md)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(237, 228, 217, 0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          pointerEvents: 'none',
        }}
      >
        MOOD: {scene.mood}
      </footer>
    </section>
  );
};
