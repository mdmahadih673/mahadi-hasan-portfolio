'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const portraitWrapperRef = useRef(null);
  const portraitImgRef = useRef(null);
  const metaTopRef = useRef(null);
  const metaBottomLeftRef = useRef(null);
  const metaBottomRightRef = useRef(null);
  const geoCircleRef = useRef(null);
  const geoBlockRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation: Name reveal through clipping mask
      const loadTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (prefersReducedMotion) {
        gsap.set(
          [
            titleLeftRef.current,
            titleRightRef.current,
            portraitWrapperRef.current,
            metaTopRef.current,
            metaBottomLeftRef.current,
            metaBottomRightRef.current,
            geoCircleRef.current,
            geoBlockRef.current,
          ],
          { opacity: 1, y: 0, clipPath: 'none' }
        );
        return;
      }

      // Initial state: Pure black, only title animates in
      gsap.set([titleLeftRef.current, titleRightRef.current], {
        y: 120,
        opacity: 0,
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      });

      gsap.set(portraitWrapperRef.current, {
        yPercent: 35,
        opacity: 0,
        scale: 0.92,
        clipPath: 'inset(100% 0% 0% 0%)',
      });

      gsap.set(
        [
          metaTopRef.current,
          metaBottomLeftRef.current,
          metaBottomRightRef.current,
          geoCircleRef.current,
          geoBlockRef.current,
        ],
        {
          opacity: 0,
          y: 20,
        }
      );

      // Reveal title on load
      loadTl
        .to([titleLeftRef.current, titleRightRef.current], {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.4,
          stagger: 0.15,
          delay: 0.2,
        })
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );

      // 2. Scroll-Driven Timeline with Pinning & Scrubbing
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Scrubbed sequence:
      // A. Hide initial small scroll prompt
      scrollTl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.2 }, 0);

      // B. Reveal the portrait from the bottom with clip-mask & scale
      scrollTl.to(
        portraitWrapperRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        0.1
      );

      // C. Reveal background geometric red accents
      scrollTl.to(
        [geoCircleRef.current, geoBlockRef.current],
        {
          opacity: 0.8,
          scale: 1,
          duration: 1.0,
          ease: 'power2.out',
        },
        0.3
      );

      // D. Reveal editorial badges and intro bio
      scrollTl.to(
        [metaTopRef.current, metaBottomLeftRef.current, metaBottomRightRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
        },
        0.5
      );

      // E. Hold cinematic composition momentarily before release into About section
      scrollTl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Absolute container that stays centered during pin */}
      <div
        ref={heroContentRef}
        className="relative w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-between py-8 md:py-12"
      >
        {/* TOP EDITORIAL METADATA BAR (Reveals on scroll) */}
        <div
          ref={metaTopRef}
          className="w-full flex items-center justify-between z-30 pt-12 md:pt-4 pointer-events-none"
        >
          {/* Top Left: Developer Name */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#A90E02]" />
            <span className="font-mono-code text-[11px] md:text-xs text-[#FFFBD4] tracking-widest uppercase font-semibold">
              MAHADI HASAN
            </span>
          </div>

          {/* Top Right: Role Tag */}
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-[11px] md:text-xs text-[#A8A8A8] tracking-widest uppercase font-semibold">
              MERN STACK DEVELOPER
            </span>
            <span className="w-6 h-[2px] bg-[#A90E02]" />
          </div>
        </div>

        {/* CENTER STAGE: ENORMOUS NAME + GEOMETRIC ACCENTS + PORTRAIT LAYER */}
        <div className="relative w-full flex-grow flex items-center justify-center my-auto">
          {/* Geometric Accents (behind portrait, layered with typography) */}
          <div
            ref={geoCircleRef}
            className="absolute z-0 w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border border-[#A90E02]/60 pointer-events-none transition-none"
            style={{ transform: 'scale(0.85)' }}
          />

          <div
            ref={geoBlockRef}
            className="absolute z-0 left-[8%] md:left-[22%] bottom-[12%] w-12 md:w-20 h-28 md:h-44 bg-[#A90E02] pointer-events-none"
          />

          {/* ENORMOUS TYPOGRAPHIC COMPOSITION: "MAHADI HASAN" */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-0 md:gap-8 px-2 md:px-6 pointer-events-none">
            {/* Left word: MAHADI */}
            <h1
              ref={titleLeftRef}
              className="font-display text-[#A90E02] text-[18vw] md:text-[14.5vw] lg:text-[15vw] leading-[0.8] tracking-tight uppercase select-none text-center md:text-left flex-1"
            >
              MAHADI
            </h1>

            {/* Right word: HASAN */}
            <h1
              ref={titleRightRef}
              className="font-display text-[#A90E02] text-[18vw] md:text-[14.5vw] lg:text-[15vw] leading-[0.8] tracking-tight uppercase select-none text-center md:text-right flex-1"
            >
              HASAN
            </h1>
          </div>

          {/* DEVELOPER PORTRAIT (Layered in front of the name: z-20) */}
          <div
            ref={portraitWrapperRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[300px] sm:w-[380px] md:w-[480px] lg:w-[560px] h-auto max-h-[82vh] flex items-end justify-center pointer-events-none"
          >
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Developer real portrait cutout */}
              <Image
                ref={portraitImgRef}
                src="/images/profile.png"
                alt="Mahadi Hasan - MERN Stack Developer Portrait"
                width={524}
                height={545}
                priority
                className="w-auto max-h-[75vh] object-contain drop-shadow-2xl"
              />
              {/* Bottom blending block to guarantee 100% natural blend to black (#000000) */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-black" />
            </div>
          </div>
        </div>

        {/* BOTTOM EDITORIAL METADATA BAR */}
        <div className="w-full flex flex-col md:flex-row items-end md:items-center justify-between gap-6 z-30 pointer-events-none pb-2">
          {/* Bottom Left: Bio statement & CV Action */}
          <div
            ref={metaBottomLeftRef}
            className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-md text-left pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <span className="w-[2px] h-10 bg-[#A90E02] shrink-0 mt-0.5" />
              <p className="font-editorial text-xs md:text-sm text-[#FFFBD4] leading-relaxed">
                I build modern, fast and responsive web applications with clean code
                and great user experiences.
              </p>
            </div>
            <a
              href="/Mahadi_Hasan_MERN_Resume.pdf"
              download="Mahadi_Hasan_MERN_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-40 pointer-events-auto cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-[11px] uppercase tracking-wider font-bold hover:bg-[#850b02] transition-colors shrink-0 shadow-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get CV</span>
            </a>
          </div>

          {/* Initial Small Scroll Prompt (fades away as soon as user begins scrolling) */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono-code text-[10px] tracking-widest text-[#A8A8A8] uppercase"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="w-3 h-5 border border-[#FFFBD4]/40 flex items-start justify-center p-0.5">
              <div className="w-1 h-1.5 bg-[#A90E02] animate-bounce" />
            </div>
          </div>

          {/* Bottom Right: Section Indicator & Scroll Prompt */}
          <div
            ref={metaBottomRightRef}
            className="flex flex-col items-end gap-1 font-mono-code"
          >
            <span className="text-xs text-[#A90E02] font-bold">01</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest text-[#FFFBD4] uppercase">
                SCROLL DOWN
              </span>
              <div className="w-3 h-3 rounded-full border border-[#FFFBD4] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#A90E02] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
