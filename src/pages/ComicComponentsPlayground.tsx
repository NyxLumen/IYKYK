import React, { useState } from 'react';
import {
  ComicAction,
  ComicActionSize,
  ComicActionVariant,
  COMIC_ACTION_VARIANTS,
} from '@/components/comic/ComicAction';
import {
  ComicBubble,
  ComicBubbleSize,
  ComicBubbleTail,
} from '@/components/comic/ComicBubble';
import './ComicComponentsPlayground.css';

export const ComicComponentsPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'action' | 'bubble' | 'studio'>('all');
  const [simulatedWidth, setSimulatedWidth] = useState<string>('100%');

  // Live Studio state for ComicAction
  const [actionText, setActionText] = useState('PLAY DUMB !');
  const [actionSize, setActionSize] = useState<ComicActionSize>('large');
  const [actionVariant, setActionVariant] = useState<ComicActionVariant>('yellow');
  const [actionBg, setActionBg] = useState('#FFD629');
  const [actionTextColor, setActionTextColor] = useState('#0B0B0B');
  const [actionBorderColor, setActionBorderColor] = useState('#0B0B0B');
  const [actionShadowColor, setActionShadowColor] = useState('#0B0B0B');
  const [actionPatternColor, setActionPatternColor] = useState('#D5A817');
  const [actionRotation, setActionRotation] = useState(-1);

  // Live Studio state for ComicBubble
  const [bubbleText, setBubbleText] = useState('See you at\nthe party!');
  const [bubbleSize, setBubbleSize] = useState<ComicBubbleSize>('medium');
  const [bubbleTail, setBubbleTail] = useState<ComicBubbleTail>('bottom-left');
  const [bubbleBg, setBubbleBg] = useState('#F1E8D9');
  const [bubbleTextColor, setBubbleTextColor] = useState('#0B0B0B');
  const [bubbleBorderColor, setBubbleBorderColor] = useState('#0B0B0B');
  const [bubbleDotColor, setBubbleDotColor] = useState('#C6BEB0');

  return (
    <div className="comic-playground">
      {/* Header */}
      <header className="comic-playground__header">
        <span className="comic-playground__badge">DEVELOPER PREVIEW</span>
        <h1 className="comic-playground__title">COMIC-BOOK COMPONENTS PLAYGROUND</h1>
        <p className="comic-playground__subtitle">
          Dedicated interactive testbench for the <code>ComicAction</code> and{' '}
          <code>ComicBubble</code> reusable React components. Test size presets, fluid text wrapping,
          custom color palettes, and responsive viewports.
        </p>

        {/* Navigation Tabs */}
        <nav className="comic-playground__nav" aria-label="Component sections">
          {(
            [
              ['all', 'ALL COMPONENTS'],
              ['action', 'COMIC ACTION'],
              ['bubble', 'COMIC BUBBLE'],
              ['studio', 'LIVE CUSTOMIZER STUDIO'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              className={`comic-playground__tab-btn ${
                activeTab === key ? 'comic-playground__tab-btn--active' : ''
              }`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Viewport Width Simulator */}
      <div className="comic-playground__viewport-bar">
        <span className="comic-playground__viewport-label">Simulate Viewport:</span>
        {[
          { label: 'Full (100%)', width: '100%' },
          { label: '1440px Desktop', width: '1440px' },
          { label: '768px Tablet', width: '768px' },
          { label: '375px Mobile', width: '375px' },
          { label: '320px Mobile Min', width: '320px' },
        ].map((vp) => (
          <button
            key={vp.width}
            className={`comic-playground__vp-btn ${
              simulatedWidth === vp.width ? 'comic-playground__vp-btn--active' : ''
            }`}
            onClick={() => setSimulatedWidth(vp.width)}
          >
            {vp.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: simulatedWidth, margin: '0 auto', transition: 'max-width 0.2s ease' }}>
        {/* ================================================================== */}
        {/* SECTION 1: COMIC ACTION PREVIEW                                    */}
        {/* ================================================================== */}
        {(activeTab === 'all' || activeTab === 'action') && (
          <section className="comic-playground__section" id="comic-action-section">
            <div className="comic-playground__section-header">
              <h2 className="comic-playground__section-title">1. COMICACTION COMPONENT</h2>
              <span className="comic-playground__section-desc">
                Bold offset shadow, halftone Ben-Day pattern, and hand-inked typography
              </span>
            </div>

            {/* Sizes Showcase */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Size Presets: Large, Medium, Small
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid">
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">size="large" (Reference Match)</span>
                  <ComicAction size="large" rotation={-1}>
                    PLAY DUMB !
                  </ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">size="medium" (Default)</span>
                  <ComicAction size="medium" rotation={0}>
                    PLAY DUMB !
                  </ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">size="small"</span>
                  <ComicAction size="small" rotation={1}>
                    PLAY DUMB !
                  </ComicAction>
                </div>
              </div>
            </div>

            {/* Text Lengths Showcase */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Required Content Length Variations
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid">
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Reference Text: PLAY DUMB!</span>
                  <ComicAction size="medium">PLAY DUMB!</ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Medium Text: JUST ONE MORE?</span>
                  <ComicAction size="medium">JUST ONE MORE?</ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Longer Text: DON'T MISS TOMORROW</span>
                  <ComicAction size="medium">DON'T MISS TOMORROW</ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Multi-Line Wrapped Text</span>
                  <ComicAction size="medium" style={{ maxWidth: '340px' }}>
                    ENTER AT YOUR OWN RISK TONIGHT
                  </ComicAction>
                </div>
              </div>
            </div>

            {/* Color Palettes Showcase */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Configurable Color Palettes (Named Variants & Custom Overrides)
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid">
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Yellow Variant (Default)</span>
                  <ComicAction variant="yellow" size="medium">
                    PLAY DUMB!
                  </ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Purple Variant (Project Electric)</span>
                  <ComicAction variant="purple" size="medium">
                    MIDNIGHT RAVE
                  </ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Green Variant (Project Accent)</span>
                  <ComicAction variant="green" size="medium">
                    LEVEL UP!
                  </ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Cream Variant (Vintage Zine)</span>
                  <ComicAction variant="cream" size="medium">
                    LAST CALL
                  </ComicAction>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Custom Prop Palette Override</span>
                  <ComicAction
                    backgroundColor="#FF5964"
                    patternColor="#D12D3A"
                    textColor="#FFFFFF"
                    borderColor="#0B0B0B"
                    shadowColor="#0B0B0B"
                    size="medium"
                  >
                    EXPLOSION!
                  </ComicAction>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* SECTION 2: COMIC BUBBLE PREVIEW                                    */}
        {/* ================================================================== */}
        {(activeTab === 'all' || activeTab === 'bubble') && (
          <section className="comic-playground__section" id="comic-bubble-section">
            <div className="comic-playground__section-header">
              <h2 className="comic-playground__section-title">2. COMICBUBBLE COMPONENT</h2>
              <span className="comic-playground__section-desc">
                Organic hand-drawn silhouette, continuous outlined tail, and subtle framing dots
              </span>
            </div>

            {/* Sizes Showcase */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Size Presets: Large, Medium, Small
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid" style={{ alignItems: 'flex-start' }}>
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">size="large"</span>
                  <ComicBubble size="large" tail="bottom-left">
                    See you at
                    <br />
                    the party!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">size="medium" (Reference Match)</span>
                  <ComicBubble size="medium" tail="bottom-left">
                    See you at
                    <br />
                    the party!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">size="small"</span>
                  <ComicBubble size="small" tail="bottom-left">
                    See you at
                    <br />
                    the party!
                  </ComicBubble>
                </div>
              </div>
            </div>

            {/* Tail Directions Showcase */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Configurable Tail Directions: bottom-left, bottom-right, none
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid" style={{ alignItems: 'flex-start' }}>
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">tail="bottom-left" (Default)</span>
                  <ComicBubble size="medium" tail="bottom-left">
                    Look over there!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">tail="bottom-right"</span>
                  <ComicBubble size="medium" tail="bottom-right">
                    I got your back!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">tail="none" (Caption / Inner Monologue)</span>
                  <ComicBubble size="medium" tail="none">
                    Meanwhile, in another world...
                  </ComicBubble>
                </div>
              </div>
            </div>

            {/* Text Length Variations */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Content Scaling: Short, Multi-line, and Extended Paragraph
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid" style={{ alignItems: 'flex-start' }}>
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Short Punchy Text</span>
                  <ComicBubble size="medium" tail="bottom-left">
                    WHAM!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Original Reference Text</span>
                  <ComicBubble size="medium" tail="bottom-left">
                    See you at
                    <br />
                    the party!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Long Multi-Line Text</span>
                  <ComicBubble size="medium" tail="bottom-left" style={{ maxWidth: '380px' }}>
                    Wait, are you sure we took the right exit? The music sounds like it is coming from underground!
                  </ComicBubble>
                </div>
              </div>
            </div>

            {/* Color Configurations */}
            <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#EDE4D9' }}>
              Single-Color Background Configurations
            </h3>
            <div className="comic-playground__stage">
              <div className="comic-playground__grid" style={{ alignItems: 'flex-start' }}>
                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Warm Paper Cream (Reference Default #F1E8D9)</span>
                  <ComicBubble backgroundColor="#F1E8D9" size="medium">
                    Classic warm comic paper.
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Project Canonical Paper (#EDE4D9)</span>
                  <ComicBubble backgroundColor="#EDE4D9" size="medium">
                    Same brain. Different world.
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Pale Pastel Yellow (#FFF4D4)</span>
                  <ComicBubble backgroundColor="#FFF4D4" size="medium">
                    Bright vintage newsprint!
                  </ComicBubble>
                </div>

                <div className="comic-playground__card">
                  <span className="comic-playground__card-label">Muted Toxic Mint (#D5FCE6)</span>
                  <ComicBubble backgroundColor="#D5FCE6" size="medium">
                    Radioactive whispering!
                  </ComicBubble>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* SECTION 3: LIVE CUSTOMIZER STUDIO                                  */}
        {/* ================================================================== */}
        {(activeTab === 'all' || activeTab === 'studio') && (
          <section className="comic-playground__section" id="customizer-studio-section">
            <div className="comic-playground__section-header">
              <h2 className="comic-playground__section-title">3. LIVE CUSTOMIZATION STUDIO</h2>
              <span className="comic-playground__section-desc">
                Inspect props and experiment with custom styling in real time
              </span>
            </div>

            {/* Action Studio */}
            <h3 style={{ fontSize: '1.2rem', color: '#39EF88', marginBottom: '0.75rem' }}>
              ComicAction Live Customizer
            </h3>
            <div className="comic-playground__studio">
              <div className="comic-playground__controls-panel">
                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Quick Variant Preset</label>
                  <select
                    className="comic-playground__select"
                    value={actionVariant}
                    onChange={(e) => {
                      const v = e.target.value as ComicActionVariant;
                      setActionVariant(v);
                      const p = COMIC_ACTION_VARIANTS[v];
                      if (p) {
                        setActionBg(p.backgroundColor);
                        setActionTextColor(p.textColor);
                        setActionBorderColor(p.borderColor);
                        setActionShadowColor(p.shadowColor);
                        setActionPatternColor(p.patternColor);
                      }
                    }}
                  >
                    <option value="yellow">Yellow (Default Reference)</option>
                    <option value="purple">Purple (Electric)</option>
                    <option value="green">Green (Acid Punch)</option>
                    <option value="cream">Cream / White (Subtle Dots)</option>
                    <option value="white">White</option>
                  </select>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Text Content</label>
                  <input
                    type="text"
                    className="comic-playground__input"
                    value={actionText}
                    onChange={(e) => setActionText(e.target.value)}
                  />
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Size Preset</label>
                  <select
                    className="comic-playground__select"
                    value={actionSize}
                    onChange={(e) => setActionSize(e.target.value as ComicActionSize)}
                  >
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                  </select>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Rotation Angle: {actionRotation}°</label>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.5"
                    value={actionRotation}
                    onChange={(e) => setActionRotation(parseFloat(e.target.value))}
                  />
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Background Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={actionBg}
                      onChange={(e) => setActionBg(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={actionBg}
                      onChange={(e) => setActionBg(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Pattern (Halftone Dot) Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={actionPatternColor}
                      onChange={(e) => setActionPatternColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={actionPatternColor}
                      onChange={(e) => setActionPatternColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Text Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={actionTextColor}
                      onChange={(e) => setActionTextColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={actionTextColor}
                      onChange={(e) => setActionTextColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Border Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={actionBorderColor}
                      onChange={(e) => setActionBorderColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={actionBorderColor}
                      onChange={(e) => setActionBorderColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Shadow Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={actionShadowColor}
                      onChange={(e) => setActionShadowColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={actionShadowColor}
                      onChange={(e) => setActionShadowColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="comic-playground__studio-preview">
                <ComicAction
                  size={actionSize}
                  backgroundColor={actionBg}
                  textColor={actionTextColor}
                  borderColor={actionBorderColor}
                  shadowColor={actionShadowColor}
                  patternColor={actionPatternColor}
                  rotation={actionRotation}
                >
                  {actionText}
                </ComicAction>

                <pre className="comic-playground__code-box">
{`<ComicAction
  size="${actionSize}"
  backgroundColor="${actionBg}"
  textColor="${actionTextColor}"
  borderColor="${actionBorderColor}"
  shadowColor="${actionShadowColor}"
  patternColor="${actionPatternColor}"
  rotation={${actionRotation}}
>
  ${actionText}
</ComicAction>`}
                </pre>
              </div>
            </div>

            {/* Bubble Studio */}
            <h3 style={{ fontSize: '1.2rem', color: '#39EF88', marginBottom: '0.75rem', marginTop: '2rem' }}>
              ComicBubble Live Customizer
            </h3>
            <div className="comic-playground__studio">
              <div className="comic-playground__controls-panel">
                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Background Preset</label>
                  <select
                    className="comic-playground__select"
                    value={bubbleBg}
                    onChange={(e) => setBubbleBg(e.target.value)}
                  >
                    <option value="#F1E8D9">Reference Cream (#F1E8D9)</option>
                    <option value="#EDE4D9">Project Paper (#EDE4D9)</option>
                    <option value="#FFF4D4">Vintage Newsprint (#FFF4D4)</option>
                    <option value="#D5FCE6">Toxic Mint (#D5FCE6)</option>
                  </select>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Text Content</label>
                  <textarea
                    rows={3}
                    className="comic-playground__textarea"
                    value={bubbleText}
                    onChange={(e) => setBubbleText(e.target.value)}
                  />
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Size Preset</label>
                  <select
                    className="comic-playground__select"
                    value={bubbleSize}
                    onChange={(e) => setBubbleSize(e.target.value as ComicBubbleSize)}
                  >
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                  </select>
                </div>

                <div className="comic-playground__control-group">
                  <label htmlFor="bubble-tail-select" className="comic-playground__control-label">Tail Direction</label>
                  <select
                    id="bubble-tail-select"
                    className="comic-playground__select"
                    value={bubbleTail}
                    onChange={(e) => setBubbleTail(e.target.value as ComicBubbleTail)}
                  >
                    <option value="bottom-left">bottom-left</option>
                    <option value="bottom-right">bottom-right</option>
                    <option value="none">none</option>
                  </select>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Background Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={bubbleBg}
                      onChange={(e) => setBubbleBg(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={bubbleBg}
                      onChange={(e) => setBubbleBg(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Text Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={bubbleTextColor}
                      onChange={(e) => setBubbleTextColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={bubbleTextColor}
                      onChange={(e) => setBubbleTextColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Border Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={bubbleBorderColor}
                      onChange={(e) => setBubbleBorderColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={bubbleBorderColor}
                      onChange={(e) => setBubbleBorderColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="comic-playground__control-group">
                  <label className="comic-playground__control-label">Decorative Dot Color</label>
                  <div className="comic-playground__color-row">
                    <input
                      type="color"
                      className="comic-playground__color-picker"
                      value={bubbleDotColor}
                      onChange={(e) => setBubbleDotColor(e.target.value)}
                    />
                    <input
                      type="text"
                      className="comic-playground__input"
                      value={bubbleDotColor}
                      onChange={(e) => setBubbleDotColor(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="comic-playground__studio-preview">
                <ComicBubble
                  size={bubbleSize}
                  tail={bubbleTail}
                  backgroundColor={bubbleBg}
                  textColor={bubbleTextColor}
                  borderColor={bubbleBorderColor}
                  dotColor={bubbleDotColor}
                >
                  {bubbleText.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      {idx < bubbleText.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </ComicBubble>

                <pre className="comic-playground__code-box">
{`<ComicBubble
  size="${bubbleSize}"
  tail="${bubbleTail}"
  backgroundColor="${bubbleBg}"
  textColor="${bubbleTextColor}"
  borderColor="${bubbleBorderColor}"
  dotColor="${bubbleDotColor}"
>
  ${bubbleText.replace(/\n/g, '<br />')}
</ComicBubble>`}
                </pre>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
