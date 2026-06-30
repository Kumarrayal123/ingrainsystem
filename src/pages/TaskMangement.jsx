import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Settings,
  Clock,
  CalendarDays,
  ChevronDown,
  Calendar,
  Activity,
  Shield,
  Plus,
  MapPin,
  Sparkles,
  Smartphone,
  Power,
  Eye,
  Edit2,
  Download,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import r1 from '../img/t1.png';
import a2 from '../img/t2.png';
import a3 from '../img/t3.png';
import r4 from '../img/t4.png';

// Dashboard mock data
const initialColumns = [
  { id: 'todo', title: 'To Do', count: 24 },
  { id: 'progress', title: 'In Progress', count: 18 },
  { id: 'review', title: 'In Review', count: 7 },
  { id: 'done', title: 'Completed', count: 42 },
];

const mockEmployees = [
  { id: 1, name: 'Alex Johnson', role: 'Frontend Developer', status: 'progress', time: 'Due 4:30 PM', source: 'Website Revamp' },
  { id: 2, name: 'Sarah Williams', role: 'Product Manager', status: 'todo', time: 'Due Tomorrow', source: 'Sprint Planning' },
  { id: 3, name: 'Michael Chen', role: 'UX Designer', status: 'review', time: 'Waiting Approval', source: 'Mobile Redesign' },
  { id: 4, name: 'Emma Davis', role: 'Marketing Lead', status: 'done', time: 'Completed 11:10 AM', source: 'Launch Campaign' },
  { id: 5, name: 'David Miller', role: 'QA Engineer', status: 'progress', time: 'Blocked', source: 'Testing Cycle' },
  { id: 6, name: 'Jane Doe', role: 'Business Analyst', status: 'todo', time: 'Due Monday', source: 'Requirement Mapping' },
];

const features = [
  {
    image: r1,
    title: 'Effortless Task Planning',
    description: 'Create tasks, assign owners, set priorities, and organize workflows in minutes. Keep every team member aligned from day one.',
    color: 'from-indigo-900/30 to-purple-900/30',
    glow: 'bg-indigo-500/10'
  },
  {
    image: a2,
    title: 'Smart Workflow Automation',
    description: 'Automate repetitive actions like status updates, reminders, task handoffs, and due-date alerts so your team can focus on real work.',
    color: 'from-blue-900/30 to-cyan-900/30',
    glow: 'bg-blue-500/10'
  },
  {
    image: a3,
    title: 'Team Collaboration Hub',
    description: 'Centralize comments, files, approvals, and discussions directly inside each task. No more scattered updates across multiple tools.',
    color: 'from-emerald-900/30 to-teal-900/30',
    glow: 'bg-emerald-500/10'
  },
  {
    image: r4,
    title: 'Advanced Productivity Analytics',
    description: 'Track team velocity, completion trends, workload balance, and bottlenecks with powerful dashboards and real-time reporting.',
    color: 'from-fuchsia-900/30 to-pink-900/30',
    glow: 'bg-fuchsia-500/10'
  }
];

