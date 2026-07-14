/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Terminal, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-24">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left block logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-headline-md text-headline-md font-bold text-on-surface">Arunkumar</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">© 2026 S. Arunkumar. All rights reserved.</p>
        </div>

        {/* Center technology badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-primary rounded-xl border border-slate-100 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-primary rounded-xl border border-slate-100 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-primary rounded-xl border border-slate-100 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
          <p className="font-mono text-[11px] text-slate-400">
            Built with <span className="text-rose-500 animate-pulse">❤️</span> using React & Tailwind CSS
          </p>
        </div>

        {/* Right navigation links */}
        <div className="flex gap-8 text-xs font-semibold text-slate-500">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

      </div>
    </footer>
  );
}
