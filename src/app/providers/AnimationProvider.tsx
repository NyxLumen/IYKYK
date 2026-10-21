import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationContextValue {
  lenis: Lenis | null;
  isReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  lenis: null,
  isReducedMotion: false,
});

export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: React.ReactNode;
}

/**
 * AnimationProvider orchestrates the Lenis smooth-scroll engine and GSAP ScrollTrigger ticker.
 * Single source of truth for smooth scroll & RAF lifecycle (architecture.md Sec 17 & 18).
 */
export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: motionQuery.matches ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !motionQuery.matches,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis RAF through GSAP's central ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ lenis: lenisInstance, isReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
};
