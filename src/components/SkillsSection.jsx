'use client';

import { useState } from 'react';
import { skillsData } from '@/data/skills';
import {
  Layers,
  Server,
  Database,
  ShieldCheck,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Code2,
} from 'lucide-react';

const CATEGORY_ICONS = {
  '01': Layers,
  '02': Server,
  '03': Database,
  '04': ShieldCheck,
  '05': CreditCard,
  '06': Sparkles,
};

export default function SkillsSection() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filterTabs = [
    { label: 'ALL SKILLS', code: 'ALL' },
    { label: 'FRONTEND', code: '01' },
    { label: 'BACKEND', code: '02' },
    { label: 'DATABASE', code: '03' },
    { label: 'AUTH & SECURITY', code: '04' },
    { label: 'PAYMENTS', code: '05' },
    { label: 'AI & TOOLS', code: '06' },
  ];

  const displayedCategories =
    selectedFilter === 'ALL'
      ? skillsData
      : skillsData.filter((c) => c.code === selectedFilter);

  const totalSkillsCount = skillsData.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <section
      id="skills"
      className="relative w-full bg-black text-[#FFFBD4] py-24 md:py-36 px-6 md:px-12 selection:bg-[#A90E02] selection:text-[#FFFBD4] border-t border-[#1F1F1F]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#A90E02]" />
            <span className="font-mono-code text-xs font-bold tracking-widest text-[#A90E02] uppercase">
              [ 03 / SKILLS ]
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest">
            AI-DRIVEN MERN STACK &amp; CAPABILITIES
          </span>
        </div>

        {/* Heading */}
        <div className="mb-14">
          <p className="font-mono-code text-xs tracking-widest text-[#A8A8A8] uppercase mb-4">
            // FULL STACK PRODUCTION ARSENAL
          </p>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-[#FFFBD4] uppercase tracking-tight leading-[0.9]">
            TECHNICAL ARSENAL &amp;
            <br />
            <span className="text-[#A90E02]">SYSTEM CAPABILITIES</span>
          </h2>
          <p className="mt-4 font-editorial text-sm md:text-base text-[#A8A8A8] max-w-2xl">
            Derived directly from comprehensive AI-Driven Full Stack Web Engineering.
            Covering modern reactive frontends, modular MVC backends, MongoDB persistence,
            secure auth (BetterAuth, JWT, RBAC), payment gateways, and agentic AI tooling.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-[#202020]">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.code;
            return (
              <button
                key={tab.code}
                onClick={() => setSelectedFilter(tab.code)}
                className={`px-4 py-2 font-mono-code text-xs uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#A90E02] border-[#A90E02] text-[#FFFBD4] font-bold shadow-sm'
                    : 'bg-[#0E0E0E] border-[#262626] text-[#A8A8A8] hover:text-[#FFFBD4] hover:border-[#444444]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          <div className="ml-auto hidden sm:flex items-center gap-2 font-mono-code text-xs text-[#A8A8A8]">
            <Code2 className="w-3.5 h-3.5 text-[#A90E02]" />
            <span>TOTAL INDEXED: {totalSkillsCount} TECHNOLOGIES</span>
          </div>
        </div>

        {/* 6 Categorized Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.code] || Layers;

            return (
              <div
                key={category.code}
                className="relative p-7 bg-[#0B0B0B] border border-[#222222] hover:border-[#A90E02] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C] mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black border border-[#292929] flex items-center justify-center text-[#A90E02] group-hover:border-[#A90E02] transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-mono-code text-xs text-[#A8A8A8] tracking-widest">
                        PHASE // {category.code}
                      </span>
                    </div>
                    <span className="font-mono-code text-xs text-[#A90E02] font-bold">
                      {category.items.length} MODULES
                    </span>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-display text-2xl md:text-3xl text-[#FFFBD4] uppercase tracking-wide mb-2 group-hover:text-[#A90E02] transition-colors">
                    {category.category}
                  </h3>
                  <p className="font-editorial text-xs text-[#A8A8A8] mb-6 leading-relaxed">
                    {category.summary}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 bg-black border border-[#191919] group-hover:border-[#2C2C2C] transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono-code text-xs font-bold text-[#FFFBD4]">
                            {skill.name}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A90E02]" />
                        </div>
                        <p className="font-editorial text-[11px] text-[#A8A8A8] leading-tight">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solid Corner Notch Accent */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#A90E02]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
