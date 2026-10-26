'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

function revealNavigation() {
  window.__mahadiHeroReady = true;
  window.dispatchEvent(new Event('hero:ready'));
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const portraitRef = useRef(null);
  const introRef = useRef(null);
  const detailsRef = useRef(null);
  const controlsRef = useRef(null);
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let context;

    context = gsap.context(() => {
      gsap.set(nameRef.current, { autoAlpha: 1, scale: reducedMotion ? 1 : 0.84 });
      gsap.set(portraitRef.current, reducedMotion
        ? { autoAlpha: 0 }
        : { autoAlpha: 0, clipPath: 'inset(100% 0 0 0)', y: 35, scale: 1.04 });
      gsap.set([introRef.current, detailsRef.current, controlsRef.current, footerRef.current], reducedMotion
        ? { autoAlpha: 0 }
        : { autoAlpha: 0, y: 24, clipPath: 'inset(0 0 100% 0)' });

      const transition = gsap.timeline({
        defaults: { ease: reducedMotion ? 'none' : 'power1.inOut' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1700',
          pin: true,
          scrub: reducedMotion ? true : 0.7,
          anticipatePin: 1,
          onLeave: revealNavigation,
          onUpdate: (self) => {
            if (self.progress > 0.58 && !window.__mahadiHeroReady) revealNavigation();
            if (self.progress <= 0.58 && window.__mahadiHeroReady) {
              window.__mahadiHeroReady = false;
              window.dispatchEvent(new Event('hero:reset'));
            }
          },
          onLeaveBack: () => {
            window.__mahadiHeroReady = false;
            window.dispatchEvent(new Event('hero:reset'));
          },
        },
      });

      transition
        .to(nameRef.current, reducedMotion ? { duration: 0.8 } : { scale: 1, duration: 0.8 }, 0)
        .to(portraitRef.current, reducedMotion
          ? { autoAlpha: 1, duration: 1.15 }
          : { autoAlpha: 1, clipPath: 'inset(0 0 0 0)', y: 0, scale: 1, duration: 1.15 }, 0.38)
        .to(nameRef.current, reducedMotion ? { duration: 1 } : { scale: 1.02, yPercent: -4, duration: 1 }, 0.72)
        .to(introRef.current, reducedMotion ? { autoAlpha: 1, duration: 0.85 } : { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 0.85 }, 1.02)
        .to(detailsRef.current, reducedMotion ? { autoAlpha: 1, duration: 0.75 } : { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 0.75 }, 1.34)
        .to(controlsRef.current, reducedMotion ? { autoAlpha: 1, duration: 0.75 } : { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 0.75 }, 1.55)
        .to(footerRef.current, reducedMotion ? { autoAlpha: 1, duration: 0.65 } : { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 0.65 }, 1.8);

      const portrait = portraitRef.current?.querySelector('img');
      const refreshAfterImage = () => requestAnimationFrame(() => ScrollTrigger.refresh());
      if (portrait?.complete) refreshAfterImage();
      else portrait?.addEventListener('load', refreshAfterImage, { once: true });
    }, sectionRef);

    return () => context?.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative isolate h-[100svh] w-full overflow-hidden bg-[#090807] text-[#FFFBD4]">
      <div className="pointer-events-none absolute inset-4 z-40 border border-[#FFFBD4]/20 sm:inset-7" />

      <h1 ref={nameRef} className="pointer-events-none absolute left-1/2 top-[43%] z-10 w-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[clamp(3.3rem,17.2vw,18rem)] font-black leading-[0.78] tracking-[-0.055em] text-[#C61108] sm:top-[43%]">
        MAHADI HASAN
      </h1>

      <div ref={portraitRef} className="pointer-events-none absolute bottom-0 right-[-21vw] z-20 h-[88svh] w-[132vw] sm:right-[-17vw] sm:h-[100svh] sm:w-[112vw] lg:right-[-11vw] lg:w-[93vw]">
        <Image
          src="/images/mahadi-hero-cutout.png"
          alt="Portrait of Mahadi Hasan"
          fill
          preload
          sizes="(max-width: 640px) 132vw, 112vw"
          className="object-contain object-bottom"
        />
      </div>

      <div className="relative z-30 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-end px-7 pb-8 pt-24 sm:px-12 sm:pb-10 sm:pt-28 lg:px-20">
        <div className="relative z-30 mb-7 w-full sm:absolute sm:left-[7%] sm:top-[66%] sm:mb-0 sm:w-[min(31%,390px)] sm:-translate-y-1/2 lg:left-[8%] lg:top-[66%]">
          <div ref={introRef}>
            <p className="mb-3 flex items-center gap-3 font-mono-code text-[10px] font-bold tracking-[0.3em] text-[#FFFBD4]/85 sm:text-xs"><span className="h-px w-7 bg-[#C61108]" /> HI, I&apos;M</p>
            <p className="font-display text-lg tracking-[0.14em] text-[#FFFBD4] sm:text-xl">MERN STACK DEVELOPER</p>
            <p className="mt-3 max-w-[360px] font-editorial text-sm leading-relaxed text-[#FFFBD4]/80 sm:text-base">I build modern, responsive web applications with clean code and thoughtful user experiences.</p>
          </div>

          <div ref={detailsRef} className="mt-5 flex items-center gap-3 sm:mt-7">
            <span className="mr-1 h-8 w-[2px] bg-[#C61108]" />
            <a href="https://github.com/mdmahadih673" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub Profile" className="flex h-9 w-9 items-center justify-center border border-[#FFFBD4]/45 text-[#FFFBD4] transition-colors hover:border-[#C61108] hover:bg-[#C61108]"><GithubIcon className="h-4 w-4" /></a>
            <a href="https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn Profile" className="flex h-9 w-9 items-center justify-center border border-[#FFFBD4]/45 text-[#FFFBD4] transition-colors hover:border-[#C61108] hover:bg-[#C61108]"><LinkedinIcon className="h-4 w-4" /></a>
            <a href="mailto:mdmahadih673@gmail.com" aria-label="Email" title="Email Mahadi" className="flex h-9 w-9 items-center justify-center border border-[#FFFBD4]/45 text-[#FFFBD4] transition-colors hover:border-[#C61108] hover:bg-[#C61108]"><Mail className="h-4 w-4" /></a>
          </div>

          <div ref={controlsRef} className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
            <a href="#works" className="inline-flex items-center gap-2 bg-[#C61108] px-4 py-3 font-mono-code text-[10px] font-bold tracking-[0.09em] text-white transition-colors hover:bg-[#FFFBD4] hover:text-black sm:text-xs">VIEW MY WORK <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <a href="#contact" className="inline-flex items-center gap-2 border border-[#FFFBD4]/60 px-4 py-3 font-mono-code text-[10px] font-bold tracking-[0.09em] text-[#FFFBD4] transition-colors hover:border-[#C61108] hover:bg-[#C61108] sm:text-xs">CONTACT ME <ArrowDown className="h-3.5 w-3.5" /></a>
            <a href="/Mahadi_Hasan_MERN_Resume.pdf" download="Mahadi_Hasan_MERN_Resume.pdf" aria-label="Download CV" title="Download CV" className="inline-flex h-11 w-11 items-center justify-center border border-[#FFFBD4]/45 text-[#FFFBD4] transition-colors hover:border-[#C61108] hover:bg-[#C61108]"><Download className="h-4 w-4" /></a>
          </div>
        </div>

        <div ref={footerRef} className="pointer-events-none absolute bottom-8 left-7 z-30 hidden font-mono-code text-[9px] font-semibold tracking-[0.2em] text-[#FFFBD4]/65 sm:left-12 sm:block lg:left-20">DESIGN · DEVELOPMENT · EXPERIENCE</div>
        <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 right-8 z-30 hidden flex-col items-center gap-2 font-mono-code text-[9px] font-semibold tracking-[0.2em] text-[#FFFBD4]/80 sm:flex lg:right-16"><span>SCROLL</span><span className="h-8 w-px bg-[#FFFBD4]/70" /><ArrowDown className="h-3 w-3" /></a>
      </div>
    </section>
  );
}
