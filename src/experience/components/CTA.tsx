import React from 'react';

export interface CTAProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * CTA renders the final brand action button (design.md Sec 23, architecture.md Sec 32).
 * Styled with Acid Green (#39EF88) high-contrast punch and accessible tap target (min 44x44px).
 */
export const CTA: React.FC<CTAProps> = ({
  label = 'KNOW MORE →',
  href = '#',
  onClick,
  className = '',
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '48px',
    padding: '0.75rem 2rem',
    backgroundColor: 'var(--color-green)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-lg)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '4px 4px 0px #000000, 0 0 20px var(--color-green-glow)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    textDecoration: 'none',
    zIndex: 'var(--z-cta)',
  };

  return (
    <a
      href={href}
      role="button"
      className={`brand-cta ${className}`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      style={baseStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = '6px 6px 0px #000000, 0 0 30px var(--color-green-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
        e.currentTarget.style.boxShadow = '4px 4px 0px #000000, 0 0 20px var(--color-green-glow)';
      }}
    >
      {label}
    </a>
  );
};
