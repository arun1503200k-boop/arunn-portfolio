/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { MapPin, Mail, Linkedin, Github, Send, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';
import { ContactMessage } from '../types';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [mailbox, setMailbox] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('arun_mailbox');
    return saved ? JSON.parse(saved) : [];
  });
  const [showMailbox, setShowMailbox] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');

    // Simulate database network lag
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `MSG-${Date.now().toString().slice(-4)}`,
        name,
        email,
        subject: subject || 'No Subject',
        message,
        timestamp: new Date().toLocaleString()
      };

      const updatedMailbox = [newMessage, ...mailbox];
      setMailbox(updatedMailbox);
      localStorage.setItem('arun_mailbox', JSON.stringify(updatedMailbox));

      setStatus('success');
      
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Return status back to normal after show-off time
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  const handleClearMailbox = () => {
    localStorage.removeItem('arun_mailbox');
    setMailbox([]);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-100">
      <div className="flex flex-col gap-12">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <h2 className="font-display-lg text-headline-lg text-on-surface font-bold">Get In Touch</h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about my machine learning projects or just want to say hi, my inbox is always open.
          </p>
        </div>

        {/* Form and Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (Details Bento) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Location Card */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl flex items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-primary flex items-center justify-center border border-purple-100/10 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Location</p>
                <p className="text-xs font-bold text-slate-700">Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            {/* Email Card */}
            <a
              href="mailto:hello@arunkumar.dev"
              className="bg-white/70 backdrop-blur-xl p-6 rounded-xl flex items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center border border-purple-100/10 flex-shrink-0 transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Email</p>
                <p className="text-xs font-bold text-slate-700">hello@arunkumar.dev</p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="#"
              className="bg-white/70 backdrop-blur-xl p-6 rounded-xl flex items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center border border-purple-100/10 flex-shrink-0 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">LinkedIn</p>
                <p className="text-xs font-bold text-slate-700">linkedin.com/in/arunkumar</p>
              </div>
            </a>

            {/* Github Card */}
            <a
              href="#"
              className="bg-white/70 backdrop-blur-xl p-6 rounded-xl flex items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-50 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center border border-purple-100/10 flex-shrink-0 transition-colors duration-300">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">GitHub</p>
                <p className="text-xs font-bold text-slate-700">github.com/arunkumar-ai</p>
              </div>
            </a>
          </div>

          {/* Right Column (Contact Form Card) */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Let's Build Something Amazing Together</h3>
                <p className="text-slate-500 text-xs mt-1">Drop me a line and let's start a conversation about your next technical challenge.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === 'sending'}
                      className="w-full text-sm bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/5 transition-all text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'sending'}
                      className="w-full text-sm bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/5 transition-all text-on-surface"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase px-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={status === 'sending'}
                    className="w-full text-sm bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/5 transition-all text-on-surface"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase px-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === 'sending'}
                    className="w-full text-sm bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/5 transition-all text-on-surface resize-none"
                  />
                </div>

                {status === 'success' ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2.5 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Message sent successfully! Thank you for writing to me.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container disabled:bg-slate-300 text-white px-8 py-3 rounded-full text-xs font-bold hover:shadow-lg hover:shadow-primary/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Easter Egg / Simulated Mailbox Admin Drawer */}
        {mailbox.length > 0 && (
          <div className="mt-4 border border-purple-100 rounded-2xl overflow-hidden bg-slate-50/50">
            <button
              onClick={() => setShowMailbox(!showMailbox)}
              className="w-full px-6 py-4 bg-purple-50 hover:bg-purple-100/80 text-left font-bold text-primary text-xs flex justify-between items-center transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-primary" />
                Recruiter Sandbox Mailbox: {mailbox.length} message(s) saved in LocalStorage
              </span>
              <span>{showMailbox ? 'Hide Messages' : 'Show Messages'}</span>
            </button>

            {showMailbox && (
              <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">LocalStorage Inbox logs</span>
                  <button
                    onClick={handleClearMailbox}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-white border border-rose-100 hover:bg-rose-50 px-2.5 py-1 rounded"
                  >
                    Clear Mailbox
                  </button>
                </div>
                {mailbox.map((msg) => (
                  <div key={msg.id} className="p-4 bg-white border border-slate-100 rounded-xl space-y-2 text-xs shadow-inner">
                    <div className="flex justify-between font-mono text-slate-400 border-b border-slate-100 pb-1.5">
                      <span>Sender: {msg.name} ({msg.email})</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="font-bold text-slate-700">Subject: {msg.subject}</p>
                    <p className="text-slate-600 font-medium leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Asymmetric Map Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[24px] overflow-hidden border border-slate-100 shadow-sm mt-8 relative">
          <div 
            className="w-full h-80 grayscale opacity-45 hover:grayscale-0 transition-all duration-700 relative bg-cover bg-center"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4cSltErE50yP5IyQi9FIS-NvoJiUSkLXsreySfUNL9TuIjkrrjBMTUc45y7UvmZk-sziB3Syyv26gHhE2o82kN06hr6exX6FkM5jGk4hQ_Rz_vjlJsvTbWtXGruE034WJTMjsgS_6C30NFlTtpxV-D5XweZA8tDlmBjgOwNdM5egDS5w6fxl1Ddof4fGMiRMgeAu2DOyoDBQuJMg23fZ4tdD-ru6TMlwCdqf9GOPXu8AWACn7FJhvHovWPoMWDwcotTemkK_8M_Y')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 bg-white p-5 rounded-2xl max-w-xs shadow-lg border border-purple-100/40">
            <h4 className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Current Base</h4>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              I'm currently working remotely and taking on freelance projects worldwide from Chennai.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
