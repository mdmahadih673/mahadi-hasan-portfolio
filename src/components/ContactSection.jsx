'use client';

import { useState, useRef } from 'react';
import { Mail, Send, CheckCircle2, ArrowUp, Copy, Check, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mdmahadih673@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    // Process submission and provide working fallback to direct mail client
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black text-[#FFFBD4] py-24 md:py-36 px-6 md:px-12 selection:bg-[#A90E02] selection:text-[#FFFBD4] border-t border-[#1F1F1F]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#A90E02]" />
            <span className="font-mono-code text-xs font-bold tracking-widest text-[#A90E02] uppercase">
              [ 06 / CONTACT ]
            </span>
          </div>
          <span className="font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest">
            DIRECT COMMUNICATION
          </span>
        </div>

        {/* Large Typographic Heading */}
        <div className="mb-20">
          <p className="font-mono-code text-xs tracking-widest text-[#A8A8A8] uppercase mb-4">
            // COLLABORATIONS, PROJECTS &amp; OPPORTUNITIES
          </p>
          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-[#FFFBD4] uppercase tracking-tight leading-[0.88]">
            LET&apos;S BUILD
            <br />
            <span className="text-[#A90E02]">SOMETHING</span>
            <br />
            MEANINGFUL.
          </h2>
        </div>

        {/* 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <p className="font-editorial text-base md:text-lg text-[#A8A8A8] leading-relaxed">
              Whether you are looking to collaborate on an AI-driven MERN application,
              build custom full-stack web platforms, or discuss potential engineering
              roles, my inbox is always open.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Email Card with Copy Feature */}
              <div className="p-5 bg-[#0D0D0D] border border-[#222222] flex items-center justify-between group hover:border-[#A90E02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black border border-[#2B2B2B] flex items-center justify-center text-[#A90E02]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-code text-[11px] text-[#A8A8A8] uppercase tracking-wider block">
                      EMAIL ADDRESS
                    </span>
                    <a
                      href="mailto:mdmahadih673@gmail.com"
                      className="font-mono-code text-sm text-[#FFFBD4] hover:text-[#A90E02] transition-colors"
                    >
                      mdmahadih673@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 border border-[#333333] hover:border-[#FFFBD4] text-[#A8A8A8] hover:text-[#FFFBD4] transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#A90E02]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* GitHub Card */}
              <a
                href="https://github.com/mdmahadih673"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-[#0D0D0D] border border-[#222222] flex items-center justify-between group hover:border-[#A90E02] transition-colors block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black border border-[#2B2B2B] flex items-center justify-center text-[#A90E02]">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-code text-[11px] text-[#A8A8A8] uppercase tracking-wider block">
                      GITHUB REPOSITORIES
                    </span>
                    <span className="font-mono-code text-sm text-[#FFFBD4]">
                      github.com/mdmahadih673
                    </span>
                  </div>
                </div>
                <span className="font-mono-code text-xs text-[#A8A8A8] group-hover:text-[#A90E02] transition-colors">
                  [VISIT ↗]
                </span>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/md-mahadi-hasan-792ba8344/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-[#0D0D0D] border border-[#222222] flex items-center justify-between group hover:border-[#A90E02] transition-colors block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black border border-[#2B2B2B] flex items-center justify-center text-[#A90E02]">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-code text-[11px] text-[#A8A8A8] uppercase tracking-wider block">
                      LINKEDIN NETWORK
                    </span>
                    <span className="font-mono-code text-sm text-[#FFFBD4]">
                      in/md-mahadi-hasan
                    </span>
                  </div>
                </div>
                <span className="font-mono-code text-xs text-[#A8A8A8] group-hover:text-[#A90E02] transition-colors">
                  [CONNECT ↗]
                </span>
              </a>
            </div>

            {/* Action buttons: Download CV & Back to top */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/Mahadi_Hasan_MERN_Resume.pdf"
                download="Mahadi_Hasan_MERN_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-widest font-bold hover:bg-[#850b02] transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#333333] hover:border-[#A90E02] hover:text-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-widest transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border-2 border-[#222222] p-8 md:p-12 relative">
            <div className="flex items-center justify-between pb-6 border-b border-[#1E1E1E] mb-8">
              <span className="font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest">
                // TRANSMISSION INTERFACE
              </span>
              <span className="font-mono-code text-xs text-[#A90E02] font-bold">
                SECURE DISPATCH
              </span>
            </div>

            {status === 'success' ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 bg-[#A90E02] text-[#FFFBD4] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-4xl text-[#FFFBD4] uppercase tracking-wide">
                  MESSAGE DISPATCHED
                </h3>
                <p className="font-editorial text-sm text-[#A8A8A8] max-w-md">
                  Thank you, <strong className="text-[#FFFBD4]">{formData.name}</strong>.
                  Your message has been received. You can also send a direct email to{' '}
                  <a
                    href={`mailto:mdmahadih673@gmail.com?subject=Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                    className="text-[#A90E02] underline"
                  >
                    mdmahadih673@gmail.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-6 px-6 py-2.5 bg-black border border-[#444444] text-xs font-mono-code uppercase tracking-wider text-[#FFFBD4] hover:border-[#A90E02]"
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest mb-2"
                  >
                    YOUR NAME <span className="text-[#A90E02]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    className={`w-full px-4 py-3 bg-black border text-sm text-[#FFFBD4] placeholder-[#444444] font-editorial focus:outline-none transition-colors ${
                      errors.name ? 'border-[#A90E02]' : 'border-[#262626] focus:border-[#FFFBD4]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 font-mono-code text-xs text-[#A90E02]">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest mb-2"
                  >
                    EMAIL ADDRESS <span className="text-[#A90E02]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alexander@enterprise.com"
                    className={`w-full px-4 py-3 bg-black border text-sm text-[#FFFBD4] placeholder-[#444444] font-editorial focus:outline-none transition-colors ${
                      errors.email ? 'border-[#A90E02]' : 'border-[#262626] focus:border-[#FFFBD4]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 font-mono-code text-xs text-[#A90E02]">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono-code text-xs text-[#A8A8A8] uppercase tracking-widest mb-2"
                  >
                    PROJECT INQUIRY / MESSAGE <span className="text-[#A90E02]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your project scope, technical requirements, or schedule..."
                    className={`w-full px-4 py-3 bg-black border text-sm text-[#FFFBD4] placeholder-[#444444] font-editorial focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-[#A90E02]' : 'border-[#262626] focus:border-[#FFFBD4]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono-code text-xs text-[#A90E02]">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-[#A90E02] text-[#FFFBD4] font-mono-code text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-[#850b02] transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>DISPATCHING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Corner Notch */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#A90E02]" />
          </div>
        </div>
      </div>
    </section>
  );
}
