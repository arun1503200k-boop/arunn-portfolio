/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MapPin, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

export default function About() {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const stats = [
    {
      label: 'ML Models Trained',
      value: '10+',
      detail: 'Deep neural networks, ensemble voting classifiers, and regression predictors built for Walmart sales, dermatology classification, and financial platforms.'
    },
    {
      label: 'Open Source Contribs',
      value: '5+',
      detail: 'Contributions to Python NLP workflows, SQL schema builders, and modular AI integrations for college projects.'
    },
    {
      label: 'Academic Excellence',
      value: 'A+',
      detail: 'Maintained top ranks in B.E. Computer Science at Sethu Institute of Technology with specializations in AI & ML.'
    },
    {
      label: 'Curiosity Level',
      value: '∞',
      detail: 'Constant hunger for learning, demonstrated by a 100+ day streak on system design, automated reasoning, and advanced prompt engineering platforms.'
    }
  ];

  const facts = [
    { icon: MapPin, text: 'Based in Tamil Nadu, India' },
    { icon: GraduationCap, text: 'B.E. Computer Science (AI & ML)' },
    { icon: Briefcase, text: 'Currently open to Internships & Projects' }
  ];

  return (
    <section id="about" className="py-24">
      {/* Title */}
      <div className="text-center mb-16 space-y-3">
        <span className="text-primary font-mono text-xs tracking-widest uppercase font-bold">The Developer</span>
        <h2 className="font-display-lg text-headline-lg font-bold text-on-surface">About Me</h2>
      </div>

      {/* Glass card container */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 md:p-12 border border-purple-100/30 shadow-xl shadow-purple-900/5 grid md:grid-cols-12 gap-12 items-start relative overflow-hidden">
        
        {/* Paragraph Columns */}
        <div className="md:col-span-7 space-y-6 relative z-10">
          <p className="text-base text-slate-600 leading-relaxed">
            I am a dedicated CSE (AI & ML) student with a passion for building software that thinks. Based in the tech hub of <span className="font-bold text-primary">Tamil Nadu</span>, I bridge the gap between traditional engineering principles and cutting-edge artificial intelligence.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            My journey began with a curiosity for how algorithms can replicate human decision-making. Today, I focus on creating efficient, ethical, and performant AI models while maintaining the robustness of full-stack systems.
          </p>

          {/* Fact items list */}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
            {facts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div key={idx} className="flex items-center gap-4 text-on-surface">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-primary flex items-center justify-center border border-purple-100/20">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{fact.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick stats grid */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4 relative z-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              onClick={() => setSelectedStat(selectedStat === stat.label ? null : stat.label)}
              className={`p-6 rounded-2xl flex flex-col gap-2 cursor-pointer transition-all duration-300 border ${
                selectedStat === stat.label
                  ? 'bg-purple-50 border-primary shadow-lg shadow-primary/5'
                  : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-purple-200/40 shadow-sm'
              }`}
            >
              <div className="text-primary font-display-lg text-3xl font-extrabold flex justify-between items-center">
                {stat.value}
                <Sparkles className="w-3.5 h-3.5 opacity-40 text-purple-600" />
              </div>
              <div className="text-slate-500 font-semibold text-xs leading-tight">{stat.label}</div>
              
              {/* Expandable info block */}
              {selectedStat === stat.label && (
                <div className="text-[11px] text-slate-600 leading-relaxed mt-2 border-t border-purple-100/40 pt-2 animate-fadeIn font-medium">
                  {stat.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
