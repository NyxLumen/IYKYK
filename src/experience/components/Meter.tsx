import React from 'react';
import { BatterySvg, BatterySvgHandle } from './BatterySvg';

export type { BatterySvgHandle };

export interface MeterProps {
  value?: number; // 0 to 100
  mode?: 'story' | 'rebuild';
  visible?: boolean;
  className?: string;
  batteryRef?: React.Ref<BatterySvgHandle>;
  labelRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}

/**
 * Meter renders the narrative control / stamina device (design.md Section 12, architecture.md Sec 20-21).
 * Story descent: 100 → 80 → 60 → 40 → 20 → 0
 * Rebuild: 0 → 20 → 40 → 60 → 80 → 100
 *
 * Street Art / Spray-Can Aesthetics:
 * - Floats directly without an enclosing black box or border card.
 * - Battery and percentage appear as if sprayed directly onto the collage substrate.
 * - Percentage styled with handwritten spray-paint typography ('Permanent Marker') and aerosol glow.
 */
export const Meter: React.FC<MeterProps> = ({
  value = 100,
  mode = 'story',
  visible = true,
  className = '',
  batteryRef,
  labelRef,
  style,
}) => {
  if (!visible) return null;

  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`narrative-meter-wrapper meter-spray ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Narrative control meter"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        background: 'transparent',
        padding: 0,
        border: 'none',
        boxShadow: 'none',
        position: 'relative',
        zIndex: 'var(--z-meter)',
        ...style,
      }}
    >
      {/* Phone-Battery-style SVG Energy Meter with Spray Stencil Aesthetics */}
      <BatterySvg
        ref={batteryRef}
        value={clamped}
        mode={mode}
      />

      {/* Numerical percentage display styled like spray-can graffiti tag */}
      <div
        ref={labelRef}
        className="meter-bar-label meter-spray-label"
        style={{
          fontFamily: "var(--font-handwriting, 'Permanent Marker', cursive)",
          fontSize: 'clamp(1.35rem, 2.4vw, 1.85rem)',
          lineHeight: 1,
          color: clamped === 0 ? 'var(--color-purple, #7A3BFF)' : 'var(--color-paper, #EDE4D9)',
          minWidth: '3.6ch',
          textAlign: 'right',
          letterSpacing: '0.04em',
          transform: 'rotate(-2.5deg)',
          display: 'inline-block',
          textShadow:
            clamped === 0
              ? '0 0 2px #7A3BFF, 0 0 6px rgba(122, 59, 255, 0.95), 0 0 14px rgba(122, 59, 255, 0.7)'
              : '0 0 2px #EDE4D9, 0 0 6px rgba(122, 59, 255, 0.8), 0 0 12px rgba(122, 59, 255, 0.45)',
          filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.9))',
          userSelect: 'none',
        }}
      >
        {clamped}%
      </div>
    </div>
  );
};
