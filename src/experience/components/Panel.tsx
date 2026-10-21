import React, { CSSProperties } from 'react';

export interface PanelProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  variant?: 'ink' | 'paper' | 'purple' | 'green';
  tape?: boolean;
  torn?: 'none' | 'top' | 'bottom' | 'both';
  rotation?: number;
}

/**
 * Panel renders a tangible collage snapshot / zine cut-out block (design.md Section 08).
 */
export const Panel: React.FC<PanelProps> = ({
  id,
  className = '',
  style = {},
  children,
  variant = 'ink',
  tape = false,
  torn = 'none',
  rotation = 0,
}) => {
  const variantClass = variant === 'paper' ? 'collage-panel-paper' : 'collage-panel';
  const tornClass =
    torn === 'top'
      ? 'torn-edge-top'
      : torn === 'bottom'
        ? 'torn-edge-bottom'
        : '';

  return (
    <div
      id={id}
      className={`panel-container ${variantClass} ${tornClass} ${className}`}
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        ...style,
      }}
    >
      {tape && <div className="tape-strip" style={{ top: -10, left: 20 }} aria-hidden="true" />}
      {children}
    </div>
  );
};
