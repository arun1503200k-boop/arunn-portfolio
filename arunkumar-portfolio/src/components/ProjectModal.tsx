/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Code, Check, Copy, Send, Trash, Plus, Sparkles, RefreshCw, DollarSign, ArrowUpRight, ArrowDownRight, User } from 'lucide-react';
import { Project } from '../types';
import { MOCK_PROJECT_CODE, SAMPLE_STUDENTS } from '../data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  initialTab?: 'demo' | 'code';
}

export default function ProjectModal({ project, onClose, initialTab = 'demo' }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>(initialTab);
  const [copied, setCopied] = useState(false);

  // --- Grade Tracker Interactive States ---
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [newStudentName, setNewStudentName] = useState('');
  const [newMath, setNewMath] = useState(90);
  const [newCS, setNewCS] = useState(95);
  const [newPhysics, setNewPhysics] = useState(88);

  // --- Stock Trading Interactive States ---
  const [balance, setBalance] = useState(10000);
  const [holdings, setHoldings] = useState<Record<string, number>>({ AAPL: 10, TSLA: 5, NVDA: 15 });
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({ AAPL: 180.5, TSLA: 240.2, NVDA: 450.8, GOOG: 145.3 });
  const [transactions, setTransactions] = useState<{ id: string; type: 'BUY' | 'SELL'; symbol: string; qty: number; price: number; time: string }[]>([]);

  // --- AI Chatbot Interactive States ---
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string; code?: string }[]>([
    { sender: 'bot', text: "Hello! I am Arunkumar's intelligent assistant. I am trained in NLP and system concepts. Ask me anything or choose a quick prompt!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // --- Hotel Booking States ---
  const [bookings, setBookings] = useState([
    { id: 'B101', guest: 'Sarah Connor', room: 'Deluxe Room', nights: 3, total: 450, status: 'Checked In' },
    { id: 'B102', guest: 'John Doe', room: 'Executive Suite', nights: 5, total: 1250, status: 'Reserved' }
  ]);
  const [guestName, setGuestName] = useState('');
  const [roomType, setRoomType] = useState('Deluxe Room');
  const [nights, setNights] = useState(2);
  const roomRates: Record<string, number> = { 'Standard Room': 100, 'Deluxe Room': 150, 'Executive Suite': 250 };

  useEffect(() => {
    if (project) {
      setActiveTab(initialTab);
    }
  }, [project, initialTab]);

  // Simulated live stock ticker
  useEffect(() => {
    if (project?.id !== 'stock-trading') return;
    const interval = setInterval(() => {
      setStockPrices((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((sym) => {
          const changePercent = (Math.random() - 0.5) * 0.02; // max 1% change
          next[sym] = parseFloat((next[sym] * (1 + changePercent)).toFixed(2));
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [project?.id]);

  if (!project) return null;

  const codeString = MOCK_PROJECT_CODE[project.id] || '// Code snippet not available';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Grade Tracker Functions
  const handleAddStudent = (e: FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      math: Number(newMath),
      cs: Number(newCS),
      physics: Number(newPhysics)
    };
    setStudents([newStudent, ...students]);
    setNewStudentName('');
  };

  const handleRemoveStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const calculateStudentAvg = (s: typeof SAMPLE_STUDENTS[0]) => {
    return ((s.math + s.cs + s.physics) / 3).toFixed(1);
  };

  const calculateOverallAvg = () => {
    if (students.length === 0) return '0.0';
    const sum = students.reduce((acc, s) => acc + (s.math + s.cs + s.physics) / 3, 0);
    return (sum / students.length).toFixed(1);
  };

  const getGPAColor = (avg: number) => {
    if (avg >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (avg >= 80) return 'text-purple-600 bg-purple-50 border-purple-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  // Stock Simulation Functions
  const handleStockTrade = (symbol: string, type: 'BUY' | 'SELL', qty: number) => {
    const price = stockPrices[symbol];
    const cost = price * qty;

    if (type === 'BUY') {
      if (balance < cost) {
        alert('Insufficient balance for this purchase!');
        return;
      }
      setBalance((b) => parseFloat((b - cost).toFixed(2)));
      setHoldings((h) => ({ ...h, [symbol]: (h[symbol] || 0) + qty }));
    } else {
      if ((holdings[symbol] || 0) < qty) {
        alert('You do not own enough shares to sell!');
        return;
      }
      setBalance((b) => parseFloat((b + cost).toFixed(2)));
      setHoldings((h) => ({ ...h, [symbol]: Math.max(0, (h[symbol] || 0) - qty) }));
    }

    setTransactions((t) => [
      {
        id: `TX-${Date.now().toString().slice(-4)}`,
        type,
        symbol,
        qty,
        price,
        time: new Date().toLocaleTimeString()
      },
      ...t
    ]);
  };

  const calculatePortfolioValue = () => {
    let stockVal = 0;
    Object.keys(holdings).forEach((sym) => {
      stockVal += holdings[sym] * (stockPrices[sym] || 0);
    });
    return parseFloat((balance + stockVal).toFixed(2));
  };

  // AI Chatbot Functions
  const botResponses: Record<string, { text: string; code?: string }> = {
    nlp: {
      text: "Natural Language Processing (NLP) is a branch of AI that helps computers understand human language. Arunkumar uses spaCy and Transformers for named entity recognition, sentiment analysis, and smart text classification.",
      code: `import spacy\n\nnlp = spacy.load("en_core_web_sm")\ndoc = nlp("Arunkumar is building highly performant models in Tamil Nadu.")\nfor ent in doc.ents:\n    print(ent.text, "->", ent.label_)`
    },
    java: {
      text: "Java is one of Arunkumar's main languages. He applies core OOP principles, Multithreading, and JDBC to build robust systems like Stock simulators and Student tracking systems.",
      code: `// Elegant Java Thread safe lock\npublic synchronized void updateRecords() {\n    System.out.println("Locked and updated database thread.");\n}`
    },
    skills: {
      text: "Arunkumar possesses a comprehensive toolkit: \n- **Languages**: Java, Python, C, SQL\n- **Web**: React, Tailwind, JS\n- **AI/ML**: Scikit-Learn, TensorFlow, NLP Transformers, OpenCV\n- **Tools**: VS Code, Git, Docker, Jupyter"
    },
    default: {
      text: "I detected your interest! Arunkumar is an ambitious B.E. student who builds elegant software. Check out his Achievements or drop a message via the Contact section to connect!"
    }
  };

  const handleSendChat = (textToSend?: string) => {
    const input = textToSend || chatInput;
    if (!input.trim()) return;

    setMessages((m) => [...m, { sender: 'user', text: input }]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = botResponses.default;

      if (lowerInput.includes('nlp') || lowerInput.includes('spacy') || lowerInput.includes('chatbot')) {
        response = botResponses.nlp;
      } else if (lowerInput.includes('java') || lowerInput.includes('oop') || lowerInput.includes('multithread')) {
        response = botResponses.java;
      } else if (lowerInput.includes('skills') || lowerInput.includes('toolkit') || lowerInput.includes('expert')) {
        response = botResponses.skills;
      }

      setMessages((m) => [...m, { sender: 'bot', text: response.text, code: response.code }]);
      setIsTyping(false);
    }, 1000);
  };

  // Hotel Booking Functions
  const handleAddBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    const rate = roomRates[roomType] || 100;
    const total = rate * nights;
    const newBooking = {
      id: `B${Math.floor(100 + Math.random() * 900)}`,
      guest: guestName,
      room: roomType,
      nights: Number(nights),
      total,
      status: 'Reserved'
    };
    setBookings([newBooking, ...bookings]);
    setGuestName('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-md z-50 flex items-center justify-center p-4">
        {/* Backdrop cover click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-purple-100 z-10"
        >
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 rounded-lg text-primary">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="font-headline-md font-bold text-on-surface">{project.title}</h3>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="px-6 py-2 border-b border-slate-100 bg-white flex gap-4 flex-shrink-0">
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'demo'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Play className="w-4 h-4" />
              Live Interactive Demo
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'code'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Code className="w-4 h-4" />
              Source Code View
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 overflow-y-auto flex-grow bg-slate-50/50">
            {activeTab === 'code' ? (
              <div className="relative">
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-6 bg-slate-950 text-slate-100 font-mono text-sm rounded-xl overflow-x-auto shadow-inner border border-slate-800 leading-relaxed whitespace-pre">
                  <code>{codeString}</code>
                </pre>
              </div>
            ) : (
              <div>
                {/* 1. STUDENT GRADE TRACKER SIMULATION */}
                {project.id === 'grade-tracker' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <span className="text-sm font-semibold text-slate-500 uppercase">Average GPA Score</span>
                        <div className="relative flex items-center justify-center mt-3">
                          <svg className="w-28 h-28 transform -rotate-90">
                            <circle cx="56" cy="56" r="48" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                            <circle
                              cx="56"
                              cy="56"
                              r="48"
                              stroke="#6b38d4"
                              strokeWidth="10"
                              fill="transparent"
                              strokeDasharray="301.6"
                              strokeDashoffset={301.6 - (301.6 * Number(calculateOverallAvg())) / 100}
                              className="transition-all duration-500"
                            />
                          </svg>
                          <span className="absolute text-2xl font-bold text-on-surface">
                            {calculateOverallAvg()}%
                          </span>
                        </div>
                      </div>

                      <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm md:col-span-2 space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm">Add New Student Record</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Student Name"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary transition-all text-on-surface"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-[10px] uppercase text-slate-400 block mb-1">Math</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={newMath}
                                onChange={(e) => setNewMath(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-center"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-slate-400 block mb-1">CS</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={newCS}
                                onChange={(e) => setNewCS(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-center"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-slate-400 block mb-1">Physics</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={newPhysics}
                                onChange={(e) => setNewPhysics(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-center"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full sm:w-auto bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" /> Add Record
                        </button>
                      </form>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700 uppercase">Student Records Database</span>
                        <span className="text-xs font-medium text-slate-500">{students.length} Records</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                          <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                              <th className="p-4 font-semibold">Name</th>
                              <th className="p-4 font-semibold text-center">Math</th>
                              <th className="p-4 font-semibold text-center">CS</th>
                              <th className="p-4 font-semibold text-center">Physics</th>
                              <th className="p-4 font-semibold text-center">Average</th>
                              <th className="p-4 font-semibold text-center">GPA</th>
                              <th className="p-4 font-semibold text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((s) => {
                              const avg = Number(calculateStudentAvg(s));
                              return (
                                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                  <td className="p-4 font-medium text-slate-900 flex items-center gap-2">
                                    <div className="w-7 h-7 bg-purple-100 text-primary rounded-full flex items-center justify-center text-xs font-bold uppercase">
                                      {s.name.slice(0, 2)}
                                    </div>
                                    {s.name}
                                  </td>
                                  <td className="p-4 text-center">{s.math}</td>
                                  <td className="p-4 text-center">{s.cs}</td>
                                  <td className="p-4 text-center">{s.physics}</td>
                                  <td className="p-4 text-center font-bold text-slate-900">{avg}%</td>
                                  <td className="p-4 text-center">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getGPAColor(avg)}`}>
                                      {avg >= 90 ? 'A+' : avg >= 80 ? 'B' : 'C'}
                                    </span>
                                  </td>
                                  <td className="p-4 text-center">
                                    <button
                                      onClick={() => handleRemoveStudent(s.id)}
                                      className="p-1 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all text-slate-400"
                                    >
                                      <Trash className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. STOCK TRADING PLATFORM SIMULATION */}
                {project.id === 'stock-trading' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center space-y-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Cash Balance</span>
                        <div className="text-3xl font-extrabold text-on-surface">${balance.toLocaleString()}</div>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">Buying Power Max</span>
                      </div>

                      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center space-y-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Portfolio Value</span>
                        <div className="text-3xl font-extrabold text-primary">${calculatePortfolioValue().toLocaleString()}</div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 animate-spin text-primary" /> Live Updating
                        </span>
                      </div>

                      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <span className="text-xs font-bold text-slate-700 block mb-3 uppercase">Your Shares</span>
                        <div className="space-y-2 max-h-28 overflow-y-auto">
                          {Object.keys(holdings).map((sym) => (
                            <div key={sym} className="flex justify-between items-center text-sm">
                              <span className="font-bold text-slate-700">{sym}</span>
                              <span className="text-slate-500">{holdings[sym]} shares</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm uppercase">Live Market Desk</h4>
                        <div className="space-y-3">
                          {Object.keys(stockPrices).map((sym) => {
                            const isPositive = Math.random() > 0.4;
                            return (
                              <div key={sym} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100/70 transition-all">
                                <div>
                                  <div className="font-bold text-slate-800">{sym}</div>
                                  <div className="text-xs text-slate-400">${stockPrices[sym]} / share</div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`text-xs font-bold flex items-center gap-0.5 ${isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
                                    {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                    {isPositive ? '+1.2%' : '-0.8%'}
                                  </span>
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleStockTrade(sym, 'BUY', 1)}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-all"
                                    >
                                      Buy
                                    </button>
                                    <button
                                      onClick={() => handleStockTrade(sym, 'SELL', 1)}
                                      className="bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-all"
                                    >
                                      Sell
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
                        <h4 className="font-bold text-slate-800 text-sm uppercase mb-4">Transaction Logs</h4>
                        <div className="flex-grow space-y-2 overflow-y-auto max-h-[250px] pr-2">
                          {transactions.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-center text-center text-slate-400 py-10">
                              <DollarSign className="w-8 h-8 opacity-20 mb-2" />
                              <p className="text-xs">No trades made yet. Use the Buy/Sell buttons on the left!</p>
                            </div>
                          ) : (
                            transactions.map((tx) => (
                              <div key={tx.id} className="flex justify-between items-center text-xs p-2.5 border-b border-slate-100 bg-slate-50/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[9px] ${tx.type === 'BUY' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                                    {tx.type}
                                  </span>
                                  <span className="font-bold text-slate-800">{tx.qty} {tx.symbol}</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-slate-700">${(tx.qty * tx.price).toFixed(2)}</div>
                                  <div className="text-[10px] text-slate-400">{tx.time}</div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. AI CHATBOT SIMULATION */}
                {project.id === 'ai-chatbot' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
                      {/* Messages screen */}
                      <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((m, index) => (
                          <div key={index} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl p-3.5 text-sm ${
                              m.sender === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-slate-100 text-slate-800 rounded-bl-none'
                            }`}>
                              <p className="leading-relaxed">{m.text}</p>
                              {m.code && (
                                <pre className="mt-3 p-3 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg overflow-x-auto border border-slate-800">
                                  <code>{m.code}</code>
                                </pre>
                              )}
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-slate-100 text-slate-500 rounded-2xl rounded-bl-none p-3 text-xs flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Prompts list */}
                      <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleSendChat('What is NLP?')}
                          className="bg-white hover:bg-purple-50 text-slate-600 hover:text-primary text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-primary/30 transition-all font-medium flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-primary" /> Explain NLP
                        </button>
                        <button
                          onClick={() => handleSendChat('Show Java snippet')}
                          className="bg-white hover:bg-purple-50 text-slate-600 hover:text-primary text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-primary/30 transition-all font-medium flex items-center gap-1"
                        >
                          <Code className="w-3 h-3 text-primary" /> Java OOP Snippet
                        </button>
                        <button
                          onClick={() => handleSendChat("What are Arunkumar's skills?")}
                          className="bg-white hover:bg-purple-50 text-slate-600 hover:text-primary text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-primary/30 transition-all font-medium flex items-center gap-1"
                        >
                          <User className="w-3 h-3 text-primary" /> List Arunkumar's Skills
                        </button>
                      </div>

                      {/* Chat Input form */}
                      <div className="p-3 border-t border-slate-100 bg-white flex gap-2">
                        <input
                          type="text"
                          placeholder="Type a prompt or message..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                          className="flex-grow text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-all text-on-surface"
                        />
                        <button
                          onClick={() => handleSendChat()}
                          className="bg-primary text-white p-2.5 rounded-xl hover:opacity-90 transition-all"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. HOTEL RESERVATION SYSTEM SIMULATION */}
                {project.id === 'hotel-reservation' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-12 gap-6">
                      <div className="md:col-span-5 bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm uppercase">Booking Form Desk</h4>
                        <form onSubmit={handleAddBooking} className="space-y-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Guest Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rahul Kumar"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary transition-all text-on-surface"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Room Class</label>
                              <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 outline-none"
                              >
                                <option value="Standard Room">Standard ($100)</option>
                                <option value="Deluxe Room">Deluxe ($150)</option>
                                <option value="Executive Suite">Executive ($250)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Nights</label>
                              <input
                                type="number"
                                min="1"
                                max="30"
                                value={nights}
                                onChange={(e) => setNights(Math.max(1, Number(e.target.value)))}
                                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 outline-none text-center"
                              />
                            </div>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1">
                            <div className="flex justify-between">
                              <span>Base rate:</span>
                              <span className="font-bold">${roomRates[roomType] || 100} / night</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Nights:</span>
                              <span className="font-bold">x{nights}</span>
                            </div>
                            <div className="flex justify-between text-sm text-primary font-bold border-t border-slate-200 pt-1.5 mt-1.5">
                              <span>Simulated Total:</span>
                              <span>${(roomRates[roomType] || 100) * nights}</span>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-container text-white text-xs font-bold py-2.5 rounded-lg transition-all"
                          >
                            Add Booking SQL Record
                          </button>
                        </form>
                      </div>

                      <div className="md:col-span-7 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col">
                        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700 uppercase">Live Bookings Table</span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full uppercase border border-emerald-100">
                            SQL Active Sync
                          </span>
                        </div>
                        <div className="overflow-x-auto max-h-[300px]">
                          <table className="w-full text-left text-xs text-slate-600">
                            <thead>
                              <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-3 font-semibold">ID</th>
                                <th className="p-3 font-semibold">Guest</th>
                                <th className="p-3 font-semibold">Room Class</th>
                                <th className="p-3 font-semibold text-center">Nights</th>
                                <th className="p-3 font-semibold text-right">Total</th>
                                <th className="p-3 font-semibold text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.map((b) => (
                                <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-all">
                                  <td className="p-3 font-bold text-slate-800">{b.id}</td>
                                  <td className="p-3 font-medium text-slate-900">{b.guest}</td>
                                  <td className="p-3 text-slate-600">{b.room}</td>
                                  <td className="p-3 text-center">{b.nights}</td>
                                  <td className="p-3 text-right font-bold text-slate-900">${b.total}</td>
                                  <td className="p-3 text-center">
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-50 text-primary border border-purple-100">
                                      {b.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
