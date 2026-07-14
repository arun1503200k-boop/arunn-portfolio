/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Cpu, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (href: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const heroTags = ['Java', 'Python', 'ML', 'AI', 'SQL', 'GitHub'];

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-24 md:py-36 grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] overflow-hidden"
    >
      {/* Visual Text / CTA Column */}
      <div className="flex flex-col gap-6 relative z-10">
        {/* Status indicator badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full w-fit text-xs font-semibold shadow-sm border border-purple-200/40">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Available for opportunities</span>
        </div>

        {/* Title Block */}
        <div className="space-y-4">
          <h1 className="text-display-lg-mobile md:text-display-lg font-extrabold tracking-tight leading-none text-on-surface">
            Hi, I'm <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">S. Arunkumar</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-on-surface-variant max-w-xl">
            Artificial Intelligence & Machine Learning Engineer
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg">
            Specializing in building intelligent systems, optimizing neural architectures, and developing scalable data-driven solutions for complex real-world problems.
          </p>
        </div>

        {/* Mini Stack Tags */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {heroTags.map((tag) => (
            <span 
              key={tag} 
              className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full font-mono text-xs border border-slate-200/40 hover:border-primary/20 hover:bg-purple-50 hover:text-primary transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => onScrollToSection('#projects')}
            className="px-8 py-3.5 bg-primary hover:bg-primary-container text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onScrollToSection('#contact')}
            className="px-8 py-3.5 border-2 border-primary/20 hover:border-primary text-primary hover:bg-purple-50 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Right Column Illustration */}
      <div className="relative group flex justify-center items-center">
        {/* Glow backdrop decorative circles */}
        <div className="absolute -inset-4 bg-primary-container/10 rounded-3xl blur-3xl group-hover:bg-primary-container/15 transition-all duration-500 pointer-events-none" />
        
        {/* Glass illustration card */}
        <div className="relative aspect-square w-full max-w-[420px] bg-white/70 backdrop-blur-xl rounded-[40px] overflow-hidden border border-purple-100/30 shadow-xl shadow-purple-900/5">
          <img 
            className="w-full h-full object-cover select-none" 
            referrerPolicy="no-referrer"
            alt="AI Machine Learning Illustration" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9iGcCT7r554ovepzzcQf3-idUXIPZ31sMzi6QcAx5OsvFw3r1-Q2ioR0jBcX1wFqe96_6xhI18OMZMmYtgk5QqOPAgXL-PB_gF3pf-QzaVaAbnyzHD3JtjMMCYdhnPWJs8GXpii0GIEd9Vm_InfG_zuK03Z1HtAB4C3tgR16ckBntOC7QRr1GCOQTVgfntHLzeGeVL-dEewAcPtFQsyOH-E6uNLq6oAN0kR3wrnpOrnUCvVdc5VgOduAu-8Xo1ElOisUKM6WE4sU"
          />
        </div>

        {/* Floating Badge Interaction */}
        <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-purple-100 shadow-xl flex items-center gap-4 animate-bounce hover:animate-none transition-all duration-300">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-primary flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              AI Research
            </div>
            <div className="text-sm font-bold text-on-surface">Deep Learning</div>
          </div>
        </div>
      </div>
    </section>
  );
}
