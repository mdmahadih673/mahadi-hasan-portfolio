'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Target, Compass, Mail, ArrowUpRight, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const photoCardRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal as section enters viewport
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from([bioRef.current, photoCardRef.current, detailsRef.current], {
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#FFFBD4] text-[#000000] py-24 md:py-36 px-6 md:px-12 selection:bg-[#A90E02] selection:text-[#FFFBD4]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b-2 border-black/15 pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#A90E02]" />
            <span className="font-mono-code text-xs font-bold tracking-widest text-[#A90E02] uppercase">
              [ 02 / ABOUT ]
            </span>
          </div>
          <span className="font-mono-code text-xs text-black/60 uppercase tracking-widest">
            ENGINEERING &amp; IDENTITY
          </span>
        </div>

        {/* Large Typographic Editorial Heading */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <p className="font-mono-code text-xs tracking-widest text-black/50 uppercase mb-4">
            // PHILOSOPHY &amp; APPROACH
          </p>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black leading-[0.88] uppercase tracking-tight">
            BUILDING DIGITAL
            <br />
            <span className="text-[#A90E02]">EXPERIENCES THAT</span>
            <br />
            MATTER.
          </h2>
        </div>

        {/* Asymmetric Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 Cols): Developer Portrait & Status Card */}
          <div ref={photoCardRef} className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative border-2 border-black bg-black p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <Image
                  src="/images/about-portrait.png"
                  alt="Mahadi Hasan - Editorial Portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Card Meta Bar */}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[#FFFBD4] font-mono-code text-xs">
                <span>PORTRAIT // 01</span>
                <span className="text-[#A90E02] font-bold">MAHADI HASAN</span>
              </div>
            </div>

            {/* Quick Metadata Pill */}
            <div className="border border-black/20 p-5 bg-white/40 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#A90E02] shrink-0" />
                <span className="font-mono-code text-xs text-black/80 font-bold uppercase tracking-wider">
                  LOCATION: Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-[#A90E02] shrink-0" />
                <span className="font-mono-code text-xs text-black/80 font-bold uppercase tracking-wider">
                  ROLE: AI-Driven MERN Engineer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#A90E02] shrink-0" />
                <span className="font-mono-code text-xs text-black/80 font-bold uppercase tracking-wider">
                  AVAILABILITY: Open for Full-Stack Roles
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Narrative, Focus & Socials */}
          <div ref={bioRef} className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-6 text-black/85 font-editorial text-lg md:text-xl leading-relaxed">
              <p className="font-bold text-2xl md:text-3xl text-black leading-snug">
                I am a passionate AI-Driven MERN Stack Developer dedicated to transforming ideas into
                clean, reliable, and high-performance digital products.
              </p>
              <p>
                My work centers on the intersection of robust backend engineering and
                deliberate, highly refined user interfaces. With hands-on expertise in
                MongoDB Atlas, Mongoose ODM, Express.js modular patterns, React, Node.js, and TypeScript—alongside
                Next.js App Router, BetterAuth security, and Stripe integrations—I build applications where
                structure, security, and performance operate in sync.
              </p>
              <p>
                I prioritize maintainable codebases, thoughtful typography, and seamless
                interactivity. Incorporating modern agentic workflows (Cursor AI, Antigravity, Claude Code),
                every interface is engineered to scale smoothly and deliver exceptional user experiences.
              </p>
            </div>

            {/* Editorial Focus Areas */}
            <div ref={detailsRef} className="pt-8 border-t-2 border-black/15">
              <h3 className="font-mono-code text-xs uppercase tracking-widest text-black/50 mb-6">
                // CORE AREAS OF SPECIALIZATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-l-2 border-[#A90E02] pl-4">
                  <h4 className="font-display text-2xl text-black uppercase mb-1">
                    MERN Web Apps
                  </h4>
                  <p className="text-sm text-black/75 leading-normal">
                    Production-quality full-stack architectures with modular API routes,
                    resilient MongoDB data persistence, and reactive React frontends.
                  </p>
                </div>

                <div className="border-l-2 border-[#A90E02] pl-4">
                  <h4 className="font-display text-2xl text-black uppercase mb-1">
                    Next.js Engineering
                  </h4>
                  <p className="text-sm text-black/75 leading-normal">
                    Server-side rendering, Server Components, caching &amp; ISR, optimized layouts, and
                    lightning-fast bundle delivery.
                  </p>
                </div>

                <div className="border-l-2 border-[#A90E02] pl-4">
                  <h4 className="font-display text-2xl text-black uppercase mb-1">
                    AI-Driven Workflows
                  </h4>
                  <p className="text-sm text-black/75 leading-normal">
                    Agentic development with Cursor, Antigravity, Claude Code, and local
                    LLM integration with Ollama for rapid full-stack delivery.
                  </p>
                </div>

                <div className="border-l-2 border-[#A90E02] pl-4">
                  <h4 className="font-display text-2xl text-black uppercase mb-1">
                    Editorial Aesthetics
                  </h4>
                  <p className="text-sm text-black/75 leading-normal">
                    Crafting memorable, cinematic visual identities without reliance on
                    generic templates or gratuitous gradients.
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Direct Contact Links + CV Download */}
            <div className="pt-8 border-t border-black/15 flex flex-wrap items-center gap-4">
              <a
                href="/Mahadi_Hasan_MERN_Resume.pdf"
                download="Mahadi_Hasan_MERN_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-wider font-bold hover:bg-[#880b02] transition-colors duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <a
                href="https://github.com/mdmahadih673"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-[#FFFBD4] font-mono-code text-xs uppercase tracking-wider hover:bg-[#A90E02] transition-colors duration-300"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-black text-black font-mono-code text-xs uppercase tracking-wider hover:bg-black hover:text-[#FFFBD4] transition-colors duration-300"
              >
                <LinkedinIcon className="w-4 h-4 text-[#A90E02]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="mailto:mdmahadih673@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-black text-black font-mono-code text-xs uppercase tracking-wider hover:bg-[#A90E02] hover:text-[#FFFBD4] hover:border-[#A90E02] transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
