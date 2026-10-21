import React, { CSSProperties } from 'react';

export interface FrameTransform {
  scale?: number;
  x?: number | string; // pixels or percentage e.g. -12, "-5%"
  y?: number | string;
  rotation?: number;
  origin?: string;
}

export interface ResponsiveFrameProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  mobile?: FrameTransform;
  desktop?: FrameTransform;
  aspectRatio?: '9/16' | '16/9' | 'auto';
  overflow?: 'hidden' | 'visible';
}

/**
 * ResponsiveFrame implements oversized artwork viewport cropping (design.md Sec 10, architecture.md Sec 13-14).
 * Mobile focuses tightly on character/action; Desktop reveals wider context.
 */
export const ResponsiveFrame: React.FC<ResponsiveFrameProps> = ({
  children,
  className = '',
  style = {},
  mobile = { scale: 1, x: 0, y: 0, rotation: 0 },
  desktop = { scale: 1, x: 0, y: 0, rotation: 0 },
  overflow = 'hidden',
}) => {
  return (
    <div
      className={`responsive-frame ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow,
        ...style,
      }}
    >
      <div
        className="responsive-frame-content"
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: mobile.origin || desktop.origin || 'center center',
          transition: 'transform 0.4s var(--ease-editorial)',
          transform: `translate(${mobile.x || 0}px, ${mobile.y || 0}px) scale(${mobile.scale ?? 1}) rotate(${mobile.rotation || 0}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
