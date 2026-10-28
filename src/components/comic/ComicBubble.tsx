import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import './ComicBubble.css';

export type ComicBubbleSize = 'small' | 'medium' | 'large';
export type ComicBubbleTail = 'bottom-left' | 'bottom-right' | 'none';

export interface ComicBubbleProps extends React.HTMLAttributes<HTMLElement> {
  /** Text or React children rendered within the speech bubble */
  children: React.ReactNode;
  /** Size preset: 'small' | 'medium' | 'large' (default: 'medium') */
  size?: ComicBubbleSize;
  /** Tail direction: 'bottom-left' | 'bottom-right' | 'none' (default: 'bottom-left') */
  tail?: ComicBubbleTail;
  /** Single background fill color (default: warm cream '#F1E8D9') */
  backgroundColor?: string;
  /** Text color (default: '#0B0B0B') */
  textColor?: string;
  /** Outline border color (default: '#0B0B0B') */
  borderColor?: string;
  /** Decorative dots color (optional low-contrast variation, default: '#C6BEB0') */
  dotColor?: string;
  /** Semantic HTML element to render (default: 'div') */
  as?: 'div' | 'span' | 'aside' | 'blockquote';
  /** Additional custom class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * ComicBubble is a reusable comic-book speech bubble component featuring:
 * - A single configurable warm paper background
 * - An organic, hand-drawn speech-bubble silhouette with an outlined tail
 * - Pointed speech tail supporting 'bottom-left', 'bottom-right', or 'none'
 * - Subtle scattered decorative dots inside the bubble framing the text
 * - Real HTML text that wraps naturally without clipping or overflowing
 */
export const ComicBubble: React.FC<ComicBubbleProps> = ({
  children,
  size = 'medium',
  tail = 'bottom-left',
  backgroundColor = '#F1E8D9',
  textColor = '#0B0B0B',
  borderColor = '#0B0B0B',
  dotColor = '#C6BEB0',
  as: Component = 'div',
  className = '',
  style = {},
  ...restProps
}) => {
  const contentRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Measure content box and update SVG dimensions responsively
  useIsomorphicLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    measure();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measure();
      });
      resizeObserver.observe(el);
    }

    // Also re-measure once external fonts (Finger Paint, etc.) finish loading
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [children, size, tail]);

  // Sizing parameters
  const strokeWidth = size === 'large' ? 7.5 : size === 'small' ? 5 : 6.2;
  const tailHeight = tail === 'none' ? 0 : size === 'large' ? 34 : size === 'small' ? 22 : 28;
  const dotRadius = size === 'large' ? 3.4 : size === 'small' ? 2.2 : 2.8;

  // Render SVG path only when measured (or sensible fallback bounds)
  const w = dimensions.width || (size === 'large' ? 360 : size === 'small' ? 160 : 260);
  const h = dimensions.height || (size === 'large' ? 180 : size === 'small' ? 90 : 130);

  const totalW = w;
  const totalH = h + tailHeight;

  // Geometry coordinates
  const x0 = 3;
  const x1 = totalW - 3;
  const y0 = 3;
  const y1 = h - 3;
  const bw = x1 - x0;
  const bh = y1 - y0;
  const rx = Math.min(bw * 0.28, 56);
  const ry = Math.min(bh * 0.44, 48);

  // Build the organic speech bubble path
  let pathD = `M ${x0 + rx} ${y0} ` +
    `C ${x0 + bw * 0.35} ${y0 - 2}, ${x0 + bw * 0.65} ${y0 - 1}, ${x1 - rx} ${y0} ` +
    `C ${x1 - rx * 0.3} ${y0 + 2}, ${x1} ${y0 + ry * 0.5}, ${x1} ${y0 + bh * 0.5} ` +
    `C ${x1} ${y1 - ry * 0.5}, ${x1 - rx * 0.3} ${y1 - 2}, ${x1 - rx} ${y1} `;

  if (tail === 'bottom-left') {
    const tStart = x0 + bw * 0.42;
    const tTipX = x0 + bw * 0.34 - 14;
    const tTipY = y1 + tailHeight;
    const tEnd = x0 + bw * 0.30;

    pathD += `C ${x0 + bw * 0.72} ${y1 + 1}, ${tStart + 20} ${y1}, ${tStart} ${y1} ` +
      `C ${tStart - 4} ${y1 + 10}, ${tTipX + 8} ${tTipY - 6}, ${tTipX} ${tTipY} ` +
      `C ${tTipX + 13} ${tTipY - 12}, ${tEnd + 4} ${y1 + 8}, ${tEnd} ${y1} ` +
      `C ${tEnd - 20} ${y1}, ${x0 + bw * 0.2} ${y1 + 1}, ${x0 + rx} ${y1} `;
  } else if (tail === 'bottom-right') {
    const trStart = x0 + bw * 0.58;
    const trTipX = x0 + bw * 0.66 + 14;
    const trTipY = y1 + tailHeight;
    const trEnd = x0 + bw * 0.70;

    pathD += `C ${x0 + bw * 0.8} ${y1}, ${trEnd + 20} ${y1 + 1}, ${trEnd} ${y1} ` +
      `C ${trEnd - 4} ${y1 + 8}, ${trTipX - 13} ${trTipY - 12}, ${trTipX} ${trTipY} ` +
      `C ${trTipX - 8} ${trTipY - 6}, ${trStart + 4} ${y1 + 10}, ${trStart} ${y1} ` +
      `C ${trStart - 20} ${y1 + 1}, ${x0 + bw * 0.3} ${y1 + 1}, ${x0 + rx} ${y1} `;
  } else {
    pathD += `C ${x0 + bw * 0.65} ${y1 + 1}, ${x0 + bw * 0.35} ${y1 + 1}, ${x0 + rx} ${y1} `;
  }

  pathD += `C ${x0 + rx * 0.3} ${y1 - 2}, ${x0} ${y1 - ry * 0.5}, ${x0} ${y0 + bh * 0.5} ` +
    `C ${x0} ${y0 + ry * 0.5}, ${x0 + rx * 0.3} ${y0 + 2}, ${x0 + rx} ${y0} Z`;

  // Compute decorative dots along the top and bottom inner margins
  const numDots = Math.max(5, Math.min(10, Math.floor(bw / 44)));
  const topDots: Array<{ x: number; y: number }> = [];
  const bottomDots: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < numDots; i++) {
    const frac = (i + 1) / (numDots + 1);
    const dx = x0 + rx * 0.6 + (bw - rx * 1.2) * frac;
    // Top arc
    const dyTop = y0 + 17 - Math.sin(frac * Math.PI) * 4;
    topDots.push({ x: dx, y: dyTop });
    // Bottom arc
    const dyBot = y1 - 18 + Math.sin(frac * Math.PI) * 4;
    bottomDots.push({ x: dx, y: dyBot });
  }

  const leftDot = { x: x0 + 18, y: y0 + bh * 0.5 };
  const rightDot = { x: x1 - 18, y: y0 + bh * 0.5 };

  const dynamicStyles: React.CSSProperties = {
    ['--comic-bubble-bg' as string]: backgroundColor,
    ['--comic-bubble-text' as string]: textColor,
    ['--comic-bubble-border' as string]: borderColor,
    ['--comic-bubble-dots' as string]: dotColor,
    ...style,
  };

  return (
    <div
      className={`comic-bubble-wrapper comic-bubble--${size} comic-bubble--tail-${tail} ${className}`.trim()}
      style={dynamicStyles}
    >
      <div className="comic-bubble__container">
        {/* Scalable SVG Background with Organic Outline, Shadow, and Decorative Dots */}
        <svg
          className="comic-bubble__svg"
          viewBox={`-8 -8 ${totalW + 16} ${totalH + 16}`}
          style={{ height: `${totalH}px` }}
          aria-hidden="true"
        >
          {/* Hand-inked underside shadow / stroke weight */}
          <path
            d={pathD}
            fill="none"
            stroke={borderColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            transform="translate(-4, 5)"
          />
          {/* Main bubble body fill and primary black outline */}
          <path
            d={pathD}
            fill={backgroundColor}
            stroke={borderColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Subtle perimeter dots */}
          {topDots.map((pt, idx) => (
            <circle
              key={`top-dot-${idx}`}
              cx={pt.x.toFixed(1)}
              cy={pt.y.toFixed(1)}
              r={dotRadius}
              fill={dotColor}
            />
          ))}
          {bottomDots.map((pt, idx) => (
            <circle
              key={`bot-dot-${idx}`}
              cx={pt.x.toFixed(1)}
              cy={pt.y.toFixed(1)}
              r={dotRadius}
              fill={dotColor}
            />
          ))}
          <circle
            cx={leftDot.x.toFixed(1)}
            cy={leftDot.y.toFixed(1)}
            r={dotRadius}
            fill={dotColor}
          />
          <circle
            cx={rightDot.x.toFixed(1)}
            cy={rightDot.y.toFixed(1)}
            r={dotRadius}
            fill={dotColor}
          />
        </svg>

        {/* Real Accessible HTML Content */}
        <Component
          ref={contentRef as React.Ref<any>}
          className="comic-bubble__content"
          {...restProps}
        >
          {children}
        </Component>
      </div>
    </div>
  );
};
