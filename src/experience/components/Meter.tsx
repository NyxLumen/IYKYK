import React from 'react';

export interface MeterProps {
  value: number; // 0 to 100
  mode?: 'story' | 'rebuild';
  visible?: boolean;
  className?: string;
}

/**
 * Meter renders the narrative control / stamina device (design.md Section 12, architecture.md Sec 20-21).
 * Story descent: 100 → 80 → 60 → 40 → 20 → 0
 * Rebuild: 0 → 20 → 40 → 60 → 80 → 100
 * IMPORTANT: Illustrative storytelling device, NOT a medical or clinical metric.
 */
export const Meter: React.FC<MeterProps> = ({
  value,
  mode = 'story',
  visible = true,
  className = '',
}) => {
  if (!visible) return null;

  const clamped = Math.max(0, Math.min(100, value));
  const isRebuild = mode === 'rebuild';

  return (
    <div
      className={`narrative-meter-wrapper ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Narrative control meter"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        background: 'rgba(11, 11, 11, 0.85)',
        padding: '0.4rem 0.8rem',
        border: '1px solid rgba(237, 228, 217, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        zIndex: 'var(--z-meter)',
      }}
    >
      {/* Distressed horizontal meter bar */}
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
          className="meter-bar-fill"
          style={{
            height: '100%',
            width: `${clamped}%`,
            background: isRebuild
              ? 'linear-gradient(90deg, var(--color-purple) 0%, var(--color-green) 100%)'
              : clamped <= 20
                ? 'var(--color-purple)'
                : 'linear-gradient(90deg, var(--color-purple) 0%, var(--color-green) 85%)',
            borderRadius: '8px',
            transition: 'width 0.6s var(--ease-snap)',
            boxShadow: isRebuild
              ? '0 0 10px var(--color-green-glow)'
              : '0 0 6px var(--color-purple-glow)',
          }}
        />
      </div>

      {/* Numerical percentage display */}
      <div
        className="meter-bar-label font-display"
        style={{
          fontSize: 'var(--text-lg)',
          color: clamped === 0 ? 'var(--color-purple)' : 'var(--color-paper)',
          minWidth: '4ch',
          textAlign: 'right',
          letterSpacing: '0.04em',
        }}
      >
        {clamped}%
      </div>
    </div>
  );
};
