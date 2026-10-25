'use client';

import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#050505] border-t border-[#1C1C1C] text-[#FFFBD4] py-16 px-6 md:px-12 selection:bg-[#A90E02] selection:text-[#FFFBD4]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand Monogram & Identity */}
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 border border-[#FFFBD4]/40 bg-black flex items-center justify-center">
            <span className="font-display text-2xl text-[#FFFBD4] tracking-widest leading-none pt-0.5">
              MH
            </span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#A90E02]" />
          </div>
          <div>
            <span className="font-editorial text-sm font-bold tracking-wider text-[#FFFBD4] uppercase block">
              Mahadi Hasan
            </span>
            <span className="font-mono-code text-[11px] text-[#A8A8A8] tracking-widest uppercase">
              MERN Stack Developer • Bangladesh
            </span>
          </div>
        </div>

        {/* Editorial Footnote */}
        <div className="font-mono-code text-xs text-[#A8A8A8] tracking-widest uppercase text-left md:text-center">
          <span className="text-[#A90E02] font-bold">CREATIVE EDITORIAL IDENTITY</span>
          <br />
          <span>ZERO GRADIENTS • STRICT MONOCHROME &amp; ACCENT RED</span>
        </div>

        {/* Navigation & Rights */}
        <div className="flex flex-col md:items-end gap-2 font-mono-code text-xs text-[#A8A8A8]">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/mdmahadih673"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFBD4] flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#A90E02]" />
            </a>
            <a
              href="https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFBD4] flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#A90E02]" />
            </a>
            <a
              href="mailto:mdmahadih673@gmail.com"
              className="hover:text-[#FFFBD4] flex items-center gap-1 transition-colors"
            >
              <span>Email</span>
              <ArrowUpRight className="w-3 h-3 text-[#A90E02]" />
            </a>
          </div>
          <span className="text-[11px] text-[#666666]">
            &copy; {currentYear} Mahadi Hasan. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
