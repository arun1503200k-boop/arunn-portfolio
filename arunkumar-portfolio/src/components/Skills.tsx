/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Code, Globe, Database, BrainCircuit, Layers, Wrench, Info, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return Code;
      case 'web': return Globe;
      case 'database': return Database;
      case 'brain': return BrainCircuit;
      case 'layers': return Layers;
      case 'build': return Wrench;
      default: return Code;
    }
  };

  // Simple descriptions for interactive triggers
  const skillDetails: Record<string, { level: string; desc: string }> = {
    'Java': { level: 'Advanced', desc: 'Arun\'s primary language. Applied in multithreaded platform simulators and database schemas with robust OOP.' },
    'Python': { level: 'Advanced', desc: 'Used for scientific computing, NLP chatbots with spaCy, and model development in Scikit-Learn/TensorFlow.' },
    'C': { level: 'Intermediate', desc: 'Core academic language used for low-level systems programming and algorithms.' },
    'HTML5': { level: 'Advanced', desc: 'Semantic layout building block used to craft standard compliant web interfaces.' },
    'CSS3': { level: 'Advanced', desc: 'Highly skilled in modern flexbox, grid, and Tailwind utility classes for responsive design.' },
    'JavaScript': { level: 'Advanced', desc: 'Applied in client-side validations, interactive components, state triggers, and async APIs.' },
    'React': { level: 'Advanced', desc: 'Builds beautiful single-page dashboards utilizing state hooks, effects, and frame animations.' },
    'SQL': { level: 'Advanced', desc: 'Proficient in writing complex JOIN queries, subqueries, indexing, and normalizing relational databases.' },
    'MySQL': { level: 'Advanced', desc: 'Relational database manager used for hotel reservation persistent storage models.' },
    'NoSQL': { level: 'Intermediate', desc: 'Familiar with document storage models (e.g., Firestore) for rapid API integrations.' },
    'ML (Scikit-learn)': { level: 'Advanced', desc: 'Classifying dermatology parameters, Walmart predictive modeling, and ensemble voting logic.' },
    'DL (TensorFlow)': { level: 'Intermediate', desc: 'Applied in building neural networks and deep classifiers for computer vision tasks.' },
    'NLP (Transformers)': { level: 'Advanced', desc: 'Highly interested in pre-trained transformer pipelines and automated reasoning.' },
    'CV (OpenCV)': { level: 'Intermediate', desc: 'Used to process matrix arrays and conduct basic face or pattern recognition.' },
    'OOP': { level: 'Expert', desc: 'Core programming paradigm. Applied consistently in student and trading Java architectures.' },
    'DSA': { level: 'Advanced', desc: 'Strong grasp of data structures (Trees, HashMaps, Lists) and algorithms for high-speed computation.' },
    'Cloud': { level: 'Intermediate', desc: 'Familiar with deployment containers, GCP basics, and serverless hosting models.' },
    'Git': { level: 'Advanced', desc: 'Version control system used for commit logs and branch tracking on GitHub repositories.' },
    'VS Code': { level: 'Expert', desc: 'Arun\'s main developer IDE environment, configured with ML and backend compiler pipelines.' },
    'Docker': { level: 'Intermediate', desc: 'Used for containerizing full-stack environments and local database images.' },
    'Jupyter': { level: 'Advanced', desc: 'Applied to test python data blocks, plot matplotlib charts, and train sci-kit algorithms.' },
    'Postman': { level: 'Advanced', desc: 'Rest API verification and end-point testing client for local system servers.' }
  };

  return (
    <section id="skills" className="py-24">
      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <span className="text-primary font-mono text-xs tracking-widest uppercase font-bold">Expertise</span>
        <h2 className="font-display-lg text-headline-lg font-bold text-on-surface">Technical Toolkit</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = getIcon(category.icon);
          const isLarge = category.span && category.span > 1;

          return (
            <div
              key={category.title}
              className={`bg-white/70 backdrop-blur-xl p-8 rounded-[24px] border border-slate-100 hover:border-purple-200/40 shadow-sm hover:shadow-lg hover:shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between ${
                isLarge ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-primary border border-purple-100/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline-md font-bold text-on-surface leading-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skills sub-grid */}
                {category.title === 'Artificial Intelligence' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {category.skills.map((skill) => {
                      const cleanName = skill;
                      const hasDetail = skillDetails[cleanName];
                      const isSelected = selectedSkill === cleanName;

                      return (
                        <div
                          key={skill}
                          onClick={() => setSelectedSkill(isSelected ? null : cleanName)}
                          className={`p-4 rounded-xl text-center cursor-pointer border transition-all ${
                            isSelected
                              ? 'bg-purple-100/50 border-primary text-primary shadow-sm'
                              : 'bg-slate-50 border-slate-100 hover:border-purple-100'
                          }`}
                        >
                          <div className="text-primary font-bold text-sm mb-1">{cleanName.split(' ')[0]}</div>
                          <div className="text-slate-500 font-semibold text-[11px]">
                            {cleanName.includes('(') ? cleanName.split('(')[1].replace(')', '') : 'Framework'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const isSelected = selectedSkill === skill;
                      return (
                        <button
                          key={skill}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-50 border-primary text-primary shadow-sm font-bold'
                              : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dynamic feedback indicator on bottom of card */}
              <div className="text-[11px] text-slate-400 mt-4 flex items-center gap-1.5 font-medium select-none">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                <span>Click any badge for use-case insight</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-down Skill Insight Card */}
      {selectedSkill && skillDetails[selectedSkill] && (
        <div className="mt-8 bg-purple-50/70 border border-primary/20 p-6 rounded-2xl flex items-start gap-4 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-on-surface text-sm">{selectedSkill}</span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded">
                {skillDetails[selectedSkill].level}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {skillDetails[selectedSkill].desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
