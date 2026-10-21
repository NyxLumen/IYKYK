import React from 'react';
import { CompositionMode } from '../data/types';
import { ResponsiveFrame, FrameTransform } from '@/components/ResponsiveFrame';

export interface CompositionProps {
  mode: CompositionMode;
  mobile?: FrameTransform;
  desktop?: FrameTransform;
  children: React.ReactNode;
  className?: string;
}

/**
 * Composition manages layout modes (fixed, crop, layered) and responsive artwork framing (architecture.md Sec 08).
 */
export const Composition: React.FC<CompositionProps> = ({
  mode,
  mobile,
  desktop,
  children,
  className = '',
}) => {
  return (
    <div className={`scene-composition mode-${mode} ${className}`} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ResponsiveFrame
        mobile={mobile}
        desktop={desktop}
        overflow={mode === 'crop' ? 'hidden' : 'visible'}
      >
        <div
          className="composition-content"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </ResponsiveFrame>
    </div>
  );
};
