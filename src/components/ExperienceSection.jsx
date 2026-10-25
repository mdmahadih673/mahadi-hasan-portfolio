'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '@/data/experience';
import { Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      const items = timelineRef.current?.querySelectorAll('.timeline-node');
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-[#FFFBD4] py-24 md:py-36 px-6 md:px-12 selection:bg-[#A90E02] selection:text-[#FFFBD4] border-t border-[#1F1F1F]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#A90E02]" />
            <span className="font-mono-code text-xs font-bold tracking-widest text-[#A90E02] uppercase">
              [ 05 / JOURNEY ]
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest">
            ENGINEERING TIMELINE
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <p className="font-mono-code text-xs tracking-widest text-[#A8A8A8] uppercase mb-4">
            // DELIBERATE PRACTICE &amp; PROGRESSION
          </p>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-[#FFFBD4] uppercase tracking-tight leading-[0.9]">
            ENGINEERING JOURNEY &amp;
            <br />
            <span className="text-[#A90E02]">TECHNICAL MILESTONES</span>
          </h2>
          <p className="mt-4 font-editorial text-sm md:text-base text-[#A8A8A8] max-w-xl">
            A transparent log of development milestones, personal projects, architectural
            deep-dives, and full-stack progression.
          </p>
        </div>

        {/* Vertical Editorial Timeline */}
        <div ref={timelineRef} className="relative pl-6 md:pl-12 border-l-2 border-[#262626] space-y-16">
          {experienceData.map((node) => (
            <div
              key={node.phase}
              className="timeline-node relative pl-6 md:pl-10 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 bg-black border-2 border-[#A90E02] flex items-center justify-center transition-colors group-hover:bg-[#A90E02]">
                <div className="w-1.5 h-1.5 bg-[#FFFBD4]" />
              </div>

              {/* Period & Phase Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-2 font-mono-code text-xs">
                <span className="px-2.5 py-1 bg-[#141414] border border-[#2B2B2B] text-[#A90E02] font-bold">
                  {node.period}
                </span>
                <span className="text-[#A8A8A8] uppercase tracking-widest">
                  // {node.context}
                </span>
              </div>

              {/* Title & Role */}
              <h3 className="font-display text-3xl sm:text-4xl text-[#FFFBD4] uppercase tracking-wide mt-2 mb-1 group-hover:text-[#A90E02] transition-colors">
                {node.title}
              </h3>
              <p className="font-mono-code text-xs text-[#A8A8A8] uppercase tracking-wider mb-4">
                FOCUS: {node.role}
              </p>

              {/* Description */}
              <p className="font-editorial text-sm md:text-base text-[#A8A8A8] max-w-3xl leading-relaxed mb-6">
                {node.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
                {node.highlights.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3 bg-[#111111] border border-[#1F1F1F] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A90E02] shrink-0 mt-0.5" />
                    <span className="font-editorial text-xs text-[#FFFBD4]/90 leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
