/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Code, ArrowRight, BrainCircuit, Heart, BarChart3, HelpCircle } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectsProps {
  onOpenDemo: (project: Project, tab: 'demo' | 'code') => void;
}

export default function Projects({ onOpenDemo }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Java' | 'Python' | 'SQL'>('All');
  const [showMLSpecializationModal, setShowMLSpecializationModal] = useState(false);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="font-display-lg text-headline-lg text-on-surface font-bold">Featured Projects</h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
          A curation of engineering solutions spanning Java development, Machine Learning architectures, and robust system designs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 flex-wrap">
        {['All', 'Java', 'Python', 'SQL'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category as any)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              activeFilter === category
                ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {category} {category === 'All' ? `(${PROJECTS.length})` : ''}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white/70 backdrop-blur-xl rounded-[20px] p-6 border border-slate-100/80 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
          >
            {/* Visual Header Image */}
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-slate-100 relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                alt={project.title}
                src={project.image}
              />
            </div>

            {/* Meta Details */}
            <div className="flex-grow">
              <h3 className="font-headline-md text-headline-md font-bold mb-2 text-on-surface group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {/* Badges list */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-50 text-primary border border-purple-100/25 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom buttons hooks */}
            <div className="flex gap-4 pt-4 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={() => onOpenDemo(project, 'demo')}
                className="flex-1 text-center bg-primary hover:bg-primary-container text-white py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Live Demo
              </button>
              <button
                onClick={() => onOpenDemo(project, 'code')}
                className="flex items-center justify-center w-12 h-10 border border-slate-200 hover:border-primary/40 text-slate-500 hover:text-primary rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <Code className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Collective Card: Machine Learning Projects */}
        <div className="bg-purple-50/20 backdrop-blur-xl rounded-[20px] p-6 border border-primary/10 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 md:col-span-2 flex flex-col h-full justify-between">
          <div className="flex flex-col md:flex-row gap-6 h-full items-stretch">
            
            {/* Descriptive Left Column of Collective Card */}
            <div className="md:w-1/3 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mb-4 border border-primary/10">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline-md text-headline-md font-bold mb-2 text-on-surface">ML Specialization</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                A collective portfolio of predictive models focused on healthcare, retail, and ensemble learning.
              </p>
              <button
                onClick={() => setShowMLSpecializationModal(true)}
                className="inline-flex items-center gap-1 text-primary font-bold hover:gap-2 text-xs transition-all w-fit cursor-pointer"
              >
                View ML Repository <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Sub-bento Grid */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Healthcare
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Dermatology Prediction</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Classifying skin conditions using sophisticated classification algorithms.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-purple-600" /> Retail
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Walmart Sales Forecast</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Time-series forecasting to optimize inventory and supply chain metrics.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-inner flex flex-col justify-between sm:col-span-2">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600 animate-pulse" /> Ensemble Learning
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Voting Classifier Implementation</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  A robust model leveraging multiple estimators to improve prediction accuracy through weighted voting mechanisms.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive ML Specialization modal */}
      {showMLSpecializationModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setShowMLSpecializationModal(false)} />
          <div className="relative bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 border border-purple-100">
            <h3 className="font-headline-md font-bold text-on-surface mb-2 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" /> ML Repository Details
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              This repository contains Arunkumar's machine learning pipelines, datasets exploration notebooks, and cross-validated ensemble models.
            </p>
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div className="flex justify-between font-mono">
                <span className="font-bold">Total Models:</span>
                <span>15+ Pipelines</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="font-bold">Average Accuracy:</span>
                <span className="text-emerald-600 font-bold">96.8% (Dermatology)</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="font-bold">Frameworks:</span>
                <span>Scikit-learn, TensorFlow, Keras</span>
              </div>
            </div>
            <button
              onClick={() => setShowMLSpecializationModal(false)}
              className="mt-6 w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl font-bold text-xs"
            >
              Close Repository Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
