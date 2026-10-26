import React from 'react';

export interface AnalogClockSvgProps extends React.SVGProps<SVGSVGElement> {
  time?: string;
  hourAngle?: number;
  minuteAngle?: number;
  size?: number | string;
  className?: string;
  hourHandRef?: React.Ref<SVGGElement>;
  minuteHandRef?: React.Ref<SVGGElement>;
  stickerRef?: React.Ref<SVGCircleElement>;
  casingRef?: React.Ref<SVGCircleElement>;
  faceRef?: React.Ref<SVGCircleElement>;
}

/**
 * Calculates analog clock hand rotation angles from a time string.
 *
 * Equations:
 * - Minute hand angle = (minute / 60) * 360 = minute * 6 degrees.
 * - Hour hand angle   = (((hour % 12) + minute / 60) / 12) * 360 = ((hour % 12) * 30) + (minute * 0.5) degrees.
 *
 * Supported formats: "9:30 PM", "10:15 PM", "11:40 PM", "1:20 AM", "3:17 AM", "7:58 AM", "12:00 PM", "11:40", etc.
 */
export function calculateHandAngles(timeStr?: string): { hourAngle: number; minuteAngle: number } {
  if (!timeStr || typeof timeStr !== 'string') {
    return { hourAngle: 0, minuteAngle: 0 };
  }

  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);
  if (!match) {
    return { hourAngle: 0, minuteAngle: 0 };
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toUpperCase() : null;

  if (ampm === 'PM' && hour < 12) {
    hour += 12;
  } else if (ampm === 'AM' && hour === 12) {
    hour = 0;
  }

  const normalizedHour = hour % 12;
  const minuteAngle = Number(((minute / 60) * 360).toFixed(2));
  const hourAngle = Number((((normalizedHour + minute / 60) / 12) * 360).toFixed(2));

  return { hourAngle, minuteAngle };
}

// 60 tick mark definitions around the 100x100 clock face (center 50, 50)
const CLOCK_TICKS = Array.from({ length: 60 }, (_, i) => {
  const isCardinal = i % 15 === 0; // 0 (12), 15 (3), 30 (6), 45 (9)
  const isHour = i % 5 === 0;
  const angle = i * 6;
  return {
    index: i,
    angle,
    isHour,
    isCardinal,
    y1: 13.5,
    y2: isCardinal ? 18.5 : isHour ? 17.5 : 16.0,
    strokeWidth: isCardinal ? 2.2 : isHour ? 1.8 : 0.8,
    strokeOpacity: isHour ? 1 : 0.75,
    className: isHour
      ? isCardinal
        ? 'clock-tick-hour clock-tick-cardinal'
        : 'clock-tick-hour'
      : 'clock-tick-minute',
  };
});

/**
 * AnalogClockSvg renders the reusable editorial collage analog clock face.
 *
 * Visual specifications:
 * - Sticker cutout art direction (warm-paper outer contour #EDE4D9)
 * - Bold black casing and bezel (#0B0B0B)
 * - Warm-paper clock face (#EDE4D9)
 * - High-contrast black tick marks and restrained numerals (12, 3, 6, 9)
 * - Electric-purple primary hand (#7A3BFF)
 * - Selective acid-green registration marks (#39EF88)
 * - Separately addressable layers: .clock-sticker-border, .clock-casing, .clock-bezel,
 *   .clock-face, .clock-tick-minute, .clock-tick-hour, .clock-hand-hour, .clock-hand-minute,
 *   .clock-center-pin, .clock-registration
 */
