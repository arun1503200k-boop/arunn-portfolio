/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, GraduationCap, Brain, Database, Check } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-slate-100">
      
      {/* Education Timeline */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="font-display-lg text-headline-lg font-bold text-on-surface">Education</h2>
        </div>

        <div className="relative pl-8 border-l-2 border-slate-200 space-y-12 ml-4">
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="relative group">
              {/* Timeline marker ball */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-200" />
              
              <span className="text-primary font-mono text-xs font-bold uppercase bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100/30">
                {edu.period}
              </span>
              <h3 className="font-headline-md text-headline-md font-bold mt-3 text-on-surface">
                {edu.degree}
              </h3>
              <p className="text-secondary font-semibold text-sm mt-0.5">
                {edu.institution}
              </p>
              <p className="text-slate-600 text-xs leading-relaxed mt-3">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications List */}
      <div id="certifications" className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="font-display-lg text-headline-lg font-bold text-on-surface">Certifications</h2>
        </div>

        <div className="space-y-6">
          {CERTIFICATIONS.map((cert) => {
            const isBrain = cert.iconName === 'brain';
            const Icon = isBrain ? Brain : Database;

            return (
              <div
                key={cert.id}
                className="bg-white hover:bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:border-purple-200/40 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-300 border border-purple-100/20">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-100">
                      <Check className="w-2.5 h-2.5" /> Verified
                    </span>
                  </div>
                  <p className="text-secondary font-semibold text-xs">
                    {cert.issuer}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
