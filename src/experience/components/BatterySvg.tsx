import React, { useId, useRef, useImperativeHandle, useEffect } from 'react';

export interface BatterySvgHandle {
  setValue: (value: number) => void;
  getValue: () => number;
  svgElement: SVGSVGElement | null;
}

export interface BatterySvgProps {
  value?: number; // 0 to 100
  mode?: 'story' | 'rebuild';
  className?: string;
  id?: string;
  showRegistrationMarks?: boolean;
  style?: React.CSSProperties;
}

/**
 * Coherent outer silhouette path covering the complete battery body and protruding terminal.
 * Designed as a unified street-stencil / spray-painted die-cut perimeter.
 */
const OUTER_BATTERY_PATH =
  'M 18 10 ' +
  'H 134 ' +
  'A 8 8 0 0 1 142 18 ' +
  'V 22 ' +
  'H 146 ' +
  'A 4 4 0 0 1 150 26 ' +
  'V 38 ' +
  'A 4 4 0 0 1 146 42 ' +
  'H 142 ' +
  'V 46 ' +
  'A 8 8 0 0 1 134 54 ' +
  'H 18 ' +
  'A 8 8 0 0 1 10 46 ' +
  'V 18 ' +
  'A 8 8 0 0 1 18 10 ' +
  'Z';

const TERMINAL_PATH =
  'M 140 22 ' +
  'H 146 ' +
  'A 4 4 0 0 1 150 26 ' +
  'V 38 ' +
  'A 4 4 0 0 1 146 42 ' +
  'H 140 ' +
  'Z';

const CELLS = [
  { id: '1', className: 'battery-cell-1', x: 20, y: 19, width: 20, height: 26, rx: 3 },
  { id: '2', className: 'battery-cell-2', x: 43, y: 19, width: 20, height: 26, rx: 3 },
  { id: '3', className: 'battery-cell-3', x: 66, y: 19, width: 20, height: 26, rx: 3 },
  { id: '4', className: 'battery-cell-4', x: 89, y: 19, width: 20, height: 26, rx: 3 },
  { id: '5', className: 'battery-cell-5', x: 112, y: 19, width: 20, height: 26, rx: 3 },
];

const CELLS_START_X = 20;
const CELLS_TOTAL_WIDTH = 112; // x from 20 to 132

/**
 * BatterySvg renders a tactile spray-can street art phone-battery energy meter SVG.
 * - Stencil/spray paint aesthetic: aerosol overspray mist, edge grain, spray droplets, and vibrant glow.
 * - No rectangular background box: transparent, floats freely in collage space.
 * - Three layers: Warm-paper spray stencil silhouette, Ink-black casing with terminal, and dark recessed track.
 * - Five individually defined Electric Purple (#7A3BFF) charge cells.
 * - Restrained Acid Green (#39EF88) sprayed '+' polarity tag and registration crosshairs.
 * - Smooth horizontal clipPath sweep for intermediate scroll and rebuild animation.
 * - Direct DOM manipulation handle for 60fps GSAP performance without React re-renders.
 */
