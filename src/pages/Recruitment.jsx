import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Search,
  FileText,
  Mail,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Settings,
  Star,
  ChevronDown,
  Layers,
  Globe,
  FileUp,
  Award,
  Smartphone,
  Plus,
  Sparkles,
  Wifi,
  Power,
  X,
  Check,
  Activity,
  Shield,
  Fingerprint,
  MapPin,
  Copy,
  Share2,
  Eye,
  Trash2,
  Edit2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import r1 from '../img/rr-1.png';
import r2 from '../img/rr-2.png';
import r3 from '..//img/rr-4.png';
import r4 from '../img/rr-3.png';

// Kanban Board mock data
const initialColumns = [
  { id: 'new', title: 'Initial Qualification', count: 12 },
  { id: 'first', title: 'First Interview', count: 5 },
  { id: 'second', title: 'Second Interview', count: 2 },
  { id: 'offer', title: 'Contract Proposal', count: 1 },
];

const mockCandidates = [
  { id: 1, name: 'Alex Johnson', role: 'Senior Developer', status: 'new', rating: 4, source: 'LinkedIn' },
  { id: 2, name: 'Sarah Williams', role: 'Product Manager', status: 'first', rating: 5, source: 'Website' },
  { id: 3, name: 'Michael Chen', role: 'UX Designer', status: 'second', rating: 4, source: 'Referral' },
  { id: 4, name: 'Emma Davis', role: 'Marketing Lead', status: 'offer', rating: 5, source: 'Agency' },
];

const features = [
  {
    image: r1,
    title: "Don't waste time typing",
    description: "Automatic data importing means less typing. When applicants apply online, their info is indexed automatically. Resumes and cover letters are attached to their card instantly.",
    color: "from-indigo-900/30 to-purple-900/30",
    glow: "bg-indigo-500/10"
  },
  {
    image: r2,
    title: "Spend less time managing posts, more time hiring",
    description: "Easily publish and manage job postings while letting candidates choose interview slots that work best for them. Our seamless calendar integration keeps everything in sync and prevents double bookings.",
    color: "from-blue-900/30 to-cyan-900/30",
    glow: "bg-blue-500/10"
  },
  {
    image: r3,
    title: "Smart applicant pipelines",
    description: "Automatically capture and organize all incoming applications while posting jobs. Set up custom stages with automated actions—send emails, screen candidates, and move applicants through the pipeline seamlessly without manual effort.",
    color: "from-emerald-900/30 to-teal-900/30",
    glow: "bg-emerald-500/10"
  },
  {
    image: r4,
    title: "Less scheduling, more interviewing",
    description: "Let candidates pick a time that suits them best while our calendar integration avoids double bookings. Evaluate applicants with built-in scoring, manage interviews seamlessly, and generate offer letters—all in one streamlined hiring flow.",
    color: "from-fuchsia-900/30 to-pink-900/30",
    glow: "bg-fuchsia-500/10"
  }
];

