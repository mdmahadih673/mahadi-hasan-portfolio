'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#works', id: 'works' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef(null);

  useEffect(() => {
    // If user prefers reduced motion, reveal navbar immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && headerRef.current) {
      headerRef.current.style.opacity = '1';
      headerRef.current.style.transform = 'translateY(0)';
      headerRef.current.style.pointerEvents = 'auto';
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      // Detect active section
      const sections = ['hero', 'about', 'skills', 'works', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,padding] duration-300 ${
          isScrolled
            ? 'py-3 bg-black/95 border-b border-[#222222] backdrop-blur-sm shadow-md'
            : 'py-4 bg-transparent border-b border-transparent'
        }`}
        style={{ opacity: 0, transform: 'translateY(-20px)', pointerEvents: 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Monogram Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center gap-3 select-none"
            aria-label="Mahadi Hasan — Home"
          >
            <div className="relative w-10 h-10 border border-[#FFFBD4]/30 bg-black flex items-center justify-center transition-all duration-300 group-hover:border-[#A90E02]">
              <span className="font-display text-2xl text-[#FFFBD4] tracking-widest leading-none pt-0.5">
                MH
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#A90E02]" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-editorial text-xs font-semibold tracking-wider text-[#FFFBD4] uppercase">
                Mahadi Hasan
              </span>
              <span className="font-mono-code text-[10px] text-[#A8A8A8] tracking-widest uppercase">
                MERN Stack Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative font-mono-code text-xs uppercase tracking-widest py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#FFFBD4] font-bold'
                      : 'text-[#A8A8A8] hover:text-[#FFFBD4]'
                  }`}
                >
                  <span className="inline-block mr-1 text-[10px] text-[#A90E02]">
                    /
                  </span>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A90E02]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side: Available badge + CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Available badge — desktop only */}
            <span className="hidden lg:inline-flex items-center gap-2 font-mono-code text-[9px] font-bold tracking-[0.14em] text-[#FFFBD4]/70 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFBD4]/40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFFBD4]" />
              </span>
              Available for Opportunities
            </span>

            <a
              href="/api/download-cv"
              download="Mahadi_Hasan_MERN_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono-code tracking-widest uppercase bg-[#A90E02] text-[#FFFBD4] hover:bg-[#850b02] transition-colors duration-300 font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#FFFBD4] hover:text-[#A90E02] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 md:hidden">
          <div className="absolute top-6 left-6 font-mono-code text-xs text-[#A8A8A8]">
            {'// NAVIGATION'}
          </div>
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="group flex items-baseline justify-between py-2 border-b border-[#222222]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono-code text-xs text-[#A90E02]">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-4xl text-[#FFFBD4] group-hover:text-[#A90E02] transition-colors">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#A8A8A8] group-hover:text-[#A90E02] transition-colors" />
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href="/api/download-cv"
              download="Mahadi_Hasan_MERN_Resume.pdf"
              className="w-full py-3 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-[#222222] flex flex-col gap-2">
            <span className="font-mono-code text-xs text-[#A8A8A8]">DIRECT INQUIRIES</span>
            <a
              href="mailto:mdmahadih673@gmail.com"
              className="text-[#FFFBD4] hover:text-[#A90E02] text-sm font-mono-code transition-colors"
            >
              mdmahadih673@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
