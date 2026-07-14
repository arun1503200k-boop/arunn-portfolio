/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Check, Sparkles, Loader2, Award, Briefcase, GraduationCap, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setDownloadState('idle');
      setProgress(0);
    }
  }, [isOpen]);

  const triggerDownload = () => {
    setDownloadState('downloading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState('completed');
          // Actually prompt standard download of a mock text resume for real utility
          const resumeText = `
ARUNKUMAR S. - AI & ML ENGINEER
Email: hello@arunkumar.dev
Location: Chennai, Tamil Nadu, India
Web: https://arunkumar.dev

EDUCATION:
- Bachelor of Engineering (B.E.), Computer Science & Engineering
  Sethu Institute of Technology (2020 - 2024)

TECHNICAL SKILLS:
- Languages: Java, Python, C, SQL
- Machine Learning: Scikit-learn, TensorFlow, PyTorch, Spacy, OpenCV, NLP Transformers
- Web Dev: HTML5, CSS3, JavaScript, React, Tailwind CSS
- Databases: SQL, MySQL, NoSQL
- Dev Tools: Git, VS Code, Docker, Jupyter, Postman

FEATURED PROJECTS:
- Student Grade Tracker (Java, Collections, OOP)
- Stock Trading Platform Simulator (Java, Multithreading, OOP)
- AI Chatbot NLP Agent (Python, Spacy, NLP)
- Hotel Reservation System SQL CRUD (Java, SQL, JDBC)

CERTIFICATIONS:
- AI Certification (Infosys Springboard)
- DBMS Masterclass (Udemy Professional Certificate)
          `.trim();
          
          const blob = new Blob([resumeText], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Arunkumar_Resume.txt';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-100 z-10"
        >
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <Briefcase className="w-5 h-5" />
              </span>
              <h3 className="font-headline-md font-bold text-on-surface">Interactive Resume Desk</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action and Download Simulator Panel */}
          <div className="p-4 bg-purple-50/50 border-b border-purple-100/30 flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
            <div className="text-sm text-slate-600 font-medium">
              {downloadState === 'idle' && "View or download Arunkumar's professional tech credentials."}
              {downloadState === 'downloading' && (
                <span className="flex items-center gap-2 text-primary font-bold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Resume PDF... {progress}%
                </span>
              )}
              {downloadState === 'completed' && (
                <span className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Check className="w-4 h-4" /> Download Complete! real text document saved.
                </span>
              )}
            </div>

            <button
              onClick={triggerDownload}
              disabled={downloadState === 'downloading'}
              className="w-full sm:w-auto bg-primary hover:bg-primary-container disabled:bg-slate-300 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:shadow-primary/15 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {downloadState === 'completed' ? (
                <>
                  <Check className="w-4 h-4" /> Downloaded
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download Resume Document
                </>
              )}
            </button>
          </div>

          {/* Simulated Resume Body */}
          <div className="p-8 overflow-y-auto flex-grow bg-white space-y-6 select-text">
            {/* Download Progress Bar */}
            {downloadState === 'downloading' && (
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-4">
                <div className="bg-primary h-full transition-all duration-150" style={{ width: `${progress}%` }} />
              </div>
            )}

            {/* Header Contact Block */}
            <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-on-surface">Arunkumar S.</h1>
                <p className="text-primary font-semibold text-sm mt-1">Artificial Intelligence & Machine Learning Engineer</p>
              </div>
              <div className="space-y-1.5 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary" /> hello@arunkumar.dev</div>
                <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-primary" /> linkedin.com/in/arunkumar</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Chennai, Tamil Nadu, India</div>
              </div>
            </div>

            {/* Resume Content Sections */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left Column (Details) */}
              <div className="md:col-span-8 space-y-6">
                {/* Profile Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Professional Summary
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Ambitious B.E. Computer Science student specializing in Artificial Intelligence and Machine Learning. Backed by solid knowledge of object-oriented Java foundations, advanced neural networks, NLP, and database engineering. Passionate about designing robust software tools that bridge backend utility with intelligent, data-driven systems.
                  </p>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" /> Education History
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-slate-800">Bachelor of Engineering (B.E.)</span>
                      <span className="text-primary font-mono font-bold text-xs">2020 — 2024</span>
                    </div>
                    <p className="text-xs text-secondary font-semibold">Sethu Institute of Technology</p>
                    <p className="text-xs text-slate-500 mt-1">Focused on Computer Science, Software Architectures, Machine Learning Models, and database optimizations.</p>
                  </div>
                </div>

                {/* Key Projects */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary" /> Portfolio Highlights
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-slate-800">Student Grade Tracker</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">Java</span>
                      </div>
                      <p className="text-xs text-slate-500">Robust Java-based data platform featuring student database, automated GPA calculations, and high-performance list collections.</p>
                    </div>

                    <div className="p-4 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-slate-800">Stock Trading Platform</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">Multithreading</span>
                      </div>
                      <p className="text-xs text-slate-500">Engineered complex simulator in Java OOP demonstrating high-performance concurrency, real-time ticket logs, and visual balances.</p>
                    </div>

                    <div className="p-4 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-slate-800">AI Chatbot Assistant</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">Python, NLP</span>
                      </div>
                      <p className="text-xs text-slate-500">NLP conversational chatbot leveraging Python with spaCy parsing, classifying user intent and serving code blocks efficiently.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Skills & certs) */}
              <div className="md:col-span-4 space-y-6">
                {/* Skills Toolkit */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Technical Toolkit
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'Python', 'React', 'TypeScript', 'SQL', 'Scikit-Learn', 'TensorFlow', 'NLP Spacy', 'Docker', 'Git', 'Jupyter'].map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-purple-50 text-primary rounded-lg text-xs font-semibold font-mono border border-purple-100/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-primary" /> Credentials
                  </h4>
                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-0.5">
                      <p className="font-bold text-slate-800">AI Certification</p>
                      <p className="text-secondary font-semibold">Infosys Springboard</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-0.5">
                      <p className="font-bold text-slate-800">DBMS Masterclass</p>
                      <p className="text-secondary font-semibold">Udemy Professional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
