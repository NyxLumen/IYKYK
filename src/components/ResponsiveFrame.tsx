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
  const frameStyle: React.CSSProperties = {
    '--rf-mob-x': typeof mobile.x === 'number' ? `${mobile.x}px` : (mobile.x || '0px'),
    '--rf-mob-y': typeof mobile.y === 'number' ? `${mobile.y}px` : (mobile.y || '0px'),
    '--rf-mob-scale': mobile.scale ?? 1,
    '--rf-mob-rot': `${mobile.rotation || 0}deg`,
    '--rf-mob-origin': mobile.origin || 'center center',

    '--rf-desk-x': typeof desktop.x === 'number' ? `${desktop.x}px` : (desktop.x || '0px'),
    '--rf-desk-y': typeof desktop.y === 'number' ? `${desktop.y}px` : (desktop.y || '0px'),
    '--rf-desk-scale': desktop.scale ?? 1,
    '--rf-desk-rot': `${desktop.rotation || 0}deg`,
    '--rf-desk-origin': desktop.origin || 'center center',
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`responsive-frame ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow,
        ...frameStyle,
      }}
    >
      <div className="responsive-frame-content">
        {children}
      </div>
    </div>
  );
};
