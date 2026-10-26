import React, { useState, useEffect } from 'react';
import { Meter } from './Meter';
import { Clock } from './Clock';
import { AnalogClockSvg } from './AnalogClockSvg';
import { BatterySvg } from './BatterySvg';

export const ComponentVerificationView: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'battery' | 'clocks' | 'closeup' | 'scrollbar'>('all');
  const rebuildProgress = 54;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('verify') || params.get('view');
    if (view === 'battery' || view === 'clocks' || view === 'closeup' || view === 'scrollbar') {
      setTab(view);
    }
  }, []);

  return (
    <div
      className="verification-container"
      style={{
        backgroundColor: '#0B0B0B',
        color: '#EDE4D9',
        minHeight: '100vh',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        fontFamily: "var(--font-body, 'Space Grotesk', sans-serif)",
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(237, 228, 217, 0.2)', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span className="badge-tape badge-green" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
              TASK 05A SPRAY-CAN UPDATE
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                margin: 0,
                letterSpacing: '0.04em',
              }}
            >
              SPRAY-CAN STREET ART BATTERY & ANALOG CLOCK
            </h1>
            <p style={{ margin: '0.5rem 0 0', color: 'rgba(237, 228, 217, 0.7)', fontSize: '0.95rem' }}>
              Zero enclosing background box: battery and handwritten spray percentage float freely with authentic aerosol mist and spatter.
            </p>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['all', 'battery', 'clocks', 'closeup', 'scrollbar'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? '#7A3BFF' : 'rgba(237, 228, 217, 0.1)',
                  color: '#EDE4D9',
                  border: tab === t ? '1px solid #39EF88' : '1px solid rgba(237, 228, 217, 0.2)',
                  padding: '0.45rem 0.9rem',
                  fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)",
                  fontSize: '1.1rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* SECTION 1: BATTERY METER STATES */}
      {(tab === 'all' || tab === 'battery') && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)",
                fontSize: '1.8rem',
                margin: 0,
                color: '#39EF88',
              }}
            >
              1. BATTERY METER CANONICAL STATES & INTERPOLATED REBUILD
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* 100% */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 01 // 100% (5 CELLS VISIBLE)
              </span>
              <Meter value={100} mode="story" />
            </div>

            {/* 80% */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 02 // 80% (4 CELLS VISIBLE)
              </span>
              <Meter value={80} mode="story" />
            </div>

            {/* 60% */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 03 // 60% (3 CELLS VISIBLE)
              </span>
              <Meter value={60} mode="story" />
            </div>

            {/* 40% */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 04 // 40% (2 CELLS VISIBLE)
              </span>
              <Meter value={40} mode="story" />
            </div>

            {/* 20% */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 05 // 20% (1 CELL VISIBLE)
              </span>
              <Meter value={20} mode="story" />
            </div>

            {/* 0% */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 06 // 0% (DEPLETED CAVITY RETAINED)
              </span>
              <Meter value={0} mode="story" />
            </div>

            {/* Rebuild intermediate 54% */}
            <div style={{ background: '#141414', border: '1px solid #39EF88', padding: '1.25rem', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.85rem', color: '#39EF88', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                SCENE 07 // REBUILD INTERMEDIATE (54% PARTIAL FILL)
              </span>
              <Meter value={rebuildProgress} mode="rebuild" />
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: ANALOG CLOCK TIMESTAMPS */}
      {(tab === 'all' || tab === 'clocks') && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)",
                fontSize: '1.8rem',
                margin: 0,
                color: '#39EF88',
              }}
            >
              2. REUSABLE ANALOG CLOCK (NARRATIVE ACCURACY ACROSS ALL TIMESTAMPS)
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* 9:30 PM */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', textAlign: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#EDE4D9', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                9:30 PM (EARLY NIGHT)
              </span>
              <Clock variant="analog" time="9:30 PM" size={96} />
              <div style={{ fontSize: '0.8rem', color: '#39EF88', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                H: 285.0° // M: 180°
              </div>
            </div>

            {/* 10:15 PM */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', textAlign: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#EDE4D9', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                10:15 PM (FIRST DRINK)
              </span>
              <Clock variant="analog" time="10:15 PM" size={96} />
              <div style={{ fontSize: '0.8rem', color: '#39EF88', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                H: 307.5° // M: 90°
              </div>
            </div>

            {/* 11:40 PM */}
            <div style={{ background: '#141414', border: '1px solid #7A3BFF', padding: '1.25rem', textAlign: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                11:40 PM (BUZZED SCENE)
              </span>
              <Clock variant="analog" time="11:40 PM" size={96} />
              <div style={{ fontSize: '0.8rem', color: '#39EF88', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                H: 350.0° // M: 240°
              </div>
            </div>

            {/* 1:20 AM */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.15)', padding: '1.25rem', textAlign: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#EDE4D9', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                1:20 AM (DRUNK)
              </span>
              <Clock variant="analog" time="1:20 AM" size={96} />
              <div style={{ fontSize: '0.8rem', color: '#39EF88', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                H: 40.0° // M: 120°
              </div>
            </div>

            {/* 3:17 AM */}
            <div style={{ background: '#141414', border: '1px solid #7A3BFF', padding: '1.25rem', textAlign: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                3:17 AM (PARTY PEAK)
              </span>
              <Clock variant="analog" time="3:17 AM" size={96} />
              <div style={{ fontSize: '0.8rem', color: '#39EF88', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                H: 98.5° // M: 102°
              </div>
            </div>

            {/* 7:58 AM */}
            <div style={{ background: '#141414', border: '1px solid #7A3BFF', padding: '1.25rem', textAlign: 'center', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.9rem', color: '#7A3BFF', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>
                7:58 AM (MORNING ALARM)
              </span>
              <Clock variant="analog" time="7:58 AM" size={96} />
              <div style={{ fontSize: '0.8rem', color: '#39EF88', marginTop: '0.75rem', fontFamily: 'monospace' }}>
                H: 239.0° // M: 348°
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: CLOSE-UP CRAFT & LEGIBILITY PROOF */}
      {(tab === 'all' || tab === 'closeup') && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)",
              fontSize: '1.8rem',
              margin: '0 0 1.5rem',
              color: '#39EF88',
            }}
          >
            3. CLOSE-UP HIGH-RESOLUTION CRAFT & PRINT-TEXTURE LEGIBILITY
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Battery Macro */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.25)', padding: '2rem', borderRadius: '6px' }}>
              <span className="badge-tape badge-purple" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                BATTERY MACRO DETAIL (60% CHARGE)
              </span>
              <div style={{ maxWidth: '340px', margin: '0 auto', padding: '1rem 0' }}>
                <BatterySvg value={60} style={{ width: '100%', height: 'auto' }} />
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'rgba(237, 228, 217, 0.85)', marginTop: '1rem', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                <li><strong>Unified Die-Cut Sticker:</strong> Continuous Warm-Paper (#EDE4D9) outer contour encasing casing + terminal.</li>
                <li><strong>Ink-Black Body (#0B0B0B):</strong> Screen-printed casing with protruding positive terminal.</li>
                <li><strong>Recessed Track (#180D2B):</strong> Deep cavity with 5 discrete rectangular cell beds.</li>
                <li><strong>Active Fill (#7A3BFF):</strong> Electric Purple charge cleanly visible across active cells.</li>
                <li><strong>Acid-Green Details (#39EF88):</strong> Technical '+' terminal polarity & alignment crosshair.</li>
              </ul>
            </div>

            {/* Clock Macro */}
            <div style={{ background: '#141414', border: '1px solid rgba(237, 228, 217, 0.25)', padding: '2rem', borderRadius: '6px' }}>
              <span className="badge-tape badge-purple" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                ANALOG CLOCK MACRO DETAIL (3:17 AM PEAK)
              </span>
              <div style={{ width: '220px', height: '220px', margin: '0 auto', padding: '0.5rem 0' }}>
                <AnalogClockSvg time="3:17 AM" size="100%" />
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'rgba(237, 228, 217, 0.85)', marginTop: '1rem', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                <li><strong>Face & Sticker Bezel:</strong> Warm Paper (#EDE4D9) face with Ink Black (#0B0B0B) bezel & thick die-cut border.</li>
                <li><strong>Tick Marks & Numerals:</strong> 60 minute ticks, 12 bold hour ticks, condensed 12/3/6/9 numerals.</li>
                <li><strong>Hands:</strong> Electric Purple (#7A3BFF) primary hand, Ink Black (#0B0B0B) hour hand.</li>
                <li><strong>Acid Green (#39EF88):</strong> Center registration pin & 12 o'clock crosshair mark.</li>
                <li><strong>Editorial Zine Labels:</strong> Crisp IYKYK / COLLAGE LAB typographic details.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: CUSTOM PURPLE SCROLLBAR VERIFICATION */}
      {(tab === 'all' || tab === 'scrollbar') && (
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)",
                fontSize: '1.8rem',
                margin: 0,
                color: '#39EF88',
              }}
            >
              CUSTOM PURPLE SCROLLBAR SYSTEM
            </h2>
            <span className="badge-tape badge-purple">GLOBAL CSS & OVERLAY REPLACEMENT</span>
          </div>

          <p style={{ color: 'rgba(237, 228, 217, 0.75)', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Replaces the default gray browser scrollbars with a custom, thin (6px), elongated (96px min thumb),
            electric-purple (<code style={{ color: '#7A3BFF', background: 'rgba(122,59,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>var(--color-purple) = #7A3BFF</code>) scrollbar across all views and containers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Scrollable Container 1: Narrative Log */}
            <div
              style={{
                background: '#141414',
                border: '1px solid rgba(237, 228, 217, 0.25)',
                borderRadius: '6px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge-tape badge-purple">VERTICAL SCROLLER TEST</span>
                <span style={{ fontSize: '0.8rem', color: '#7A3BFF' }}>WIDTH: 6PX | MIN-HEIGHT: 96PX</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(237, 228, 217, 0.7)', marginBottom: '1rem' }}>
                Scroll the container below to test the thin purple scrollbar, track padding, and hover/active states:
              </p>
              <div
                style={{
                  height: '240px',
                  overflowY: 'auto',
                  background: '#0B0B0B',
                  border: '1px solid rgba(122, 59, 255, 0.3)',
                  borderRadius: '4px',
                  padding: '1rem',
                }}
              >
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.65rem 0.85rem',
                      marginBottom: '0.5rem',
                      background: i % 2 === 0 ? 'rgba(237, 228, 217, 0.04)' : 'rgba(122, 59, 255, 0.08)',
                      borderLeft: `3px solid ${i % 2 === 0 ? '#39EF88' : '#7A3BFF'}`,
                      borderRadius: '2px',
                      fontSize: '0.85rem',
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-display, 'Bebas Neue', Anton, sans-serif)", fontSize: '1rem', color: '#EDE4D9' }}>
                      SCENE ITEM {String(i + 1).padStart(2, '0')} — CHAPTER {i + 1}
                    </div>
                    <div style={{ color: 'rgba(237, 228, 217, 0.65)', fontSize: '0.78rem' }}>
                      Collage timeline slice verification. Scroll thumb retains elongated minimum height and vibrant #7A3BFF tone.
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable Container 2: Design Tokens & Specifications */}
            <div
              style={{
                background: '#141414',
                border: '1px solid rgba(237, 228, 217, 0.25)',
                borderRadius: '6px',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge-tape badge-green">SPECIFICATIONS & TOKENS</span>
                <span style={{ fontSize: '0.8rem', color: '#39EF88' }}>CANONICAL #7A3BFF</span>
              </div>
              <ul style={{ fontSize: '0.85rem', color: 'rgba(237, 228, 217, 0.85)', lineHeight: 1.8, paddingLeft: '1.2rem', margin: 0 }}>
                <li><strong>Profile Width:</strong> <code style={{ color: '#7A3BFF' }}>6px Desktop / 3px Mobile</code> (Thinner hairline profile on screens &le; 768px)</li>
                <li><strong>Thumb Length:</strong> <code style={{ color: '#7A3BFF' }}>96px min (Desktop) / 60px min (Mobile)</code></li>
                <li><strong>Thumb Color:</strong> <code style={{ color: '#7A3BFF' }}>#7A3BFF</code> (<code style={{ color: '#39EF88' }}>var(--color-purple)</code> from <code style={{ color: '#EDE4D9' }}>tokens.css</code>)</li>
                <li><strong>Hover State:</strong> <code style={{ color: '#9258ff' }}>#9258FF</code> with <code style={{ color: '#7A3BFF' }}>rgba(122, 59, 255, 0.5)</code> neon glow</li>
                <li><strong>Active / Drag:</strong> <code style={{ color: '#a978ff' }}>#A978FF</code> with increased glow</li>
                <li><strong>Track:</strong> <code style={{ color: '#EDE4D9' }}>transparent</code> (zero enclosing background container, only the pill is visible)</li>
                <li><strong>Placement:</strong> Flush against right viewport edge (<code style={{ color: '#39EF88' }}>right: 0</code>)</li>
                <li><strong>Cross-Browser:</strong> W3C standard + WebKit / Blink engine pseudo-elements</li>
              </ul>

              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#0B0B0B', borderRadius: '4px', border: '1px solid rgba(237, 228, 217, 0.15)' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(237, 228, 217, 0.6)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  PURPLE PALETTE VERIFICATION
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', background: '#7A3BFF', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#EDE4D9' }}>--color-purple: #7A3BFF</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(237, 228, 217, 0.6)' }}>Canonical purple defined in tokens.css line 10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
