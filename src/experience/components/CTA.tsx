import React from 'react';

export interface CTAProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  accentColor?: 'green' | 'purple';
}

/**
 * Editorial CTA Control (Task 04A: IYKYK Editorial CTA & Footer).
 * Inspired by high-contrast editorial poster reference:
 * - Pill-shaped outlined label with warm-paper border (#EDE4D9)
 * - Ink-black tactile pill background (#0B0B0B)
 * - Separate circular arrow element attached on the right
 * - High-impact Acid Green (#39EF88) or Electric Purple (#7A3BFF) circle accent
 * - Fully accessible keyboard focus and reduced-motion compliant
 */
export const CTA: React.FC<CTAProps> = ({
  label = 'KNOW MORE',
  href = '#',
  onClick,
  className = '',
  accentColor = 'green',
}) => {
  // Strip any trailing arrows if already present in the string
  const cleanLabel = label.replace(/[→\->\s]+$/, '').trim();

  return (
    <a
      href={href}
      role="button"
      tabIndex={0}
      aria-label={label}
      className={`brand-cta-pill brand-cta-pill--${accentColor} ${className}`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className="brand-cta-pill-label">{cleanLabel}</span>
      <span className="brand-cta-pill-circle" aria-hidden="true">
        <svg
          className="brand-cta-pill-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  );
};
