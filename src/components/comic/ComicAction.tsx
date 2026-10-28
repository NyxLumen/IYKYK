import React from 'react';
import './ComicAction.css';

export type ComicActionSize = 'small' | 'medium' | 'large';
export type ComicActionVariant = 'yellow' | 'purple' | 'green' | 'cream';

export interface ComicActionVariantColors {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  patternColor: string;
}

/** Predefined canonical color palettes for rapid themed usage */
export const COMIC_ACTION_VARIANTS: Record<ComicActionVariant, ComicActionVariantColors> = {
  yellow: {
    backgroundColor: '#FFD629',
    textColor: '#0B0B0B',
    borderColor: '#0B0B0B',
    shadowColor: '#0B0B0B',
    patternColor: '#D5A817',
  },
  purple: {
    backgroundColor: '#7A3BFF',
    textColor: '#FFFFFF',
    borderColor: '#0B0B0B',
    shadowColor: '#0B0B0B',
    patternColor: '#A87BFF',
  },
  green: {
    backgroundColor: '#39EF88',
    textColor: '#0B0B0B',
    borderColor: '#0B0B0B',
    shadowColor: '#0B0B0B',
    patternColor: '#1EB85F',
  },
  cream: {
    backgroundColor: '#EDE4D9',
    textColor: '#0B0B0B',
    borderColor: '#0B0B0B',
    shadowColor: '#0B0B0B',
    patternColor: '#B8A99A',
  },
};

export interface ComicActionProps extends React.HTMLAttributes<HTMLElement> {
  /** Text or React children rendered within the action panel */
  children?: React.ReactNode;
  /** Direct text property */
  text?: string;
  /** Text transform override */
  textTransform?: React.CSSProperties['textTransform'];
  /** Size preset: 'small' | 'medium' | 'large' (default: 'medium') */
  size?: ComicActionSize;
  /** Named visual color variant (default: 'yellow') */
  variant?: ComicActionVariant;
  /** Main panel background color (overrides variant) */
  backgroundColor?: string;
  /** Lettering text color (overrides variant) */
  textColor?: string;
  /** Outline border color (overrides variant) */
  borderColor?: string;
  /** Offset shadow color (overrides variant) */
  shadowColor?: string;
  /** Halftone Ben-Day dot pattern color (overrides variant) */
  patternColor?: string;
  /** Slight imperfect rotation angle in degrees (default: 0) */
  rotation?: number;
  /** Semantic HTML element to render (default: 'div') */
  as?: 'div' | 'span' | 'button' | 'a';
  /** Additional custom class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * ComicAction is a reusable comic-book panel component featuring:
 * - A bold, hard-offset black shadow shifted to the bottom-left
 * - A dynamic Ben-Day halftone dot pattern that derives its color from CSS custom properties
 * - Configurable size presets and typography
 * - Real accessible HTML text with responsive auto-wrapping
 */
export const ComicAction: React.FC<ComicActionProps> = ({
  children,
  text,
  textTransform,
  size = 'medium',
  variant = 'yellow',
  backgroundColor,
  textColor,
  borderColor,
  shadowColor,
  patternColor,
  rotation = 0,
  as: Component = 'div',
  className = '',
  style = {},
  ...restProps
}) => {
  const activeVariant = COMIC_ACTION_VARIANTS[variant] || COMIC_ACTION_VARIANTS.yellow;

  const resolvedBg = backgroundColor || activeVariant.backgroundColor;
  const resolvedText = textColor || activeVariant.textColor;
  const resolvedBorder = borderColor || activeVariant.borderColor;
  const resolvedShadow = shadowColor || activeVariant.shadowColor;
  const resolvedPattern = patternColor || activeVariant.patternColor;

  const dynamicStyles: React.CSSProperties = {
    ['--comic-action-bg' as string]: resolvedBg,
    ['--comic-action-text' as string]: resolvedText,
    ['--comic-action-border' as string]: resolvedBorder,
    ['--comic-action-shadow' as string]: resolvedShadow,
    ['--comic-action-pattern' as string]: resolvedPattern,
    ['--comic-action-rotation' as string]: `${rotation}deg`,
    ...(textTransform ? { ['--comic-action-text-transform' as string]: textTransform } : {}),
    ...style,
  };

  return (
    <div
      className={`comic-action-wrapper pop-art-label ${className}`.trim()}
      data-comic-component="pop-art-label"
    >
      <Component
        className={`comic-action__panel comic-action--${size} label-face`}
        data-layer="label-face"
        style={dynamicStyles}
        {...restProps}
      >
        <span
          className="comic-action__content label-text"
          data-layer="label-text"
        >
          {text ?? children}
        </span>
      </Component>
    </div>
  );
};

/**
 * Reusable Pop Art Label component alias matching design specification
 */
export const PopArtLabel = ComicAction;
export type PopArtLabelProps = ComicActionProps;
