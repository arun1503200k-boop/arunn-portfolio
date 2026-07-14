/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectTab, setProjectTab] = useState<'demo' | 'code'>('demo');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Passive active-section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for sticky navbar

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDemo = (project: Project, tab: 'demo' | 'code') => {
    setSelectedProject(project);
    setProjectTab(tab);
  };

  const handleScrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-on-background selection:bg-purple-100 selection:text-primary">
      
      {/* Decorative ambient blurred blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <div className="lavender-blob absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full blur-3xl opacity-60" />
        <div className="lavender-blob absolute top-1/2 -right-48 w-[800px] h-[800px] rounded-full blur-3xl opacity-45" />
      </div>

      {/* Navigation Header */}
      <Header 
        activeSection={activeSection} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      {/* Main Content Layout */}
      <main className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* About Section */}
        <About />

        {/* Technical Toolkit */}
        <Skills />

        {/* Projects Section */}
        <Projects onOpenDemo={handleOpenDemo} />

        {/* Experience Section */}
        <Experience />

        {/* Contact Section */}
        <Contact />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Playground / Code viewer Modal */}
      <ProjectModal 
        project={selectedProject} 
        initialTab={projectTab} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Interactive Resume View / Download progress Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

    </div>
  );
}
