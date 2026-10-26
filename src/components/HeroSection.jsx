'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Mail, ArrowUpRight, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const nameWrapRef = useRef(null);
  const bgTextRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const roleRef = useRef(null);
  const introRef = useRef(null);
  const socialsRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollCueRef = useRef(null);
  const borderFrameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let ctx;

    const navbarEl = typeof document !== 'undefined' ? document.getElementById('main-navbar') : null;

    /* ── reduced motion: show complete hero immediately ── */
    if (prefersReducedMotion) {
      gsap.set(
        [
          portraitWrapRef.current,
          roleRef.current,
          introRef.current,
          socialsRef.current,
          actionsRef.current,
          scrollCueRef.current,
          borderFrameRef.current,
        ],
        { autoAlpha: 1, y: 0, x: 0, scale: 1 }
      );
      gsap.set(bgTextRef.current, { autoAlpha: 1, yPercent: -22, scale: 1 });
      if (navbarEl) gsap.set(navbarEl, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
      return;
    }

    ctx = gsap.context(() => {
      /* ━━━━━━━━━━━ INITIAL ELEMENT STATES ━━━━━━━━━━━ */
      // Non-name elements are completely hidden at start
      gsap.set(
        [
          portraitWrapRef.current,
          roleRef.current,
          introRef.current,
          socialsRef.current,
          actionsRef.current,
          scrollCueRef.current,
          borderFrameRef.current,
        ],
        { autoAlpha: 0 }
      );

      gsap.set(portraitWrapRef.current, {
        autoAlpha: 0,
        yPercent: 45,
        scale: 0.95,
      });
      gsap.set(roleRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(introRef.current, { autoAlpha: 0, x: -30 });
      gsap.set(socialsRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(actionsRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(scrollCueRef.current, { autoAlpha: 0, y: 15 });
      gsap.set(borderFrameRef.current, { autoAlpha: 0 });
      if (navbarEl) gsap.set(navbarEl, { autoAlpha: 0, y: -20, pointerEvents: 'none' });

      /* ━━━━━━━━━━━ PHASE 1: INITIAL PAGE LOAD ENTRANCE ━━━━━━━━━━━ */
      // Entrance animation for the giant red name ONLY.
      // Once it completes, it STOPS. It never auto-advances.
      gsap.fromTo(
        bgTextRef.current,
        { autoAlpha: 0, scale: 0.92, y: 25 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
        }
      );

      /* ━━━━━━━━━━━ PHASES 2 & 4: MANUAL SCROLL TIMELINE ━━━━━━━━━━━ */
      // Pinned scrub timeline driven 100% by the visitor's physical scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2500',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Reveal portrait from bottom and move upward in front of name
      tl.to(
        portraitWrapRef.current,
        {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          duration: 1.3,
          ease: 'power2.out',
        },
        0
      );

      // 2. Keep the large name visible and move it visually behind the head
      tl.to(
        bgTextRef.current,
        {
          yPercent: -22,
          scale: 1.02,
          duration: 1.3,
          ease: 'power2.out',
        },
        0
      );

      // 3. Gradually reveal the navigation bar
      if (navbarEl) {
        tl.to(
          navbarEl,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            onUpdate: function () {
              navbarEl.style.pointerEvents = this.progress() > 0.05 ? 'auto' : 'none';
            },
          },
          0.9
        );
      }

      // 4. Reveal decorative border frame
      tl.to(
        borderFrameRef.current,
        {
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.0
      );

      // 5. Reveal role badge
      tl.to(
        roleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        1.1
      );

      // 6. Reveal introduction text from left
      tl.to(
        introRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.2
      );

      // 7. Reveal social icons
      tl.to(
        socialsRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        1.35
      );

      // 8. Reveal action buttons
      tl.to(
        actionsRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        1.45
      );

      // 9. Reveal scroll cue
      tl.to(
        scrollCueRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        1.55
      );

      // 10. Brief holding window before unpinning cleanly into About section
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    // Refresh ScrollTrigger when portrait image loads
    const portraitImg = portraitWrapRef.current?.querySelector('img');
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    if (portraitImg?.complete) refresh();
    else portraitImg?.addEventListener('load', refresh, { once: true });

    return () => {
      portraitImg?.removeEventListener('load', refresh);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative isolate h-[100svh] w-full overflow-hidden bg-[#000000] text-[#FFFBD4]"
    >
      {/* ─── decorative border frame ─── */}
      <div
        ref={borderFrameRef}
        className="pointer-events-none absolute inset-4 z-40 border border-[#FFFBD4]/20 sm:inset-6 lg:inset-8"
        style={{ opacity: 0 }}
      />

      {/* ════════ LAYER 1 : oversized background name ════════ */}
      {/* Centered horizontally and vertically in initial state */}
      <div
        ref={nameWrapRef}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none px-4"
      >
        <h1
          ref={bgTextRef}
          aria-label="Mahadi Hasan"
          className="hero-bg-text font-display font-bold text-[#A90E02] tracking-[-0.02em] leading-none whitespace-nowrap text-center text-[clamp(3.5rem,13.5vw,18rem)] w-full"
        >
          MAHADI HASAN
        </h1>
      </div>

      {/* ════════ LAYER 2 : portrait ════════ */}
      {/* Positioned in front of the giant name (z-20 vs z-10) */}
      <div
        ref={portraitWrapRef}
        className="hero-portrait pointer-events-none absolute z-20 overflow-hidden
          right-[2%] bottom-0 h-[56svh] w-[78vw] min-h-[300px]
          sm:right-[2%] sm:h-[74svh] sm:w-[54vw]
          lg:right-[6%] lg:h-[88svh] lg:w-[46vw] lg:max-w-[680px]"
        style={{ opacity: 0 }}
      >
        <Image
          src="/images/profile.png"
          alt="Portrait of Mahadi Hasan"
          fill
          priority
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 56vw, 48vw"
          className="object-cover object-[center_18%]"
        />
      </div>

      {/* ════════ LAYER 3 : content overlay ════════ */}
      <div className="relative z-30 mx-auto flex h-[100svh] w-full max-w-[1600px] flex-col justify-between px-6 pb-6 pt-24 sm:px-10 sm:pb-10 sm:pt-28 lg:px-16 lg:pb-12 lg:pt-32">
        {/* ─── top row: role badge ─── */}
        <div
          ref={roleRef}
          className="flex items-center gap-3"
          style={{ opacity: 0 }}
        >
          <span className="h-px w-8 bg-[#FFFBD4]/60" />
          <span className="font-mono-code text-[10px] font-bold tracking-[0.3em] text-[#FFFBD4]/80 sm:text-xs">
            MERN STACK DEVELOPER
          </span>
        </div>

        {/* ─── middle: intro text (left side) ─── */}
        <div className="relative z-30 mt-auto pb-8 sm:pb-14 lg:pb-16">
          <div
            ref={introRef}
            className="max-w-[320px] sm:max-w-[360px] lg:max-w-[420px]"
            style={{ opacity: 0 }}
          >
            <p className="font-editorial text-sm leading-relaxed text-[#FFFBD4]/90 sm:text-base lg:text-lg">
              I build modern, responsive web applications with clean code and
              thoughtful user experiences.
            </p>

            {/* social icons */}
            <div
              ref={socialsRef}
              className="mt-5 flex items-center gap-3"
              style={{ opacity: 0 }}
            >
              <span className="mr-1 h-8 w-[2px] bg-[#FFFBD4]/40" />
              <a
                href="https://github.com/mdmahadih673"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub Profile"
                className="hero-social-icon flex h-9 w-9 items-center justify-center border border-[#FFFBD4]/30 text-[#FFFBD4] transition-all duration-300 hover:border-[#FFFBD4] hover:bg-[#FFFBD4] hover:text-[#000000]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
                className="hero-social-icon flex h-9 w-9 items-center justify-center border border-[#FFFBD4]/30 text-[#FFFBD4] transition-all duration-300 hover:border-[#FFFBD4] hover:bg-[#FFFBD4] hover:text-[#000000]"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:mdmahadih673@gmail.com"
                aria-label="Email"
                title="Email Mahadi"
                className="hero-social-icon flex h-9 w-9 items-center justify-center border border-[#FFFBD4]/30 text-[#FFFBD4] transition-all duration-300 hover:border-[#FFFBD4] hover:bg-[#FFFBD4] hover:text-[#000000]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── bottom row: actions + tagline ─── */}
        <div
          ref={actionsRef}
          className="relative z-40 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          style={{ opacity: 0 }}
        >
          <span className="font-mono-code text-[9px] font-semibold tracking-[0.18em] text-[#FFFBD4]/70 sm:text-[10px]">
            DESIGN · DEVELOPMENT · EXPERIENCE
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="/api/download-cv"
              download="Mahadi_Hasan_MERN_Resume.pdf"
              className="hero-btn inline-flex items-center gap-1.5 bg-[#A90E02] px-3 py-2.5 font-mono-code text-[9px] font-bold tracking-[0.06em] text-[#FFFBD4] transition-all duration-300 hover:bg-[#FFFBD4] hover:text-[#000000] sm:gap-2 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.1em]"
            >
              <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              DOWNLOAD CV
            </a>
            <a
              href="#works"
              className="hero-btn inline-flex items-center gap-1.5 border border-[#FFFBD4]/40 px-3 py-2.5 font-mono-code text-[9px] font-bold tracking-[0.06em] text-[#FFFBD4] transition-all duration-300 hover:border-[#FFFBD4] hover:bg-[#FFFBD4] hover:text-[#000000] sm:gap-2 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.1em]"
            >
              VIEW MY WORK
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </a>
          </div>
        </div>

        {/* ─── scroll cue (desktop) ─── */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-20 right-6 z-30 hidden flex-col items-center gap-2 font-mono-code text-[9px] font-semibold tracking-[0.18em] text-[#FFFBD4]/60 md:flex sm:right-10 lg:right-16 lg:bottom-24"
          style={{ opacity: 0 }}
        >
          <span>SCROLL</span>
          <span className="h-8 w-px bg-[#FFFBD4]/40" />
          <ArrowDown className="h-3 w-3 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
