import React from 'react';
import { LayerConfig } from '../data/types';

interface LayerProps {
  layer: LayerConfig;
  children?: React.ReactNode;
}

/**
 * Layer renders an addressable DOM tier within the 8-tier visual hierarchy stack (architecture.md Section 10).
 * Uses placeholder styling in Phase 2 with explicit labels for structural verification.
 */
export const Layer: React.FC<LayerProps> = ({ layer, children }) => {
  const zIndex = layer.zIndex ?? 10;
  const opacity = layer.opacity ?? 1;

  return (
    <div
      id={layer.id}
      data-layer-type={layer.type}
      className={`scene-layer layer-${layer.type} ${layer.className || ''}`}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex,
        opacity,
        pointerEvents: layer.type === 'cta' ? 'auto' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children || (
        <div
          className="layer-placeholder-indicator"
          style={{
            padding: 'var(--space-xs) var(--space-sm)',
            background: 'rgba(11, 11, 11, 0.75)',
            border: '1px dashed rgba(237, 228, 217, 0.3)',
            borderRadius: '2px',
            color: 'var(--color-paper-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          [{layer.type.toUpperCase()}]: {layer.label || layer.id}
        </div>
      )}
    </div>
  );
};
