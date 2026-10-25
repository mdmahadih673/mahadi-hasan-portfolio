'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Download, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function HeroSection() {
  const containerRef = useRef(null);
  const heroCardRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.7,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* Ambient background subtle lighting (no gradient, clean geometric framing) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[85vw] max-w-[1400px] h-[80vh] border border-[#222222]/40" />
      </div>

      {/* Main Hero Artwork & Composition Container */}
      <div
        ref={heroCardRef}
        className="relative w-full max-w-[1180px] mx-auto bg-black border border-[#1A1A1A] shadow-2xl overflow-hidden group"
      >
        {/* The Exact Cinematic Portrait & Typographic Artwork */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] max-h-[78vh] flex items-center justify-center bg-black">
          <Image
            src="/images/hero-reference-target.jpg"
            alt="Mahadi Hasan — MERN Stack Developer"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1180px"
            className="object-contain object-center"
          />

          {/* Interactive Clickable Hotspots mapped directly over the artwork's social icons */}
          <div className="absolute left-[3.2%] sm:left-[3.8%] bottom-[18%] sm:bottom-[20%] md:bottom-[22%] z-30 flex items-center gap-2 sm:gap-4">
            <a
              href="https://github.com/mdmahadih673"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-[#A90E02]/30 hover:scale-110 transition-all cursor-pointer"
              title="GitHub Profile (github.com/mdmahadih673)"
              aria-label="GitHub"
            />
            <a
              href="https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-[#A90E02]/30 hover:scale-110 transition-all cursor-pointer"
              title="LinkedIn Profile (md-mahadi-hasan)"
              aria-label="LinkedIn"
            />
            <a
              href="mailto:mdmahadih673@gmail.com"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-[#A90E02]/30 hover:scale-110 transition-all cursor-pointer"
              title="Email Mahadi (mdmahadih673@gmail.com)"
              aria-label="Email"
            />
          </div>

          {/* Interactive Clickable Hotspot mapped directly over the Scroll Down indicator */}
          <button
            onClick={handleScrollDown}
            className="absolute right-[4.5%] sm:right-[5.5%] bottom-[5%] sm:bottom-[7%] w-14 h-24 z-30 cursor-pointer hover:opacity-75 transition-opacity"
            title="Scroll Down"
            aria-label="Scroll to About section"
          />
        </div>
      </div>

      {/* Prominent High-Visibility CV Download Action Bar */}
      <div
        ref={ctaRef}
        className="w-full max-w-[1180px] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="w-2.5 h-2.5 bg-[#A90E02]" />
          <span className="font-mono-code text-xs text-[#FFFBD4] tracking-widest uppercase font-semibold">
            MAHADI HASAN // MERN STACK DEVELOPER
          </span>
          <span className="hidden md:inline font-mono-code text-xs text-[#A8A8A8]">
            • BANGLADESH
          </span>
        </div>

        {/* Dual Actions: Direct Download + Direct View in Browser */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Direct File Download */}
          <a
            href="/Mahadi_Hasan_MERN_Resume.pdf"
            download="Mahadi_Hasan_MERN_Resume.pdf"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-widest font-bold hover:bg-[#850b02] transition-colors duration-200 shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download CV (PDF)</span>
          </a>

          {/* View in Browser Tab */}
          <a
            href="/Mahadi_Hasan_MERN_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#333333] hover:border-[#A90E02] hover:text-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer"
          >
            <span>View CV</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
