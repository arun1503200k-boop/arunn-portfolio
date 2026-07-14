/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { Terminal, Menu, X, Download } from 'lucide-react';

interface HeaderProps {
  onOpenResume: () => void;
  activeSection: string;
}

export default function Header({ onOpenResume, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-purple-100/40 shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center w-full">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Terminal className="w-4.5 h-4.5" />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
            Arunkumar
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-semibold tracking-tight transition-all duration-200 relative py-1 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            );
          })}
          
          <button
            onClick={onOpenResume}
            className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-full text-xs font-semibold hover:shadow-lg hover:shadow-primary/15 transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </button>
        </nav>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-on-surface transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-base font-semibold py-2 px-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-purple-50 text-primary font-bold' 
                    : 'text-on-surface hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenResume();
            }}
            className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl text-sm font-semibold flex justify-center items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </div>
      )}
    </header>
  );
}