export const AnalogClockSvg = React.forwardRef<SVGSVGElement, AnalogClockSvgProps>(
  (
    {
      time = '11:40 PM',
      hourAngle,
      minuteAngle,
      size,
      className = '',
      hourHandRef,
      minuteHandRef,
      stickerRef,
      casingRef,
      faceRef,
      style,
      ...svgProps
    },
    ref
  ) => {
    const calculated = calculateHandAngles(time);
    const finalHourAngle = hourAngle !== undefined ? hourAngle : calculated.hourAngle;
    const finalMinuteAngle = minuteAngle !== undefined ? minuteAngle : calculated.minuteAngle;

    const widthAttr = typeof size === 'number' ? size : size || '100%';
    const heightAttr = typeof size === 'number' ? size : size || '100%';

    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        width={widthAttr}
        height={heightAttr}
        role="img"
        aria-label={svgProps['aria-label'] || `Analog clock indicating ${time}`}
        className={`analog-clock-svg ${className}`}
        style={{
          display: 'block',
          overflow: 'visible',
          ...style,
        }}
        {...svgProps}
      >
        <defs>
          <clipPath id="clock-face-clip">
            <circle cx="50" cy="50" r="37" />
          </clipPath>
        </defs>

        {/* 1. Outer Sticker Silhouette (Thick warm-paper border) */}
        <circle
          ref={stickerRef}
          cx="50"
          cy="50"
          r="48"
          fill="#EDE4D9"
          stroke="#D8CEBF"
          strokeWidth="0.6"
          className="clock-sticker-border"
        />

        {/* 2. Bold Black Outer Casing and Bezel */}
        <circle
          ref={casingRef}
          cx="50"
          cy="50"
          r="41"
          fill="#0B0B0B"
          className="clock-casing"
        />
        <circle
          cx="50"
          cy="50"
          r="38.5"
          fill="none"
          stroke="#1F1F1F"
          strokeWidth="1.2"
          className="clock-bezel"
        />

        {/* 3. Warm-Paper Clock Face */}
        <circle
          ref={faceRef}
          cx="50"
          cy="50"
          r="37"
          fill="#EDE4D9"
          className="clock-face"
        />

        {/* Inner concentric guideline tracks */}
        <circle
          cx="50"
          cy="50"
          r="36.5"
          fill="none"
          stroke="#0B0B0B"
          strokeWidth="0.5"
          strokeOpacity="0.35"
        />
        <circle
          cx="50"
          cy="50"
          r="31.5"
          fill="none"
          stroke="#0B0B0B"
          strokeWidth="0.35"
          strokeOpacity="0.2"
          strokeDasharray="1 1.5"
        />

        {/* 4. Minute & Hour Tick Marks */}
        <g className="clock-ticks" aria-hidden="true">
          {CLOCK_TICKS.map((tick) => (
            <line
              key={tick.index}
              x1="50"
              y1={tick.y1}
              x2="50"
              y2={tick.y2}
              stroke="#0B0B0B"
              strokeWidth={tick.strokeWidth}
              strokeOpacity={tick.strokeOpacity}
              strokeLinecap="square"
              transform={`rotate(${tick.angle} 50 50)`}
              className={tick.className}
            />
          ))}
        </g>

        {/* 5. Restrained Numerals (12, 3, 6, 9) */}
        <g className="clock-numerals" aria-hidden="true">
          <text
            x="50"
            y="25.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0B0B0B"
            fontSize="8.5"
            fontFamily="var(--font-display, 'Bebas Neue', Anton, Impact, sans-serif)"
            fontWeight="900"
            className="clock-numeral clock-numeral-12"
          >
            12
          </text>
          <text
            x="74.5"
            y="50.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0B0B0B"
            fontSize="8.5"
            fontFamily="var(--font-display, 'Bebas Neue', Anton, Impact, sans-serif)"
            fontWeight="900"
            className="clock-numeral clock-numeral-3"
          >
            3
          </text>
          <text
            x="50"
            y="75.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0B0B0B"
            fontSize="8.5"
            fontFamily="var(--font-display, 'Bebas Neue', Anton, Impact, sans-serif)"
            fontWeight="900"
            className="clock-numeral clock-numeral-6"
          >
            6
          </text>
          <text
            x="25.5"
            y="50.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0B0B0B"
            fontSize="8.5"
            fontFamily="var(--font-display, 'Bebas Neue', Anton, Impact, sans-serif)"
            fontWeight="900"
            className="clock-numeral clock-numeral-9"
          >
            9
          </text>
        </g>

        {/* 6. Selective Acid-Green Registration Details & Technical Marks */}
        <g className="clock-registration-details" aria-hidden="true">
          {/* Top 12-o'clock acid-green registration crosshair mark */}
          <path
            d="M 50 14.5 L 50 17.5 M 48.5 16 L 51.5 16"
            stroke="#39EF88"
            strokeWidth="1"
            strokeLinecap="square"
            className="clock-registration clock-registration-crosshair"
          />
          {/* Subtle editorial zine labels */}
          <text
            x="50"
            y="33"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0B0B0B"
            fontSize="2.8"
            fontFamily="var(--font-body, 'Space Grotesk', monospace)"
            fontWeight="700"
            letterSpacing="0.12em"
            opacity="0.65"
            className="clock-label"
          >
            IYKYK
          </text>
          <text
            x="50"
            y="66.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0B0B0B"
            fontSize="2.1"
            fontFamily="var(--font-body, 'Space Grotesk', monospace)"
            fontWeight="600"
            letterSpacing="0.08em"
            opacity="0.45"
            className="clock-sublabel"
          >
            COLLAGE LAB
          </text>
        </g>

        {/* 7. Hour Hand (Bold High-Contrast Black #0B0B0B) */}
        <g
          ref={hourHandRef}
          className="clock-hand-hour"
          transform={`rotate(${finalHourAngle} 50 50)`}
        >
          <path
            d="M 48.6 54 L 51.4 54 L 51.4 50 L 51.2 32 L 50 29 L 48.8 32 L 48.6 50 Z"
            fill="#0B0B0B"
          />
        </g>

        {/* 8. Minute Hand (Electric-Purple Primary Hand #7A3BFF) */}
        <g
          ref={minuteHandRef}
          className="clock-hand-minute"
          transform={`rotate(${finalMinuteAngle} 50 50)`}
        >
          <path
            d="M 48.8 56 L 51.2 56 L 51.2 50 L 50.8 20 L 50 17.5 L 49.2 20 L 48.8 50 Z"
            fill="#7A3BFF"
          />
          <line
            x1="50"
            y1="18.5"
            x2="50"
            y2="52"
            stroke="#EDE4D9"
            strokeWidth="0.4"
            strokeOpacity="0.4"
          />
        </g>

        {/* 9. Center Pin with Acid-Green Registration Dot */}
        <g className="clock-center-pin" aria-hidden="true">
          <circle cx="50" cy="50" r="3.8" fill="#0B0B0B" />
          <circle cx="50" cy="50" r="2.2" fill="#EDE4D9" />
          <circle cx="50" cy="50" r="1.3" fill="#39EF88" className="clock-registration" />
        </g>
      </svg>
    );
  }
);

AnalogClockSvg.displayName = 'AnalogClockSvg';