const faqs = [
  {
    question: "What recruitment features are included in this application?",
    answer: "The application includes candidate tracking, job posting management, resume parsing, automated workflows, candidate communication, and recruitment analytics from one unified dashboard."
  },
  {
    question: "Can we schedule interviews through this application?",
    answer: "Yes, recruiters can schedule interviews directly from the platform with calendar integration, automated reminders, and candidate time-slot selection."
  },
  {
    question: "Can candidates apply and upload resumes online?",
    answer: "Yes, candidates can apply online and upload resumes directly through the recruitment portal. The system automatically stores and organizes applicant information."
  },
  {
    question: "Does the system support automated candidate tracking?",
    answer: "Yes, the platform automatically tracks candidates across different recruitment stages such as screening, interviews, shortlisting, and hiring."
  },
  {
    question: "Can we manage multiple job postings from one dashboard?",
    answer: "Absolutely. You can create, publish, and manage multiple job postings across different platforms from a single dashboard."
  },
  {
    question: "Does the application send interview reminders and notifications?",
    answer: "Yes, automated email notifications and interview reminders can be sent to candidates and recruiters."
  },
  {
    question: "Can recruiters search and filter candidates easily?",
    answer: "Yes, recruiters can quickly search, filter, and organize candidates based on skills, experience, status, and other criteria."
  },
  {
    question: "Does the platform provide recruitment reports and analytics?",
    answer: "Yes, the application provides detailed recruitment reports, hiring analytics, candidate pipeline tracking, and performance insights."
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 bg-[#111113]/50 backdrop-blur-md rounded-2xl overflow-hidden mb-4"
    >
      <button 
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none group"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WorkforceShowcase = () => {
  const [activeTab, setActiveTab] = useState('applicants');

  const tabs = [
    { id: 'applicants', label: 'Job Applicants', color: 'from-violet-500 to-indigo-500', glow: 'shadow-violet-500/20' },
    { id: 'jobpost', label: 'Job Postings', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20' },
    { id: 'parser', label: 'Resume Parser', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/20' },
    { id: 'interviews', label: 'Interviews', color: 'from-rose-500 to-pink-500', glow: 'shadow-rose-500/20' },
    { id: 'scorecards', label: 'Scorecards', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
    { id: 'assessment', label: 'Assessment', color: 'from-fuchsia-500 to-purple-500', glow: 'shadow-fuchsia-500/20' }
  ];

  const getLaptopContent = () => {
    switch (activeTab) {
      case 'applicants':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-semibold text-white">Active Job Applicants</span>
              </div>
              <span className="bg-violet-500/10 text-violet-400 text-[8px] px-1.5 py-0.5 rounded-full border border-violet-500/20 font-bold">5 ACTIVE APPLICANTS</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1.5 pl-1">Name</th>
                      <th className="pb-1.5">Applied Role</th>
                      <th className="pb-1.5">Assessment Score</th>
                      <th className="pb-1.5">Status</th>
                      <th className="pb-1.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "kardam nithin", role: "Senior Developer", score: "83 / 100", status: "Shortlisted", statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
                      { name: "Saquiba Wasi", role: "React Dev", score: "94 / 100", status: "Screening", statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                      { name: "Mark Smith", role: "UI Architect", score: "92 / 100", status: "Interviewed", statusColor: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
                      { name: "Jane Doe", role: "Lead PM", score: "89 / 100", status: "Pending", statusColor: "bg-white/10 text-gray-400 border-white/10" },
                      { name: "Alex Kumar", role: "Lead PM", score: "97 / 100", status: "Hired", statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
                    ].map((cand, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors text-[8px]">
                        <td className="py-2 pl-1 font-medium text-white">{cand.name}</td>
                        <td className="py-2 text-gray-300">{cand.role}</td>
                        <td className="py-2 font-mono font-bold text-violet-400">{cand.score}</td>
                        <td className="py-2">
                          <span className={`px-1 py-0.5 rounded text-[6.5px] font-bold border ${cand.statusColor}`}>{cand.status}</span>
                        </td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2">
                            <Eye className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer transition-colors" title="View Option" />
                            <FileText className="w-3 h-3 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" title="Resume" />
                            <Award className="w-3 h-3 text-gray-400 hover:text-violet-400 cursor-pointer transition-colors" title="Score" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'jobpost':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">Multi-Channel Job Postings</span>
              </div>
              <span className="bg-blue-500/10 text-blue-400 text-[8px] px-1.5 py-0.5 rounded-full border border-blue-500/20 font-bold">12 ACTIVE JOBS</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="space-y-1.5 overflow-y-auto no-scrollbar max-h-[120px]">
                {[
                  { title: "Senior React Architect", type: "Full-Time", boards: "LinkedIn, Glassdoor, Indeed", status: "Active" },
                  { title: "UX/UI Lead Designer", type: "Full-Time", boards: "LinkedIn, Dribbble", status: "Active" },
                  { title: "HR Operations Manager", type: "Full-Time", boards: "Indeed", status: "Draft" }
                ].map((row, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 rounded-lg p-2 flex items-center justify-between text-[8px] hover:border-blue-500/30 transition-all">
                    <div>
                      <h4 className="font-semibold text-white text-[9px]">{row.title}</h4>
                      <p className="text-gray-400 text-[7px]">{row.type} • Syndicated to: {row.boards}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-2 border-r border-white/10 pr-2 mr-0.5">
                        <Copy className="w-3 h-3 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" title="Copy Link" />
                        <Share2 className="w-3 h-3 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors" title="Share Link" />
                        <Eye className="w-3 h-3 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" title="View Option" />
                        <Edit2 className="w-3 h-3 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" title="Edit Option" />
                        <Trash2 className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" title="Delete Option" />
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold border ${
                        row.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-white/10 text-gray-400 border-white/10'
                      }`}>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-1.5 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[8px] px-2.5 py-1 rounded transition-colors">Create New Post</button>
              </div>
            </div>
          </div>
        );
      case 'parser':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <FileUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">AI Profile & Resume Parser</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">96% FIT INDEX</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-white text-[10px]">Saquiba Wasi</h4>
                      <p className="text-[7px] text-gray-400">Senior React Engineer • 5.4 Yrs Exp</p>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded font-bold border border-emerald-500/20">Gold Match</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[7px]">
                      <span>Extracted Core Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {["React", "TailwindCSS", "Node.js", "System Design", "Webpack"].map((sk) => (
                        <span key={sk} className="bg-white/5 border border-white/10 rounded px-1 py-0.5 text-[6px] text-gray-300">{sk}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1 flex items-center justify-between text-[7px] text-gray-500 font-mono">
                  <span>📄 PDF Document Ingested</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between overflow-hidden">
                <h4 className="font-semibold text-white mb-1 text-[8px] uppercase tracking-wider">Scanned Document Text Preview</h4>
                <div className="bg-black/40 border border-white/5 rounded p-1.5 flex-grow overflow-y-auto no-scrollbar font-mono text-[6px] text-gray-500 italic leading-relaxed">
                  "Senior Frontend Architect with extensive experience designing and deploying high-performance enterprise dashboards with React, Redux, and Framer Motion. Expert in modular web applications..."
                </div>
              </div>
            </div>
          </div>
        );
       case 'interviews':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-white">Interactive Interview Calendar</span>
              </div>
              <span className="bg-rose-500/10 text-rose-400 text-[8px] px-1.5 py-0.5 rounded-full border border-rose-500/20 font-bold">2 TODAY</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow overflow-hidden">
              <div className="bg-white/5 border border-rose-500/20 rounded-xl p-2.5 flex flex-col justify-between overflow-y-auto no-scrollbar max-h-[140px]">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-white text-[9px]">kardam nithin</h4>
                      <p className="text-[7px] text-gray-400">Interview Invitation - Timely Health</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-[7px] text-gray-400">
                    <p className="font-mono text-[7px] text-rose-400">📅 30-05-2026 10:00 (Scheduled)</p>
                    <p className="leading-tight mt-1 text-[6.5px]">📍 TH, Corporate. - Falt No: 301, 3rd Floor, Sri Sai Balaji A</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 mt-1.5">
                  <div className="flex justify-between items-center text-[7px] text-gray-400">
                    <span>Interview Stage:</span>
                    <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded font-bold border border-rose-500/20">Technical Round</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white text-[8px] uppercase tracking-wider mb-1">Interview Assessment</h4>
                  <div className="space-y-1 text-[7px]">
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Appearance (10)</span>
                      <span className="text-rose-400 font-bold">9 / 10</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Knowledge (10)</span>
                      <span className="text-rose-400 font-bold">9 / 10</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Score (100)</span>
                      <span className="text-rose-400 font-bold">92 / 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating (10)</span>
                      <span className="text-rose-400 font-bold">9.2 / 10</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[7px] border-t border-white/5 pt-1.5">
                  <span>Status:</span>
                  <span className="bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded font-bold border border-rose-500/30">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'scorecards':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">Unified Candidate Scorecards</span>
              </div>
              <span className="bg-amber-500/10 text-amber-400 text-[8px] px-1.5 py-0.5 rounded-full border border-amber-500/20 font-bold">9.2 RATING</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white text-[8px] uppercase tracking-wider mb-1">Mark Smith Evaluation</h4>
                  <div className="space-y-1 text-[7px]">
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Appearance (10)</span>
                      <span className="text-amber-400 font-bold">9 / 10</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Knowledge (10)</span>
                      <span className="text-amber-400 font-bold">9 / 10</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Score (100)</span>
                      <span className="text-amber-400 font-bold">92 / 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating (10)</span>
                      <span className="text-amber-400 font-bold">9.2 / 10</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[7px] border-t border-white/5 pt-1.5">
                  <span>Status:</span>
                  <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">Shortlisted</span>
                </div>
              </div>

              <div className="bg-white/5 border border-amber-500/20 rounded-xl p-2.5 flex flex-col justify-between overflow-hidden">
                <h4 className="font-semibold text-white mb-1 text-[8px] uppercase tracking-wider">Recruiter Feedback</h4>
                <p className="text-[7px] text-gray-400 italic leading-relaxed">"Extremely solid knowledge of system design. Recommending immediate offer proposal."</p>
                <div className="border-t border-white/5 pt-1 mt-1 text-[6px] text-amber-400 text-right">
                  - Saidulu R. (Admin)
                </div>
              </div>
            </div>
          </div>
        );
      case 'assessment':
        return (
          <div className="h-full flex flex-col bg-[#f8fafc] text-slate-800 rounded-xl p-2.5 font-sans border border-gray-200 select-none overflow-y-auto no-scrollbar">
            {/* Header Panel */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
              <div className="flex items-center">
                <span className="bg-rose-50 border border-rose-150 text-rose-600 rounded px-1.5 py-0.5 font-bold text-[7px] leading-none">Q3</span>
                <span className="text-[#0f172a] text-[8.5px] font-semibold ml-1.5">A patient is scared of needle pricks. How do you handle this?</span>
              </div>
              <span className="text-rose-600 text-[7px] font-bold tracking-wider shrink-0">✗ INCORRECT</span>
            </div>

            {/* Multiple Choice Cards list */}
            <div className="space-y-1.5">
              {/* Option A (Correct, not selected) */}
              <div className="bg-white border border-emerald-500 rounded-lg p-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">A</span>
                  <div className="w-3 h-3 rounded-full border border-emerald-500 flex items-center justify-center bg-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[7px]">Calmly explain & reassure</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider">✓ CORRECT ANSWER</span>
              </div>

              {/* Option B (Unselected) */}
              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">B</span>
                  <div className="w-3 h-3 rounded-full border border-gray-300 bg-white"></div>
                  <span className="text-slate-600 font-medium text-[7px]">Ask them to relax</span>
                </div>
              </div>

              {/* Option C (Selected Incorrectly) */}
              <div className="bg-[#fff8f8] border border-rose-300 rounded-lg p-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">C</span>
                  <div className="w-3 h-3 rounded-full border border-rose-500 flex items-center justify-center bg-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-rose-700 font-bold text-[7px]">Proceed quickly</span>
                </div>
                <span className="bg-rose-50 text-rose-700 border border-rose-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider">✗ SELECTED INCORRECTLY</span>
              </div>

              {/* Option D (Unselected) */}
              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">D</span>
                  <div className="w-3 h-3 rounded-full border border-gray-300 bg-white"></div>
                  <span className="text-slate-600 font-medium text-[7px]">Joke about it</span>
                </div>
              </div>

              {/* Option E (Unselected) */}
              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">E</span>
                  <div className="w-3 h-3 rounded-full border border-gray-300 bg-white"></div>
                  <span className="text-slate-600 font-medium text-[7px]">Ignore fear</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getPhoneContent = () => {
    switch (activeTab) {
      case 'applicants':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Job Applicants</span>
                <Users className="w-3 h-3 text-violet-400 cursor-pointer" />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center mb-2">
                <p className="text-[6.5px] text-gray-400 uppercase tracking-widest font-bold">TOTAL APPLICANTS</p>
                <p className="text-base font-bold text-violet-400 mt-0.5">5 Active</p>
              </div>

              <div className="space-y-1.5 max-h-[90px] overflow-y-auto no-scrollbar">
                {[
                  { name: "kardam nithin", score: "83/100" },
                  { name: "Saquiba Wasi", score: "94/100" },
                  { name: "Mark Smith", score: "92/100" }
                ].map((cand, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-black/45 rounded-lg p-1.5 border border-white/5 text-[7.5px]">
                    <span className="text-white font-medium truncate max-w-[65px]">{cand.name}</span>
                    <span className="text-violet-400 font-bold font-mono">{cand.score}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-1.5 rounded-xl text-[8.5px] mt-1 transition-colors leading-none">
              View All Registry
            </button>
          </div>
        );
      case 'jobpost':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Job Postings</span>
                <Globe className="w-3 h-3 text-blue-400" />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-2 text-center mb-2">
                <p className="text-[7px] text-blue-400 uppercase tracking-wider font-bold">ACTIVE LISTINGS</p>
                <p className="text-[10px] font-bold text-white mt-0.5">12 Live Jobs</p>
                <p className="text-[7px] text-gray-400 mt-0.5">3 Drafts</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-gray-400">All feeds active. Syndicated to LinkedIn, Glassdoor, and Indeed.</p>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Publish New Job
            </button>
          </div>
        );
      case 'parser':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Parser Live</span>
                <Smartphone className="w-3 h-3 text-emerald-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center mb-2">
                <p className="text-[7px] text-gray-400 uppercase tracking-widest">INGEST STATUS</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">SUCCESS</p>
                <p className="text-[6px] text-emerald-400 font-semibold mt-0.5">SAQUIBA WASI</p>
              </div>

              <div className="space-y-1 text-[8px] font-mono bg-black/40 rounded-xl p-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span>Match index</span>
                  <span className="text-emerald-400">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>Extract Skills</span>
                  <span className="text-white">Yes</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Approve Profile
            </button>
          </div>
        );
      case 'interviews':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Interviews</span>
                <Calendar className="w-3 h-3 text-rose-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6px] text-gray-400 uppercase tracking-widest">NEXT SESSION</p>
                <p className="text-[9px] font-bold text-white mt-0.5">kardam nithin</p>
                <p className="text-[6px] text-rose-400 mt-0.5 flex items-center justify-center gap-0.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span> 10:00 AM Start
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-1.5 text-center text-[6px] mb-1.5">
                <p className="text-rose-300 truncate">📍 TH, Corporate. - Falt No: 301, 3rd Floor, Sri Sai Balaji A</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 space-y-0.5 text-[6.5px]">
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Appearance (10)</span>
                  <span className="text-rose-400 font-bold">9</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Knowledge (10)</span>
                  <span className="text-rose-400 font-bold">9</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Score (100)</span>
                  <span className="text-rose-400 font-bold">92</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Rating (10)</span>
                  <span className="text-rose-400 font-bold">9.2</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Status:</span>
                  <span className="text-rose-400 font-bold">Scheduled</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors flex items-center justify-center gap-0.5 shadow-lg shadow-rose-500/20">
              <Power className="w-2.5 h-2.5" /> Avilable For Interview
            </button>
          </div>
        );
      case 'scorecards':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Evaluation</span>
                <Award className="w-3 h-3 text-amber-400" />
              </div>

              <div className="bg-gradient-to-br from-amber-500/15 to-orange-600/25 rounded-xl p-1.5 text-center mb-1.5 border border-amber-500/20">
                <p className="text-[8px] font-bold text-white leading-none">Mark Smith</p>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 space-y-0.5 text-[6.5px]">
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Appearance (10)</span>
                  <span className="text-amber-400 font-bold">9</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Knowledge (10)</span>
                  <span className="text-amber-400 font-bold">9</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Score (100)</span>
                  <span className="text-amber-400 font-bold">92</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Rating (10)</span>
                  <span className="text-amber-400 font-bold">9.2</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Status:</span>
                  <span className="text-amber-400 font-bold">Shortlisted</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Submit Review
            </button>
          </div>
        );
      case 'assessment':
        return (
          <div className="h-full flex flex-col justify-between bg-[#f8fafc] text-slate-800 rounded-2xl p-2 font-sans border border-gray-200 select-none overflow-y-auto no-scrollbar">
            <div>
              {/* Header Panel */}
              <div className="flex items-center justify-between border-b border-gray-250 pb-1.5 mb-1.5">
                <div className="flex items-center">
                  <span className="bg-rose-50 border border-rose-150 text-rose-600 rounded px-1 py-0.5 font-bold text-[6.5px] leading-none">Q3</span>
                  <span className="text-[#0f172a] text-[7.5px] font-semibold ml-1">patient needle scared...</span>
                </div>
                <span className="text-rose-600 text-[6.5px] font-bold shrink-0">✗ INCORRECT</span>
              </div>

              {/* Option A (Correct, not selected) */}
              <div className="bg-white border border-emerald-500 rounded-lg p-1 mb-1 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6px] font-bold">A</span>
                  <div className="w-2.5 h-2.5 rounded-full border border-emerald-500 flex items-center justify-center bg-white">
                    <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[6.5px]">Calmly explain & reassure</span>
                </div>
              </div>

              {/* Option C (Selected Incorrectly) */}
              <div className="bg-[#fff8f8] border border-rose-300 rounded-lg p-1 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6px] font-bold">C</span>
                  <div className="w-2.5 h-2.5 rounded-full border border-rose-500 flex items-center justify-center bg-white">
                    <div className="w-1 h-1 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-rose-700 font-bold text-[6.5px]">Proceed quickly</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1 rounded-xl text-[7.5px] mt-1 transition-colors leading-none">
              Next Question
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative pt-20 border-t border-white/5">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-blue-500/30"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300 font-medium">Modular Recruitment Command</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Everything, Integrated.
        </h2>
        <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
          Manage job listings, parsed applicant profiles, calendar invite timeslots, feedback scorecards, and clinical assessment evaluations in one unified screen.
        </p>
      </div>

      <div className="relative w-full max-w-[720px] mx-auto mb-16 px-6 pt-10">
        <div className="absolute inset-10 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-[80px] opacity-70 pointer-events-none -z-10 animate-pulse duration-[8000ms]"></div>
        
        <motion.div 
          key={`laptop-${activeTab}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[580px] aspect-[16/10] bg-[#1e1e1f] rounded-t-[1.25rem] border-[8px] border-[#2d2d2e] shadow-2xl flex flex-col overflow-hidden z-10"
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black z-30"></div>
          
          <div className="flex-grow bg-[#000000] p-4 text-left select-none overflow-y-auto no-scrollbar pt-5 border border-white/5 flex flex-col justify-between">
            {getLaptopContent()}
          </div>
          
          <div className="relative w-[110%] left-[-5%] h-[10px] bg-[#3a3a3b] rounded-b-xl border-t border-white/10 shadow-xl z-20"></div>
        </motion.div>

        <motion.div 
          key={`phone-${activeTab}`}
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute right-[-10px] md:right-[-25px] bottom-[-25px] w-[130px] md:w-[165px] aspect-[9/19] bg-[#1c1c1e] rounded-[1.8rem] border-[5px] border-[#2c2c2e] shadow-2xl overflow-hidden flex flex-col z-20"
        >
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full z-40 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-gray-900"></span>
          </div>
          
          <div className="flex-grow bg-[#000000] p-3 text-left overflow-y-auto no-scrollbar pt-6 select-none border border-white/5">
            {getPhoneContent()}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto pt-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md ${
                isActive
                  ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

const Recruitment = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };
  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        <main className="pb-32">
          
          {/* HERO SECTION */}
          <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center relative py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300 font-medium">Applicant Tracking System</span>
              </div>
              
              <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                Recruitment.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Reimagined.</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Source and hire the best talents with an agile, AI-powered pipeline. Streamline everything from job postings to contract signatures on one unified platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0 mt-8">
                <Link to="/contact" className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center gap-2 group">
                  Book Demo
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/price" className="w-full sm:w-auto bg-[#1c1c1e] text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105 text-center">
                  Start for Free
                </Link>
              </div>
            </motion.div>
          </section>

          {/* KANBAN VISUALIZATION SECTION */}
          <section className="px-6 max-w-[1400px] mx-auto mb-20 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Visualize the Pipeline</h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">Keep applicants organized. Drag and drop candidates across stages, or let automated actions move them for you.</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-[#111113]/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-white/10 shadow-2xl shadow-indigo-500/10 overflow-hidden"
            >
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x no-scrollbar">
                {initialColumns.map((col, index) => (
                  <div key={col.id} className="min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="font-semibold text-lg text-white/90">{col.title}</h3>
                      <span className="bg-white/10 text-xs px-2.5 py-1 rounded-full text-gray-300 font-medium">{col.count}</span>
                    </div>
                    
                    <div className="space-y-4">
                      {mockCandidates.filter(c => c.status === col.id).map((candidate, idx) => (
                        <motion.div 
                          key={candidate.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1) }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-purple-500/30 hover:bg-white/10 transition-all shadow-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-white">{candidate.name}</h4>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < candidate.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-4">{candidate.role}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {candidate.source}</span>
                            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">2 days ago</span>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* End of cards */}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ALTERNATING FEATURES SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto mb-40 relative z-20">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-24 w-full text-center">
              All the features done right.
            </h2>
            
            <div className="flex flex-col gap-32">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* IMAGE SIDE */}
                  <div className="flex-1 w-full relative group">
                    <div className={`absolute -inset-4 ${feature.glow} rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111113]/50 backdrop-blur-sm p-4">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-auto object-cover rounded-xl drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* TEXT SIDE */}
                  <div className="flex-1 w-full text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                      <span className="text-sm text-gray-300 font-medium">Feature {idx + 1}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                      {feature.description}
                    </p>
                    <div className="mt-8">
                      <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* WORKFORCE SHOWCASE SECTION */}
          <WorkforceShowcase />

          {/* FAQ SECTION */}
          <section className="px-6 max-w-[900px] mx-auto mb-32 z-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">Everything you need to know about the recruitment ecosystem.</p>
            </div>
            
            <div className="flex flex-col">
              {faqs.map((faq, idx) => (
                <FAQItem 
                  key={idx} 
                  faq={faq} 
                  isOpen={activeFaq === idx} 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} 
                />
              ))}
            </div>
          </section>

          {/* INTEGRATION SHOWCASE */}
          <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full bg-[#111113] rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-1000"></div>
              
              <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300 font-medium">Reporting & Onboarding</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  You're hired! <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Now what?</span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                  Turn a candidate into an employee with a single click. Launch their onboarding process, assign equipment, and set up payroll instantly because everything is connected.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Seamless transition to HR module</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Deep reporting & analytics</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Fleet and asset assignment</li>
                </ul>
              </div>
              
              <div className="flex-1 relative z-10 w-full">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
                   <div className="flex flex-col gap-4">
                      {/* Fake UI elements */}
                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">SD</div>
                          <div>
                            <p className="text-white font-medium">Sarah Davis</p>
                            <p className="text-xs text-gray-400">Offer Accepted</p>
                          </div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">Hired</span>
                      </div>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <Users className="w-5 h-5 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2"></div>
                            <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <Settings className="w-5 h-5 text-purple-400" />
                          <div className="flex-1">
                            <div className="h-2 w-2/3 bg-white/10 rounded-full mb-2"></div>
                            <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* FINAL CTA SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto z-20 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-blue-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
                  Ready to build your <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">dream team?</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Join millions of users who are already streamlining their recruitment processes.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <Link to="/contact" className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                    Start Hiring Now
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/price" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                    Meet an Advisor
                  </Link>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </motion.div>
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Recruitment;