'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/data/projects';
import { ExternalLink, ArrowUpRight, FolderGit2, Check } from 'lucide-react';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const projectsListRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate Section Heading
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });

      // Animate Each Project Card & Image Clipping Mask
      const projectItems = projectsListRef.current?.querySelectorAll('.project-item');
      if (projectItems) {
        projectItems.forEach((item) => {
          const imgWrap = item.querySelector('.project-img-wrap');
          const content = item.querySelector('.project-content');

          if (imgWrap) {
            gsap.fromTo(
              imgWrap,
              { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
              {
                scrollTrigger: {
                  trigger: item,
                  start: 'top 75%',
                },
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                opacity: 1,
                duration: 1.2,
                ease: 'power3.inOut',
              }
            );
          }

          if (content) {
            gsap.from(content, {
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
              },
              y: 50,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full bg-black text-[#FFFBD4] py-24 md:py-36 px-6 md:px-12 selection:bg-[#A90E02] selection:text-[#FFFBD4] border-t border-[#1F1F1F]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#A90E02]" />
            <span className="font-mono-code text-xs font-bold tracking-widest text-[#A90E02] uppercase">
              [ 04 / WORKS ]
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest">
            FEATURED PRODUCTIONS
          </span>
        </div>

        {/* Section Heading */}
        <div ref={headingRef} className="mb-20 md:mb-28">
          <p className="font-mono-code text-xs tracking-widest text-[#A8A8A8] uppercase mb-4">
            // CURATED DEVELOPMENT SHOWCASE
          </p>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-[#FFFBD4] uppercase tracking-tight leading-[0.88]">
            SELECTED
            <br />
            <span className="text-[#A90E02]">WORKS.</span>
          </h2>
          <p className="mt-4 font-editorial text-sm md:text-base text-[#A8A8A8] max-w-xl">
            Real full-stack web applications and AI-driven platforms developed with modern
            paradigms, modular architectures, and clean codebases.
          </p>
        </div>

        {/* Project Entries List with Varied Layouts */}
        <div ref={projectsListRef} className="space-y-28 md:space-y-40">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="project-item relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Visual Preview Column (7 cols) */}
                <div
                  className={`project-img-wrap relative aspect-[16/10] w-full overflow-hidden bg-[#0F0F0F] border-2 border-[#222222] group ${
                    isEven ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7 lg:order-1'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} - Screenshot Preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle top bar overlay on preview */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-black/80 border-b border-[#222222] flex items-center justify-between font-mono-code text-[11px] text-[#A8A8A8]">
                    <span>// {project.category}</span>
                    <span className="text-[#A90E02] font-bold">{project.year}</span>
                  </div>

                  {/* Corner Accent Box */}
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#A90E02]" />
                </div>

                {/* Content & Details Column (5 cols) */}
                <div
                  className={`project-content flex flex-col justify-center ${
                    isEven ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'
                  }`}
                >
                  {/* Number & Category */}
                  <div className="flex items-center gap-3 mb-4 font-mono-code text-xs text-[#A8A8A8]">
                    <span className="text-[#A90E02] font-bold text-lg">
                      {project.number}
                    </span>
                    <span>/</span>
                    <span className="uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#FFFBD4] uppercase tracking-wide leading-none mb-3">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-mono-code text-xs text-[#A90E02] uppercase tracking-wider mb-5">
                    {project.tagline}
                  </p>

                  {/* Overview */}
                  <p className="font-editorial text-sm md:text-base text-[#A8A8A8] leading-relaxed mb-6">
                    {project.overview}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2 mb-8 border-l border-[#262626] pl-4">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#A90E02] shrink-0 mt-1" />
                        <span className="font-editorial text-xs text-[#FFFBD4]/90">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#121212] border border-[#262626] font-mono-code text-[11px] text-[#FFFBD4] tracking-wider uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-wider font-bold hover:bg-[#850b02] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 border border-[#333333] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-wider hover:border-[#A90E02] hover:text-[#A90E02] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
