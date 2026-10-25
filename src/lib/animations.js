import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Standard clipping mask text reveal animation
 * @param {HTMLElement|string} target 
 * @param {Object} options 
 */
export function revealTextWithClipMask(target, options = {}) {
  const { delay = 0, duration = 1.2, stagger = 0.05 } = options;
  return gsap.fromTo(
    target,
    {
      y: 80,
      opacity: 0,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    },
    {
      y: 0,
      opacity: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    }
  );
}

/**
 * Image clipping mask reveal on scroll
 * @param {HTMLElement|string} target 
 * @param {HTMLElement|string} trigger 
 */
export function revealImageOnScroll(target, trigger) {
  return gsap.fromTo(
    target,
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: trigger || target,
        start: 'top 80%',
      },
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      duration: 1.2,
      ease: 'power3.inOut',
    }
  );
}

/**
 * Check if the browser environment has prefers-reduced-motion set
 */
export function isReducedMotionPreferred() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
