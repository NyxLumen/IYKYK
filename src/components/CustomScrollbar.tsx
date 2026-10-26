import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAnimation } from '@/app/providers/AnimationProvider';

export interface CustomScrollbarProps {
  className?: string;
  minThumbLength?: number;
  autoHide?: boolean;
  autoHideDelay?: number;
}

/**
 * CustomScrollbar provides a sleek, interactive, thin & elongated purple scrollbar
 * that integrates with the Lenis smooth-scroll engine and replaces default browser scrollbars.
 *
 * Characteristics:
 * - Profile: Thin (6px, expands to 8px on hover)
 * - Thumb Length: Elongated (minimum 96px)
 * - Color: var(--color-purple) (#7a3bff) with atmospheric glow
 * - Drag, click-to-jump, and keyboard accessible
 */
export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  className = '',
  minThumbLength = 96,
  autoHide = false,
  autoHideDelay = 2000,
}) => {
  const { lenis } = useAnimation();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const [thumbHeight, setThumbHeight] = useState<number>(minThumbLength);
  const [thumbTop, setThumbTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const hideTimeoutRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ clientY: number; startScroll: number }>({ clientY: 0, startScroll: 0 });

  // Add html class to hide default browser scrollbar while this custom scrollbar is active
  useEffect(() => {
    document.documentElement.classList.add('has-custom-scrollbar');
    return () => {
      document.documentElement.classList.remove('has-custom-scrollbar');
    };
  }, []);

  // Update thumb dimensions and position based on current scroll state
  const updateScrollbar = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);
    const currentScroll = window.scrollY || window.pageYOffset || 0;

    // Calculate proportional thumb height with responsive minimum length (thinner/proportional on mobile)
    const isMobile = window.innerWidth <= 768;
    const effectiveMinLength = isMobile ? Math.min(minThumbLength, 60) : minThumbLength;

    const calculatedThumbHeight = Math.max(
      effectiveMinLength,
      Math.min(clientHeight * 0.4, (clientHeight / scrollHeight) * clientHeight)
    );
    setThumbHeight(calculatedThumbHeight);

    // Calculate thumb offset within the viewport track
    const availableTrack = Math.max(1, clientHeight - calculatedThumbHeight);
    const currentProgress = Math.min(1, Math.max(0, currentScroll / maxScroll));
    const currentTop = currentProgress * availableTrack;

    setThumbTop(currentTop);
    setProgress(currentProgress);

    if (autoHide && !isDraggingRef.current) {
      setIsVisible(true);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        if (!isDraggingRef.current) {
          setIsVisible(false);
        }
      }, autoHideDelay);
    }
  }, [minThumbLength, autoHide, autoHideDelay]);

  // Hook into Lenis scroll and native window events
  useEffect(() => {
    updateScrollbar();

    const handleNativeScroll = () => {
      if (!isDraggingRef.current) {
        updateScrollbar();
      }
    };

    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', updateScrollbar, { passive: true });

    if (lenis) {
      lenis.on('scroll', updateScrollbar);
    }

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', updateScrollbar);
      if (lenis) {
        lenis.off('scroll', updateScrollbar);
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [lenis, updateScrollbar]);

  // Handle pointer down on thumb (start drag)
  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    setIsVisible(true);

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    const currentScroll = window.scrollY || window.pageYOffset || 0;
    dragStartRef.current = {
      clientY: e.clientY,
      startScroll: currentScroll,
    };
  };

  // Handle pointer move (dragging thumb)
  const handleThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);
    const availableTrack = Math.max(1, clientHeight - thumbHeight);

    const deltaY = e.clientY - dragStartRef.current.clientY;
    const scrollDelta = (deltaY / availableTrack) * maxScroll;
    const targetScroll = Math.min(maxScroll, Math.max(0, dragStartRef.current.startScroll + scrollDelta));

    if (lenis) {
      lenis.scrollTo(targetScroll, { immediate: true });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'auto' });
    }

    updateScrollbar();
  };

  // Handle pointer up (end drag)
  const handleThumbPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Element may have unmounted
      }
      updateScrollbar();
    }
  };

  // Handle clicking track to jump to position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === thumbRef.current) return;

    const trackRect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);

    // Center thumb on clicked position
    const targetThumbCenter = clickY;
    const availableTrack = Math.max(1, clientHeight - thumbHeight);
    const targetTop = Math.min(availableTrack, Math.max(0, targetThumbCenter - thumbHeight / 2));
    const targetScroll = (targetTop / availableTrack) * maxScroll;

    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 80;
    const pageStep = window.innerHeight * 0.8;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const maxScroll = Math.max(1, scrollHeight - window.innerHeight);
    const currentScroll = window.scrollY || 0;

    let targetScroll = currentScroll;

    if (e.key === 'ArrowDown') {
      targetScroll = Math.min(maxScroll, currentScroll + step);
    } else if (e.key === 'ArrowUp') {
      targetScroll = Math.max(0, currentScroll - step);
    } else if (e.key === 'PageDown' || e.key === ' ') {
      targetScroll = Math.min(maxScroll, currentScroll + pageStep);
    } else if (e.key === 'PageUp') {
      targetScroll = Math.max(0, currentScroll - pageStep);
    } else if (e.key === 'Home') {
      targetScroll = 0;
    } else if (e.key === 'End') {
      targetScroll = maxScroll;
    } else {
      return;
    }

    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.4 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <aside
      className={`custom-scrollbar-overlay ${!isVisible ? 'is-hidden' : ''} ${className}`}
      aria-hidden={!isVisible}
    >
      <div
        ref={trackRef}
        className="custom-scrollbar-track"
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="presentation"
      >
        <div
          ref={thumbRef}
          className={`custom-scrollbar-thumb ${isDragging ? 'is-dragging' : ''} ${isHovered ? 'is-hovered' : ''}`}
          style={{
            height: `${thumbHeight}px`,
            transform: `translate3d(0, ${thumbTop}px, 0)`,
          }}
          onPointerDown={handleThumbPointerDown}
          onPointerMove={handleThumbPointerMove}
          onPointerUp={handleThumbPointerUp}
          onPointerCancel={handleThumbPointerUp}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="scrollbar"
          aria-controls="main-content"
          aria-orientation="vertical"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll position"
        />
      </div>
    </aside>
  );
};