export const BatterySvg = React.forwardRef<BatterySvgHandle, BatterySvgProps>(
  (
    {
      value = 100,
      mode = 'story',
      className = '',
      id,
      showRegistrationMarks = true,
      style,
    },
    ref
  ) => {
    const rawId = useId();
    const clipId = id ? `${id}-clip` : `battery-clip-${rawId.replace(/:/g, '')}`;

    const svgRef = useRef<SVGSVGElement>(null);
    const clipRectRef = useRef<SVGRectElement>(null);
    const currentValueRef = useRef<number>(Math.max(0, Math.min(100, value)));

    const updateFillDOM = (pct: number) => {
      const clamped = Math.max(0, Math.min(100, pct));
      currentValueRef.current = clamped;
      const width = (clamped / 100) * CELLS_TOTAL_WIDTH;

      if (clipRectRef.current) {
        clipRectRef.current.setAttribute('width', width.toFixed(2));
        clipRectRef.current.style.width = `${width.toFixed(2)}px`;
      }
      if (svgRef.current) {
        svgRef.current.style.setProperty('--battery-fill', `${clamped}%`);
        svgRef.current.setAttribute('aria-valuenow', clamped.toString());
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        setValue: (newVal: number) => {
          updateFillDOM(newVal);
        },
        getValue: () => currentValueRef.current,
        get svgElement() {
          return svgRef.current;
        },
      }),
      []
    );

    useEffect(() => {
      if (typeof value === 'number') {
        updateFillDOM(value);
      }
    }, [value]);

    const initialClamped = Math.max(0, Math.min(100, value));
    const initialWidth = ((initialClamped / 100) * CELLS_TOTAL_WIDTH).toFixed(2);

    return (
      <svg
        ref={svgRef}
        viewBox="0 0 160 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`battery-svg battery-spray ${className}`}
        data-mode={mode}
        role="img"
        aria-label={`Battery level ${initialClamped}%`}
        aria-valuenow={initialClamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={
          {
            '--battery-fill': `${initialClamped}%`,
            overflow: 'visible',
            ...style,
          } as React.CSSProperties
        }
      >
        <defs>
          {/* Smooth horizontal sweep clip path covering the 5 charge cells */}
          <clipPath id={clipId}>
            <rect
              ref={clipRectRef}
              className="battery-clip-rect"
              x={CELLS_START_X}
              y="17"
              width={initialWidth}
              height="30"
              style={{ width: `${initialWidth}px` }}
            />
          </clipPath>

          {/* Spray paint aerosol edge texture filter */}
          <filter id={`${clipId}-spray`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="sprayNoise" />
            <feDisplacementMap in="SourceGraphic" in2="sprayNoise" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feMerge>
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>

          {/* Soft aerosol overspray mist halo */}
          <filter id={`${clipId}-overspray`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 0: Aerosol Overspray Mist Halo (Diffuse spray fog around the stencil) */}
        <g className="battery-spray-halo" aria-hidden="true">
          <path
            d={OUTER_BATTERY_PATH}
            fill="none"
            stroke="#7A3BFF"
            strokeWidth="12"
            opacity="0.25"
            filter={`url(#${clipId}-overspray)`}
          />
          <path
            d={OUTER_BATTERY_PATH}
            fill="none"
            stroke="#EDE4D9"
            strokeWidth="8"
            opacity="0.18"
            filter={`url(#${clipId}-overspray)`}
          />
        </g>

        {/* Layer A: Warm-Paper Outer Spray-Cutout Silhouette */}
        <path
          className="battery-sticker-border"
          d={OUTER_BATTERY_PATH}
          fill="#EDE4D9"
          stroke="#EDE4D9"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter={`url(#${clipId}-spray)`}
        />

        {/* Layer B: Ink-Black Stencil Casing & Protruding Terminal */}
        <g className="battery-casing" filter={`url(#${clipId}-spray)`}>
          <rect
            className="battery-casing-body"
            x="10"
            y="10"
            width="132"
            height="44"
            rx="8"
            fill="#0B0B0B"
          />
          <path
            className="battery-terminal"
            d={TERMINAL_PATH}
            fill="#0B0B0B"
          />
        </g>

        {/* Layer C: Recessed Dark-Purple Stencil Track */}
        <rect
          className="battery-interior-track"
          x="16"
          y="16"
          width="120"
          height="32"
          rx="5"
          fill="#180D2B"
        />

        {/* Layer D: 5 Individually Defined Empty/Base Charge Cell Cavities */}
        <g className="battery-cells-base" aria-hidden="true">
          {CELLS.map((cell) => (
            <rect
              key={cell.id}
              className={`battery-cell battery-cell-empty ${cell.className}`}
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height}
              rx={cell.rx}
              fill="#130824"
              stroke="rgba(122, 59, 255, 0.28)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Layer E: Active Electric Purple Spray-Painted Charge Cells */}
        <g className="battery-fill-active" clipPath={`url(#${clipId})`}>
          {CELLS.map((cell) => (
            <rect
              key={cell.id}
              className={`battery-cell battery-cell-active ${cell.className}`}
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height}
              rx={cell.rx}
              fill="#7A3BFF"
              filter={`url(#${clipId}-spray)`}
            />
          ))}
        </g>

        {/* Layer F: Spray Splatter Micro-Droplets (Airborne Aerosol Particles) */}
        <g className="battery-spray-droplets" aria-hidden="true" opacity="0.8">
          <circle cx="152" cy="24" r="0.8" fill="#7A3BFF" />
          <circle cx="154.5" cy="28" r="0.5" fill="#7A3BFF" />
          <circle cx="153" cy="38" r="0.7" fill="#7A3BFF" />
          <circle cx="155.5" cy="35" r="0.5" fill="#7A3BFF" />
          <circle cx="148" cy="18" r="0.6" fill="#7A3BFF" />
          <circle cx="14" cy="8" r="0.7" fill="#7A3BFF" />
          <circle cx="8" cy="14" r="0.5" fill="#7A3BFF" />
          <circle cx="138" cy="8" r="0.6" fill="#7A3BFF" />
          <circle cx="140" cy="56" r="0.8" fill="#7A3BFF" />
          <circle cx="16" cy="56" r="0.6" fill="#7A3BFF" />
          <circle cx="149" cy="31" r="0.5" fill="#39EF88" />
          <circle cx="137" cy="11" r="0.5" fill="#39EF88" />
        </g>

        {/* Layer G: Restrained Spray-Tagged Registration Accents in Acid Green (#39EF88) */}
        {showRegistrationMarks && (
          <g className="battery-registration-mark" aria-hidden="true">
            {/* Positive Terminal '+' Polarity Spray Tag */}
            <line
              x1="143.5"
              y1="32"
              x2="148.5"
              y2="32"
              stroke="#39EF88"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="146"
              y1="29.5"
              x2="146"
              y2="34.5"
              stroke="#39EF88"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Subtle Screen-Print / Stencil Crosshair near Upper Shoulder */}
            <line
              x1="136.5"
              y1="13.5"
              x2="140.5"
              y2="13.5"
              stroke="#39EF88"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line
              x1="138.5"
              y1="11.5"
              x2="138.5"
              y2="15.5"
              stroke="#39EF88"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>
        )}
      </svg>
    );
  }
);

BatterySvg.displayName = 'BatterySvg';