const faqs = [
  {
    question: 'Can we manage tasks for remote and in-office teams together?',
    answer: 'Yes. The platform is designed for hybrid teams, allowing everyone to collaborate on the same tasks, timelines, files, and updates from anywhere.'
  },
  {
    question: 'Can we create custom workflows for different departments?',
    answer: 'Absolutely. You can configure separate task stages, priorities, labels, and approval flows for product, marketing, HR, operations, or any custom team.'
  },
  {
    question: 'Does it support recurring tasks and automated reminders?',
    answer: 'Yes. You can schedule recurring tasks, automate reminders before deadlines, and trigger follow-up actions when statuses change.'
  },
  {
    question: 'Can managers track workload across team members?',
    answer: 'Yes. Managers can monitor assigned tasks, overdue work, workload distribution, and team progress through visual dashboards and reporting tools.'
  },
  {
    question: 'Is there a timeline or sprint planning view?',
    answer: 'Yes. Teams can plan work using kanban boards, sprint views, deadline calendars, and timeline-based execution tracking.'
  },
  {
    question: 'Can team members comment and attach files to tasks?',
    answer: 'Yes. Every task supports discussions, file uploads, notes, updates, and activity history so collaboration stays organized in one place.'
  },
  {
    question: 'Does the system support permissions and role-based access?',
    answer: 'Yes. Admins can control who can create projects, assign tasks, edit workflows, view reports, and manage team activity through role-based permissions.'
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
        <span className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
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
  const [activeTab, setActiveTab] = useState('tasks');
  const [permissions, setPermissions] = useState({
    dashboard: true,
    logs: false,
    viewProjects: true,
    createTask: false,
    createSprint: false,
    tasks: true,
    approvals: true,
    timeline: false,
    reports: false,
    teamLead: false
  });

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { id: 'tasks', label: 'Tasks' },
    { id: 'sprints', label: 'Sprints' },
    { id: 'board', label: 'Board' },
    { id: 'activity', label: 'Activity' },
    { id: 'access', label: 'User Access' },
    { id: 'timeline', label: 'Timeline' }
  ];

  const getLaptopContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-semibold text-white">Task Assignment Dashboard</span>
              </div>
              <span className="bg-violet-500/10 text-violet-400 text-[8px] px-1.5 py-0.5 rounded-full border border-violet-500/20 font-bold">5 OPEN</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="space-y-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between hover:border-violet-500/30 transition-all">
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h4 className="font-medium text-white text-[10px]">Landing Page Audit</h4>
                      <p className="text-[8px] text-gray-400">Assigned to Sarah • High Priority</p>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded font-medium border border-emerald-500/20">Completed</span>
                  </div>
                  <div className="text-[8px] text-gray-400 italic">"Final review notes uploaded."</div>
                </div>

                <div className="bg-white/5 border border-violet-500/30 rounded-xl p-2 flex flex-col justify-between hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h4 className="font-medium text-white text-[10px]">API Integration</h4>
                      <p className="text-[8px] text-gray-400">Assigned to Alex • Due Today</p>
                    </div>
                    <span className="bg-amber-500/10 text-amber-400 text-[8px] px-1.5 py-0.5 rounded font-medium border border-amber-500/20">In Progress</span>
                  </div>
                  <p className="text-[8px] text-gray-400 italic mb-1.5">"Waiting on staging credentials."</p>
                  <div className="flex gap-1.5 justify-end">
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded transition-colors">Mark Done</button>
                    <button className="bg-rose-600 hover:bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded transition-colors">Reassign</button>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1.5 text-[9px] uppercase tracking-wider">Completion Overview</h4>
                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span>Sprint Progress</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-violet-500 h-full rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span>Blocked Tasks</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[8px] text-gray-400">
                  <span>Board synced</span>
                  <span className="text-violet-400 hover:underline cursor-pointer">Manage Workflow →</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sprints':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-white">Sprint Planning Center</span>
              </div>
              <span className="text-gray-400 text-[8px]">Sprint 12</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="space-y-1.5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold border border-rose-500/20 text-[8px]">S1</div>
                    <div>
                      <h4 className="font-medium text-white text-[9px]">UI Modernization</h4>
                      <p className="text-[7px] text-gray-400">8 tasks • design sprint</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 font-semibold">Jul 1</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold border border-rose-500/20 text-[8px]">S2</div>
                    <div>
                      <h4 className="font-medium text-white text-[9px]">Backend Cleanup</h4>
                      <p className="text-[7px] text-gray-400">5 tasks • engineering</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 font-semibold">Jul 3</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold border border-rose-500/20 text-[8px]">S3</div>
                    <div>
                      <h4 className="font-medium text-white text-[9px]">Release Prep</h4>
                      <p className="text-[7px] text-gray-400">QA + launch tasks</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-rose-400 font-semibold">Jul 6</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1.5 text-[9px] uppercase tracking-wider">Sprint Sync</h4>
                  <p className="text-[8px] text-gray-400 leading-relaxed mb-2">
                    Coordinate sprint goals, backlog priorities, and milestone planning across product, engineering, and operations teams.
                  </p>
                  <div className="flex gap-1">
                    <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[7px] font-bold text-gray-300">Backlog Active</span>
                    <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[7px] font-bold text-gray-300">Review Ready</span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[8px] text-gray-400">
                  <span>Milestones mapped</span>
                  <span className="text-rose-400 hover:underline cursor-pointer">Manage Sprints →</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'board':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">Kanban Project Board</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">LIVE BOARD</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1.5 pl-1">Task</th>
                      <th className="pb-1.5">Owner</th>
                      <th className="pb-1.5 text-center">Priority</th>
                      <th className="pb-1.5 text-center">Stage</th>
                      <th className="pb-1.5 text-right">Deadline</th>
                      <th className="pb-1.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { task: 'Design QA', owner: 'Nithin', priority: 'High', stage: 'Review', deadline: 'Today' },
                      { task: 'API Setup', owner: 'Saquiba', priority: 'High', stage: 'In Progress', deadline: 'Today' },
                      { task: 'Landing Copy', owner: 'Mark', priority: 'Medium', stage: 'To Do', deadline: 'Mon' },
                      { task: 'Release Notes', owner: 'Jane', priority: 'Low', stage: 'Done', deadline: 'Done' },
                      { task: 'Mobile Audit', owner: 'Alex', priority: 'Medium', stage: 'In Progress', deadline: 'Tue' }
                    ].map((emp, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors text-[8px]">
                        <td className="py-2 pl-1 font-medium text-white">{emp.task}</td>
                        <td className="py-2 text-gray-400">{emp.owner}</td>
                        <td className="py-2 text-center font-mono font-bold text-gray-300">{emp.priority}</td>
                        <td className="py-2 text-center font-mono font-bold text-emerald-400">{emp.stage}</td>
                        <td className="py-2 text-right font-mono font-semibold text-gray-400">{emp.deadline}</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2">
                            <Eye className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer transition-colors" title="View Task" />
                            <Edit2 className="w-3 h-3 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" title="Edit Task" />
                            <Download className="w-3 h-3 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" title="Export Task" />
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

      case 'activity':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">Live Team Activity Log</span>
              </div>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-emerald-400 text-[8px] font-bold uppercase">LIVE FEED</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow overflow-hidden">
              <div className="md:col-span-2 space-y-1 overflow-y-auto no-scrollbar max-h-[140px]">
                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="font-semibold text-white">kardam nithin</span>
                    <span className="text-gray-300 font-medium">Updated Task Status</span>
                  </div>
                  <span className="text-blue-400 font-bold">10:15 AM • Board</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="font-semibold text-white">Saquiba Wasi</span>
                    <span className="text-gray-300 font-medium">Created New Task</span>
                  </div>
                  <span className="text-amber-400 font-bold">10:32 AM • System</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="font-medium text-white">Sarah Jenkins</span>
                    <span className="text-gray-400">Completed Review</span>
                  </div>
                  <span className="text-gray-500">9:02 AM • Review</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="font-medium text-white">Alex Johnson</span>
                    <span className="text-gray-400">Moved Task to In Progress</span>
                  </div>
                  <span className="text-gray-500">9:15 AM • Workspace</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span className="font-medium text-white">David Miller</span>
                    <span className="text-gray-400">Task Blocked Alert</span>
                  </div>
                  <span className="text-gray-500">9:42 AM • System</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1 text-[8px] uppercase tracking-wider">Execution Metric</h4>
                  <div className="text-center py-0.5">
                    <p className="text-xl font-bold text-blue-400 tracking-tight">42/51</p>
                    <p className="text-[7px] text-gray-400">Tasks Active</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1 flex justify-center text-[8px] text-blue-400 cursor-pointer hover:underline">
                  <span>View Team Activity →</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'access':
        return (
          <div className="h-full flex flex-col text-[10px] font-sans p-1 bg-[#f8fafc] rounded-xl">
            <div className="flex items-center justify-between border-b border-purple-100 pb-1.5 mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                <span className="font-bold text-slate-800">Task Access & Permission Matrix</span>
              </div>
              <span className="bg-purple-100 text-purple-700 text-[7px] px-1.5 py-0.5 rounded-full border border-purple-200/50 font-extrabold tracking-wider">SECURE LAYER</span>
            </div>

            <div className="grid grid-cols-3 gap-2 flex-grow overflow-hidden mb-1">
              <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-[0_1px_4px_rgba(147,51,234,0.03)] flex flex-col hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 border-b border-purple-50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[7.5px] uppercase tracking-wider leading-none">ADMIN: DASHBOARD</h4>
                </div>

                <div className="space-y-1">
                  <div onClick={() => togglePermission('dashboard')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.dashboard ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.dashboard && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.dashboard ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Project Dashboard
                    </span>
                  </div>

                  <div onClick={() => togglePermission('logs')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.logs ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.logs && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.logs ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Team Activity Logs
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-[0_1px_4px_rgba(147,51,234,0.03)] flex flex-col hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 border-b border-purple-50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[7.5px] uppercase tracking-wider leading-none">ADMIN: PROJECTS</h4>
                </div>

                <div className="space-y-1">
                  <div onClick={() => togglePermission('viewProjects')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.viewProjects ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.viewProjects && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.viewProjects ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      View Projects
                    </span>
                  </div>

                  <div onClick={() => togglePermission('createTask')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.createTask ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.createTask && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.createTask ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Create Tasks
                    </span>
                  </div>

                  <div onClick={() => togglePermission('createSprint')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.createSprint ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.createSprint && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.createSprint ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Create Sprints
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-[0_1px_4px_rgba(147,51,234,0.03)] flex flex-col hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 border-b border-purple-50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[7.5px] uppercase tracking-wider leading-none">ADMIN: OPERATIONS</h4>
                </div>

                <div className="space-y-1 overflow-y-auto no-scrollbar max-h-[110px]">
                  <div onClick={() => togglePermission('tasks')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.tasks ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.tasks && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.tasks ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Manage Tasks
                    </span>
                  </div>

                  <div onClick={() => togglePermission('approvals')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.approvals ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.approvals && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.approvals ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Review Approvals
                    </span>
                  </div>

                  <div onClick={() => togglePermission('timeline')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.timeline ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.timeline && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.timeline ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Timeline Management
                    </span>
                  </div>

                  <div onClick={() => togglePermission('reports')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.reports ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.reports && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.reports ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      View Reports
                    </span>
                  </div>

                  <div onClick={() => togglePermission('teamLead')} className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${permissions.teamLead ? 'border-purple-500 bg-white' : 'border-slate-300 bg-white group-hover:border-purple-300'}`}>
                      {permissions.teamLead && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${permissions.teamLead ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      Team Lead Access
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                <span className="font-semibold text-white">Project Timeline Planner</span>
              </div>
              <span className="bg-fuchsia-500/10 text-fuchsia-400 text-[8px] px-1.5 py-0.5 rounded-full border border-fuchsia-500/20 font-bold uppercase tracking-wider">Active Timeline</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1.5 pl-1">Milestone</th>
                      <th className="pb-1.5">Team</th>
                      <th className="pb-1.5">Owner</th>
                      <th className="pb-1.5 text-center">Stage</th>
                      <th className="pb-1.5 text-center">Deadline</th>
                      <th className="pb-1.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Wireframes Finalized', dept: 'Design', desig: 'Michael', shift: 'Done', time: 'Jun 30' },
                      { name: 'API Integration', dept: 'Engineering', desig: 'Nithin', shift: 'Active', time: 'Jul 02' },
                      { name: 'QA Pass', dept: 'Testing', desig: 'David', shift: 'Pending', time: 'Jul 04' },
                      { name: 'Marketing Assets', dept: 'Marketing', desig: 'Emma', shift: 'Active', time: 'Jul 05' },
                      { name: 'Launch Approval', dept: 'Product', desig: 'Sarah', shift: 'Pending', time: 'Jul 06' }
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors text-[8px]">
                        <td className="py-2 pl-1 font-bold text-white">{item.name}</td>
                        <td className="py-2 text-gray-300">{item.dept}</td>
                        <td className="py-2 text-gray-400">{item.desig}</td>
                        <td className="py-2 text-center font-mono font-bold text-fuchsia-400">{item.shift}</td>
                        <td className="py-2 text-center font-mono font-semibold text-gray-300">{item.time}</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2.5">
                            <Edit2 className="w-3 h-3 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" title="Edit Milestone" />
                            <Trash2 className="w-3 h-3 text-gray-400 hover:text-rose-400 cursor-pointer transition-colors" title="Delete Milestone" />
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

      default:
        return null;
    }
  };

  const getPhoneContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">My Tasks</span>
                <Plus className="w-3 h-3 text-violet-400 cursor-pointer" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center mb-2.5">
                <p className="text-[7px] text-gray-400 uppercase tracking-widest">TODAY'S TASKS</p>
                <p className="text-xl font-bold text-violet-400 mt-0.5">8 / 12</p>
                <p className="text-[7px] text-gray-500 mt-0.5">COMPLETED</p>
              </div>

              <div className="space-y-1 text-[8px]">
                <div className="bg-white/5 rounded p-1.5 flex justify-between">
                  <span>UI Review</span>
                  <span className="text-emerald-400">Done</span>
                </div>
                <div className="bg-white/5 rounded p-1.5 flex justify-between">
                  <span>API Testing</span>
                  <span className="text-amber-400">Active</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Add Task
            </button>
          </div>
        );

      case 'sprints':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Sprint View</span>
                <Calendar className="w-3 h-3 text-rose-400" />
              </div>

              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2 text-center mb-2">
                <p className="text-[7px] text-rose-400 uppercase tracking-wider font-bold">CURRENT SPRINT</p>
                <p className="text-[10px] font-bold text-white mt-0.5">Sprint 12</p>
                <p className="text-[7px] text-gray-400 mt-0.5">Ends in 4 Days</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-gray-400">Milestones are on track across product and engineering.</p>
              </div>
            </div>

            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Open Sprint
            </button>
          </div>
        );

      case 'board':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5 select-none">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Board View</span>
                <Smartphone className="w-3 h-3 text-emerald-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6px] text-gray-400 uppercase tracking-widest font-bold">ACTIVE TASK</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">API Integration</p>
                <p className="text-[6px] text-emerald-400 font-semibold mt-0.5">Alex Johnson • In Progress</p>
              </div>

              <div className="space-y-0.5 text-[6.5px] bg-black/40 rounded-xl p-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Priority</span>
                  <span className="text-white">High</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-0.5">
                  <span className="text-gray-400">Stage</span>
                  <span className="text-rose-400 font-bold">In Progress</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-emerald-400 font-bold">Deadline</span>
                  <span className="text-emerald-400 font-bold">Today</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 rounded-xl text-[8px] mt-1 transition-colors flex items-center justify-center gap-0.5">
              <Download className="w-2.5 h-2.5" /> EXPORT BOARD
            </button>
          </div>
        );

      case 'activity':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Team Activity</span>
                <MapPin className="w-3 h-3 text-blue-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-2">
                <p className="text-[7px] text-gray-400 uppercase tracking-widest">LIVE UPDATES</p>
                <p className="text-base font-mono font-bold text-blue-400 mt-0.5">18 Events</p>
                <p className="text-[6px] text-emerald-400 mt-0.5 flex items-center justify-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span> Team Synced
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-blue-300">Workspace: Product Launch Board</p>
              </div>
            </div>

            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors flex items-center justify-center gap-0.5 shadow-lg shadow-rose-500/20">
              <Power className="w-2.5 h-2.5" /> VIEW LOGS
            </button>
          </div>
        );

      case 'access':
        return (
          <div className="h-full flex flex-col text-[7.5px] font-sans p-1 bg-[#f8fafc] rounded-2xl overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-purple-100 pb-1 mb-1.5 px-0.5">
              <div className="flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-purple-600 animate-pulse" />
                <span className="font-extrabold text-slate-800 text-[8px]">Permissions</span>
              </div>
              <span className="bg-purple-100 text-purple-700 text-[5px] px-1 py-0.2 rounded-full border border-purple-200/50 font-black">SECURE</span>
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar space-y-1.5 pr-0.5">
              <div className="bg-white border border-slate-100 rounded-lg p-1.5 shadow-[0_1px_3px_rgba(147,51,234,0.02)]">
                <div className="flex items-center gap-1 mb-1 border-b border-purple-50 pb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[6.5px] uppercase tracking-wider">Dashboard</h4>
                </div>

                <div className="space-y-0.5">
                  <div onClick={() => togglePermission('dashboard')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.dashboard ? 'text-slate-800' : 'text-slate-400'}`}>Project Dashboard</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.dashboard ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.dashboard && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('logs')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.logs ? 'text-slate-800' : 'text-slate-400'}`}>Activity Logs</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.logs ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.logs && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-lg p-1.5 shadow-[0_1px_3px_rgba(147,51,234,0.02)]">
                <div className="flex items-center gap-1 mb-1 border-b border-purple-50 pb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[6.5px] uppercase tracking-wider">Projects</h4>
                </div>

                <div className="space-y-0.5">
                  <div onClick={() => togglePermission('viewProjects')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.viewProjects ? 'text-slate-800' : 'text-slate-400'}`}>View Projects</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.viewProjects ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.viewProjects && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('createTask')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.createTask ? 'text-slate-800' : 'text-slate-400'}`}>Create Task</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.createTask ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.createTask && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('createSprint')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.createSprint ? 'text-slate-800' : 'text-slate-400'}`}>Create Sprint</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.createSprint ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.createSprint && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-lg p-1.5 shadow-[0_1px_3px_rgba(147,51,234,0.02)]">
                <div className="flex items-center gap-1 mb-1 border-b border-purple-50 pb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[6.5px] uppercase tracking-wider">Operations</h4>
                </div>

                <div className="space-y-0.5">
                  <div onClick={() => togglePermission('tasks')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.tasks ? 'text-slate-800' : 'text-slate-400'}`}>Tasks</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.tasks ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.tasks && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('approvals')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.approvals ? 'text-slate-800' : 'text-slate-400'}`}>Approvals</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.approvals ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.approvals && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('timeline')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.timeline ? 'text-slate-800' : 'text-slate-400'}`}>Timeline</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.timeline ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.timeline && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('reports')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.reports ? 'text-slate-800' : 'text-slate-400'}`}>Reports</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.reports ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.reports && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div onClick={() => togglePermission('teamLead')} className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
                    <span className={`font-semibold text-[6.5px] ${permissions.teamLead ? 'text-slate-800' : 'text-slate-400'}`}>Team Lead</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.teamLead ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.teamLead && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5 select-none">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Timeline</span>
                <Clock className="w-3 h-3 text-fuchsia-400 font-bold" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6px] text-gray-400 uppercase tracking-widest font-bold">NEXT MILESTONE</p>
                <p className="text-[10px] font-bold text-fuchsia-400 mt-0.5">Launch Approval</p>
                <p className="text-[6px] text-fuchsia-400 font-semibold mt-0.5">Due Jul 06</p>
              </div>

              <div className="space-y-0.5 text-[6.5px] bg-black/40 rounded-xl p-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Owner</span>
                  <span className="text-white">Sarah</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-0.5">
                  <span className="text-gray-400">Team</span>
                  <span className="text-white">Product</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-fuchsia-400 font-bold">Status</span>
                  <span className="text-fuchsia-400 font-bold">Pending</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-1 rounded-xl text-[8px] mt-1 transition-colors flex items-center justify-center gap-0.5">
              <Clock className="w-2.5 h-2.5" /> OPEN TIMELINE
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
          <span className="text-sm text-blue-300 font-medium">Modular Task Command</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Everything, Organized.
        </h2>
        <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
          Manage tasks, sprints, workflows, priorities, and team collaboration in one unified workspace. Review active project modules below.
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
                  ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
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

const Attendance = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        <main className="pb-32">
          <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center relative py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">Projects & Productivity</span>
              </div>

              <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                Task Management.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Reimagined.</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Plan work, assign responsibilities, track progress, and deliver projects faster - all from one seamless platform.
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

          <section className="px-6 max-w-[1400px] mx-auto mb-20 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Track Work in Real-Time</h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                See what is pending, what is moving, what needs review, and what has already been completed with a clean task dashboard.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="bg-[#111113]/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden"
            >
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x no-scrollbar">
                {initialColumns.map((col, index) => (
                  <div key={col.id} className="min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="font-semibold text-lg text-white/90">{col.title}</h3>
                      <span className="bg-white/10 text-xs px-2.5 py-1 rounded-full text-gray-300 font-medium">{col.count}</span>
                    </div>

                    <div className="space-y-4">
                      {mockEmployees.filter(c => c.status === col.id).map((emp, idx) => (
                        <motion.div
                          key={emp.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1) }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-blue-500/30 hover:bg-white/10 transition-all shadow-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-white">{emp.name}</h4>
                            <div className="flex gap-1 items-center bg-white/5 px-2 py-1 rounded-md">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-300">{emp.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-4">{emp.role}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {emp.source}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

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
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
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
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <WorkforceShowcase />

          <section className="px-6 max-w-[900px] mx-auto mb-32 z-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                Everything you need to know about the task management, planning, and team execution ecosystem.
              </p>
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

          <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full bg-[#111113] rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000"></div>

              <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300 font-medium">Workflow Integration</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Tasks assigned! <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Now what?</span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                  Move from planning to execution without switching tools. Coordinate updates, approvals, files, and reporting across your full workflow.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Seamless transition from planning to execution</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Automated reminders and task handoffs</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> One-click reporting for teams and managers</li>
                </ul>
              </div>

              <div className="flex-1 relative z-10 w-full">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">AJ</div>
                        <div>
                          <p className="text-white font-medium">Alex Johnson</p>
                          <p className="text-xs text-gray-400">Website Revamp Board</p>
                        </div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">On Track</span>
                    </div>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <CalendarDays className="w-5 h-5 text-blue-400" />
                        <div className="flex-1">
                          <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2"></div>
                          <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Settings className="w-5 h-5 text-emerald-400" />
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

          <section className="px-6 max-w-[1200px] mx-auto z-20 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-900/30 via-teal-900/30 to-emerald-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-1000"></div>

              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
                  Ready to simplify <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">your workflow?</span>
                </h2>

                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Join modern teams that are already delivering faster with organized planning, clear ownership, and smarter execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <Link to="/contact" className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                    Start Managing Better
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/price" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                    Talk to an Expert
                  </Link>
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
              ></div>
            </motion.div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;
