import React from 'react';
import { ClockVariant } from '../data/types';
import { AnalogClockSvg, calculateHandAngles, AnalogClockSvgProps } from './AnalogClockSvg';

export { AnalogClockSvg, calculateHandAngles };
export type { AnalogClockSvgProps };

export interface ClockProps {
  time?: string;
  variant?: ClockVariant;
  visible?: boolean;
  className?: string;
  size?: number | string;
  hourAngle?: number;
  minuteAngle?: number;
  hourHandRef?: React.Ref<SVGGElement>;
  minuteHandRef?: React.Ref<SVGGElement>;
  svgRef?: React.Ref<SVGSVGElement>;
}

/**
 * Clock renders the temporal narrative device (design.md Sec 13, architecture.md Sec 22).
 * Driven strictly by scene data (9:30 PM → 10:15 PM → 11:40 PM → 1:20 AM → 3:17 AM → 7:58 AM).
 */
export const Clock: React.FC<ClockProps> = ({
  time = '9:30 PM',
  variant = 'digital',
  visible = true,
  className = '',
  size,
  hourAngle,
  minuteAngle,
  hourHandRef,
  minuteHandRef,
  svgRef,
}) => {
  if (!visible) return null;

  if (variant === 'analog') {
    const customSize = typeof size === 'number' ? `${size}px` : size;

    return (
      <div
        className={`narrative-clock clock-analog ${className}`}
        aria-label={`Time: ${time}`}
        style={{
          width: customSize || '80px',
          height: customSize || '80px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 'var(--z-clock)',
          flexShrink: 0,
        }}
      >
        <AnalogClockSvg
          ref={svgRef}
          time={time}
          hourAngle={hourAngle}
          minuteAngle={minuteAngle}
          hourHandRef={hourHandRef}
          minuteHandRef={minuteHandRef}
        />
      </div>
    );
  }

  if (variant === 'oversized') {
    return (
      <div
        className={`narrative-clock clock-oversized ${className}`}
        aria-label={`Time: ${time}`}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          lineHeight: 0.9,
          color: 'var(--color-paper)',
          textShadow: '0 0 25px var(--color-purple-glow)',
          transform: 'rotate(-4deg)',
          border: '2px dashed var(--color-purple)',
          padding: 'var(--space-xs) var(--space-md)',
          background: 'rgba(11, 11, 11, 0.9)',
          zIndex: 'var(--z-clock)',
          display: 'inline-block',
        }}
      >
        {time}
      </div>
    );
  }

  // Default Digital Clock variant
  return (
    <div
      className={`narrative-clock clock-digital badge-tape ${className}`}
      aria-label={`Time: ${time}`}
      style={{
        zIndex: 'var(--z-clock)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 'var(--text-sm)',
        letterSpacing: '0.08em',
      }}
    >
      {time}
    </div>
  );
};
