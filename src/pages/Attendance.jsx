import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight,
  Target,
  ArrowRight,
  TrendingUp,
  Settings,
  Clock,
  CalendarDays,
  ChevronDown,
  Calendar,
  DollarSign,
  Activity,
  Shield,
  Fingerprint,
  Lock,
  Plus,
  MapPin,
  Sparkles,
  Smartphone,
  Search,
  Menu,
  Power,
  Bell,
  Play,
  Key,
  X,
  CreditCard,
  Wifi,
  Eye,
  Edit2,
  Download,
  IndianRupee,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import r1 from '../img/asg-1.png';
import a2 from '../img/asg-2.png';
import a3 from '../img/asg-3.png';
import r4 from '../img/asg-4.png';

// Dashboard mock data
const initialColumns = [
  { id: 'present', title: 'Present Today', count: 142 },
  { id: 'remote', title: 'Remote Work', count: 45 },
  { id: 'leave', title: 'On Leave', count: 12 },
  { id: 'late', title: 'Late / Missing', count: 3 },
];

const mockEmployees = [
  { id: 1, name: 'Alex Johnson', role: 'Senior Developer', status: 'present', time: '09:00 AM', source: 'Office HQ' },
  { id: 2, name: 'Sarah Williams', role: 'Product Manager', status: 'remote', time: '08:45 AM', source: 'Home Network' },
  { id: 3, name: 'Michael Chen', role: 'UX Designer', status: 'leave', time: 'Sick Leave', source: 'System Auto' },
  { id: 4, name: 'Emma Davis', role: 'Marketing Lead', status: 'late', time: 'Expected 10:30', source: 'Mobile App' },
];

const features = [
  {
    image: r1,
    title: "Effortless Time Tracking",
    description: "Employees can clock in and out with a single click or through mobile devices. Automated tracking ensures extreme accuracy.",
    color: "from-indigo-900/30 to-purple-900/30",
    glow: "bg-indigo-500/10"
  },
  {
    image: a2,
    title: "Smart Leave Management",
    description: "Request, approve, and track time off effortlessly. Built-in policies automatically calculate accruals and balances in real-time.",
    color: "from-blue-900/30 to-cyan-900/30",
    glow: "bg-blue-500/10"
  },
  {
    image: a3,
    title: "One-Click Payroll",
    description: "Convert approved timesheets into payroll instantly. Automated calculations, deductions, and reporting make payday a breeze.",
    color: "from-emerald-900/30 to-teal-900/30",
    glow: "bg-emerald-500/10"
  },
  {
    image: r4,
    title: "Advanced Analytics",
    description: "Spot attendance trends, monitor overtime costs, and generate compliance reports with our powerful built-in dashboard.",
    color: "from-fuchsia-900/30 to-pink-900/30",
    glow: "bg-fuchsia-500/10"
  }
];

const faqs = [
  {
    question: "How does the geo-location & remote attendance tracking work?",
    answer: "Our system allows remote employees to clock in via their web browser or mobile app. Optional geo-fencing can restrict clock-ins to authorized job sites or client locations."
  },
  {
    question: "Can we configure custom shift schedules and rosters?",
    answer: "Yes. The platform supports dynamic shift scheduling, rotating rosters, night shifts, and flexible hours, complete with automated notifications to employees when schedules change."
  },
  {
    question: "How are overtime hours and late check-ins calculated?",
    answer: "Overtime rules and late arrival thresholds can be customized in the settings. The system automatically tracks discrepancies between rostered hours and actual work hours, calculating compensation accordingly."
  },
  {
    question: "Does the leave management system support dynamic accruals?",
    answer: "Absolutely. You can define custom leave policies (sick leave, casual leave, paid time off, etc.) with automatic monthly/annual accruals, half-day options, and multi-level approval workflows."
  },
  {
    question: "Can attendance logs be integrated directly with payroll processing?",
    answer: "Yes, this is a core capability. Approved timesheets, regularizations, and leave balances are pushed to the payroll engine in one click, automating tax deductions and generating payslips."
  },
  {
    question: "How do employees request regularization for missed check-ins?",
    answer: "Employees can submit regularization requests directly through their portal with optional reason codes and attachments. Managers receive instant notifications to review and approve."
  },
  {
    question: "Does the system support biological or external biometric devices?",
    answer: "Yes, our infrastructure layer provides secure APIs to integrate seamlessly with external physical biometric devices, syncing attendance logs in real time."
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
  const [activeTab, setActiveTab] = useState('leave');
  const [permissions, setPermissions] = useState({
    dashboard: true,
    logs: false,
    viewEmployees: true,
    addEmployee: false,
    addHolidays: false,
    attendance: true,
    leaveApproval: true,
    shift: false,
    location: false,
    leaveManager: false
  });

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { id: 'leave', label: 'Leave', color: 'from-violet-500 to-indigo-500', glow: 'shadow-violet-500/20' },
    { id: 'holiday', label: 'Holiday', color: 'from-rose-500 to-pink-500', glow: 'shadow-rose-500/20' },
    { id: 'payroll', label: 'Payroll', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/20' },
    { id: 'activity', label: 'User Activity', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20' },
    { id: 'access', label: 'User Access', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
    { id: 'shift', label: 'Shift', color: 'from-fuchsia-500 to-purple-500', glow: 'shadow-fuchsia-500/20' }
  ];

  const getLaptopContent = () => {
    switch (activeTab) {
      case 'leave':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-semibold text-white">Leave Approvals Dashboard</span>
              </div>
              <span className="bg-violet-500/10 text-violet-400 text-[8px] px-1.5 py-0.5 rounded-full border border-violet-500/20 font-bold">2 PENDING</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="space-y-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between hover:border-violet-500/30 transition-all">
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h4 className="font-medium text-white text-[10px]">Jane Doe</h4>
                      <p className="text-[8px] text-gray-400">Flu recovery • 3 Days</p>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded font-medium border border-emerald-500/20">Approved</span>
                  </div>
                  <div className="text-[8px] text-gray-400 italic">"Medical certificate attached."</div>
                </div>

                <div className="bg-white/5 border border-violet-500/30 rounded-xl p-2 flex flex-col justify-between hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h4 className="font-medium text-white text-[10px]">Mark Smith</h4>
                      <p className="text-[8px] text-gray-400">Annual Leave • 5 Days</p>
                    </div>
                    <span className="bg-amber-500/10 text-amber-400 text-[8px] px-1.5 py-0.5 rounded font-medium border border-amber-500/20">Pending</span>
                  </div>
                  <p className="text-[8px] text-gray-400 italic mb-1.5">"Family vacation. Overlapping with Mark M."</p>
                  <div className="flex gap-1.5 justify-end">
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded transition-colors">Approve</button>
                    <button className="bg-rose-600 hover:bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded transition-colors">Reject</button>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1.5 text-[9px] uppercase tracking-wider">Leave Balance Heatmap</h4>
                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span>Annual Leave Utilization</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-violet-500 h-full rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span>Sick Leave Claims</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[8px] text-gray-400">
                  <span>📅 Calendar active</span>
                  <span className="text-violet-400 hover:underline cursor-pointer">Configure Policies →</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'holiday':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-white">Upcoming Holidays & Offtimes</span>
              </div>
              <span className="text-gray-400 text-[8px]">Year 2026</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="space-y-1.5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold border border-rose-500/20 text-[8px]">H</div>
                    <div>
                      <h4 className="font-medium text-white text-[9px]">Holi Festival</h4>
                      <p className="text-[7px] text-gray-400">Spring Break • national</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 font-semibold">March 14</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold border border-rose-500/20 text-[8px]">I</div>
                    <div>
                      <h4 className="font-medium text-white text-[9px]">Independence Day</h4>
                      <p className="text-[7px] text-gray-400">National Holiday</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-400 font-semibold">August 15</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between hover:border-rose-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold border border-rose-500/20 text-[8px]">D</div>
                    <div>
                      <h4 className="font-medium text-white text-[9px]">Diwali Holidays</h4>
                      <p className="text-[7px] text-gray-400">Festival of Lights • 3 Days</p>
                    </div>
                  </div>
                  <span className="text-[8px] text-rose-400 font-semibold">Oct 23-25</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1.5 text-[9px] uppercase tracking-wider">Holiday Sync Integrations</h4>
                  <p className="text-[8px] text-gray-400 leading-relaxed mb-2">Sync company holiday calendars dynamically with Google Calendar, Microsoft Outlook, and employee Slack channels instantly.</p>
                  <div className="flex gap-1">
                    <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[7px] font-bold text-gray-300">Google Sync Active</span>
                    <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[7px] font-bold text-gray-300">Slack Bot</span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[8px] text-gray-400">
                  <span>📅 Calendar synced</span>
                  <span className="text-rose-400 hover:underline cursor-pointer">Manage Calendars →</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payroll':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">Automated Payroll Command Console</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-bold font-sans">₹ INR ACTIVE</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1.5 pl-1">Name</th>
                      <th className="pb-1.5">Role</th>
                      <th className="pb-1.5 text-center">Working Days</th>
                      <th className="pb-1.5 text-center">Leaves</th>
                      <th className="pb-1.5 text-right">Monthly Salary</th>
                      <th className="pb-1.5 text-right">Calculated Salary</th>
                      <th className="pb-1.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "kardam nithin", role: "Senior Developer", days: 26, leaves: 0, monthly: "₹1,20,000", calculated: "₹1,20,000" },
                      { name: "Saquiba Wasi", role: "React Dev", days: 25, leaves: 1, monthly: "₹90,000", calculated: "₹86,538" },
                      { name: "Mark Smith", role: "UI Architect", days: 24, leaves: 2, monthly: "₹1,50,000", calculated: "₹1,38,461" },
                      { name: "Jane Doe", role: "PM Lead", days: 26, leaves: 0, monthly: "₹1,40,000", calculated: "₹1,40,000" },
                      { name: "Alex Kumar", role: "Lead PM", days: 23, leaves: 3, monthly: "₹1,60,000", calculated: "₹1,41,538" }
                    ].map((emp, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors text-[8px]">
                        <td className="py-2 pl-1 font-medium text-white">{emp.name}</td>
                        <td className="py-2 text-gray-400">{emp.role}</td>
                        <td className="py-2 text-center font-mono font-bold text-gray-300">{emp.days}</td>
                        <td className="py-2 text-center font-mono font-bold text-rose-400">{emp.leaves}</td>
                        <td className="py-2 text-right font-mono font-semibold text-gray-400">{emp.monthly}</td>
                        <td className="py-2 text-right font-mono font-bold text-emerald-400">{emp.calculated}</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2">
                            <Eye className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer transition-colors" title="View Details" />
                            <Edit2 className="w-3 h-3 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" title="Edit Roster" />
                            <Download className="w-3 h-3 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" title="Download Payslip" />
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
                <span className="font-semibold text-white">Live Workforce Activity Log</span>
              </div>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-emerald-400 text-[8px] font-bold uppercase">LIVE FEED</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow overflow-hidden">
              <div className="md:col-span-2 space-y-1 overflow-y-auto no-scrollbar max-h-[140px]">
                {/* 1. kardam nithin payslip downloaded */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="font-semibold text-white">kardam nithin</span>
                    <span className="text-gray-300 font-medium">Downloaded Payslip</span>
                  </div>
                  <span className="text-blue-400 font-bold">10:15 AM • Portal</span>
                </div>

                {/* 2. Saquiba Wasi applied for leave */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="font-semibold text-white">Saquiba Wasi</span>
                    <span className="text-gray-300 font-medium">Applied for Leave</span>
                  </div>
                  <span className="text-amber-400 font-bold">10:32 AM • System</span>
                </div>

                {/* 3. Sarah Jenkins */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="font-medium text-white">Sarah Jenkins</span>
                    <span className="text-gray-400">Clocked In</span>
                  </div>
                  <span className="text-gray-500">9:02 AM • HQ</span>
                </div>

                {/* 4. Alex Johnson */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="font-medium text-white">Alex Johnson</span>
                    <span className="text-gray-400">Clocked In</span>
                  </div>
                  <span className="text-gray-500">9:15 AM • Remote</span>
                </div>

                {/* 5. David Miller */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between text-[8px] hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span className="font-medium text-white">David Miller</span>
                    <span className="text-gray-400">Missed Clock-in Alert</span>
                  </div>
                  <span className="text-gray-500">9:42 AM • System</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1 text-[8px] uppercase tracking-wider">Presence Metric</h4>
                  <div className="text-center py-0.5">
                    <p className="text-xl font-bold text-blue-400 tracking-tight">142/155</p>
                    <p className="text-[7px] text-gray-400">Active Online</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1 flex justify-center text-[8px] text-blue-400 cursor-pointer hover:underline">
                  <span>View Activity Map →</span>
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
                <span className="font-bold text-slate-800">Security & Permission Matrix</span>
              </div>
              <span className="bg-purple-100 text-purple-700 text-[7px] px-1.5 py-0.5 rounded-full border border-purple-200/50 font-extrabold tracking-wider">SECURE LAYER</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 flex-grow overflow-hidden mb-1">
              {/* Card 1 */}
              <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-[0_1px_4px_rgba(147,51,234,0.03)] flex flex-col hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 border-b border-purple-50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[7.5px] uppercase tracking-wider leading-none">ADMIN: DASHBOARD</h4>
                </div>
                
                <div className="space-y-1">
                  <div 
                    onClick={() => togglePermission('dashboard')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.dashboard 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.dashboard && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.dashboard ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Admin Dashboard
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('logs')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.logs 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.logs && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.logs ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      User Activity Logs
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-[0_1px_4px_rgba(147,51,234,0.03)] flex flex-col hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 border-b border-purple-50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[7.5px] uppercase tracking-wider leading-none">ADMIN: EMPLOYEE</h4>
                </div>
                
                <div className="space-y-1">
                  <div 
                    onClick={() => togglePermission('viewEmployees')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.viewEmployees 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.viewEmployees && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.viewEmployees ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      View All Employees
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('addEmployee')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.addEmployee 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.addEmployee && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.addEmployee ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Add New Employee
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('addHolidays')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.addHolidays 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.addHolidays && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.addHolidays ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Add New Holidays
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-[0_1px_4px_rgba(147,51,234,0.03)] flex flex-col hover:border-purple-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 border-b border-purple-50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[7.5px] uppercase tracking-wider leading-none">ADMIN: OPERATIONS</h4>
                </div>
                
                <div className="space-y-1 overflow-y-auto no-scrollbar max-h-[110px]">
                  <div 
                    onClick={() => togglePermission('attendance')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.attendance 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.attendance && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.attendance ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Manage Attendance
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('leaveApproval')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.leaveApproval 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.leaveApproval && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.leaveApproval ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Leave Approval
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('shift')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.shift 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.shift && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.shift ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Shift Management
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('location')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.location 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.location && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.location ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Location Management
                    </span>
                  </div>

                  <div 
                    onClick={() => togglePermission('leaveManager')}
                    className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      permissions.leaveManager 
                        ? 'border-purple-500 bg-white' 
                        : 'border-slate-300 bg-white group-hover:border-purple-300'
                    }`}>
                      {permissions.leaveManager && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-medium transition-colors select-none ${
                      permissions.leaveManager ? 'text-slate-800 font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}>
                      Leave Approval By Manager
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'shift':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                <span className="font-semibold text-white">Shift Roster Planner</span>
              </div>
              <span className="bg-fuchsia-500/10 text-fuchsia-400 text-[8px] px-1.5 py-0.5 rounded-full border border-fuchsia-500/20 font-bold uppercase tracking-wider font-sans">Active Rosters</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1.5 pl-1">Name</th>
                      <th className="pb-1.5">Dept</th>
                      <th className="pb-1.5">Desig</th>
                      <th className="pb-1.5 text-center">Shift</th>
                      <th className="pb-1.5 text-center">Time</th>
                      <th className="pb-1.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "NARESH", dept: "Laboratory Medicine", desig: "Phlebotomist", shift: "F", time: "14:00-23:00" },
                      { name: "Kardam Nithin", dept: "Engineering", desig: "Senior Developer", shift: "M", time: "09:00-18:00" },
                      { name: "Saquiba Wasi", dept: "Engineering", desig: "React Dev", shift: "G", time: "10:00-19:00" },
                      { name: "Sarah Williams", dept: "Product Management", desig: "Product Lead", shift: "G", time: "10:00-19:00" },
                      { name: "Alex Johnson", dept: "Design Studio", desig: "UX Architect", shift: "N", time: "22:00-06:00" }
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors text-[8px]">
                        <td className="py-2 pl-1 font-bold text-white uppercase">{item.name}</td>
                        <td className="py-2 text-gray-300">{item.dept}</td>
                        <td className="py-2 text-gray-400">{item.desig}</td>
                        <td className="py-2 text-center font-mono font-bold text-fuchsia-400">{item.shift}</td>
                        <td className="py-2 text-center font-mono font-semibold text-gray-300">{item.time}</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2.5">
                            <Edit2 className="w-3 h-3 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" title="Edit Shift" />
                            <Trash2 className="w-3 h-3 text-gray-400 hover:text-rose-400 cursor-pointer transition-colors" title="Delete Roster" />
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
      case 'leave':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Leave Hub</span>
                <Plus className="w-3 h-3 text-violet-400 cursor-pointer" />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center mb-2.5">
                <p className="text-[7px] text-gray-400 uppercase tracking-widest">ANNUAL DAYS</p>
                <p className="text-xl font-bold text-violet-400 mt-0.5">14 / 20</p>
                <p className="text-[7px] text-gray-500 mt-0.5">DAYS REMAINING</p>
              </div>

              <div className="space-y-1 text-[8px]">
                <div className="bg-white/5 rounded p-1.5 flex justify-between">
                  <span>Sick Leave</span>
                  <span className="text-emerald-400">Approved</span>
                </div>
                <div className="bg-white/5 rounded p-1.5 flex justify-between">
                  <span>Annual Trip</span>
                  <span className="text-amber-400">Pending</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              New Request
            </button>
          </div>
        );
      case 'holiday':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Holidays</span>
                <Calendar className="w-3 h-3 text-rose-400" />
              </div>

              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2 text-center mb-2">
                <p className="text-[7px] text-rose-400 uppercase tracking-wider font-bold">NEXT HOLIDAY</p>
                <p className="text-[10px] font-bold text-white mt-0.5">Holi Festival</p>
                <p className="text-[7px] text-gray-400 mt-0.5">In 12 Days (Friday)</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-gray-400">Enjoy a beautiful 3-day long weekend with your family!</p>
              </div>
            </div>
            
            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Sync Calendar
            </button>
          </div>
        );
      case 'payroll':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5 select-none">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Payslip Portal</span>
                <Smartphone className="w-3 h-3 text-emerald-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6px] text-gray-400 uppercase tracking-widest font-bold">LATEST PAYROLL</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">₹1,20,000</p>
                <p className="text-[6px] text-emerald-400 font-semibold mt-0.5">kardam nithin • Paid</p>
              </div>

              <div className="space-y-0.5 text-[6.5px] bg-black/40 rounded-xl p-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Base</span>
                  <span className="text-white">₹1,20,000</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-0.5">
                  <span className="text-gray-400">Leaves Taken</span>
                  <span className="text-rose-400 font-bold">0 Days</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-emerald-400 font-bold">Net Payout</span>
                  <span className="text-emerald-400 font-bold">₹1,20,000</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 rounded-xl text-[8px] mt-1 transition-colors flex items-center justify-center gap-0.5">
              <Download className="w-2.5 h-2.5" /> DOWNLOAD PAYSLIP
            </button>
          </div>
        );

      case 'activity':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Time Clock</span>
                <MapPin className="w-3 h-3 text-blue-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-2">
                <p className="text-[7px] text-gray-400 uppercase tracking-widest">SHIFT TIMER</p>
                <p className="text-base font-mono font-bold text-blue-400 mt-0.5">08:42:15</p>
                <p className="text-[6px] text-emerald-400 mt-0.5 flex items-center justify-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span> IP Verified
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-blue-300">📍 Location: Office HQ</p>
              </div>
            </div>
            
            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors flex items-center justify-center gap-0.5 shadow-lg shadow-rose-500/20">
              <Power className="w-2.5 h-2.5" /> CLOCK OUT
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
              {/* Card 1 */}
              <div className="bg-white border border-slate-100 rounded-lg p-1.5 shadow-[0_1px_3px_rgba(147,51,234,0.02)]">
                <div className="flex items-center gap-1 mb-1 border-b border-purple-50 pb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[6.5px] uppercase tracking-wider">Dashboard</h4>
                </div>
                
                <div className="space-y-0.5">
                  <div 
                    onClick={() => togglePermission('dashboard')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.dashboard ? 'text-slate-800' : 'text-slate-400'}`}>Admin Dashboard</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.dashboard ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.dashboard && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('logs')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.logs ? 'text-slate-800' : 'text-slate-400'}`}>Activity Logs</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.logs ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.logs && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-100 rounded-lg p-1.5 shadow-[0_1px_3px_rgba(147,51,234,0.02)]">
                <div className="flex items-center gap-1 mb-1 border-b border-purple-50 pb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[6.5px] uppercase tracking-wider">Employee</h4>
                </div>
                
                <div className="space-y-0.5">
                  <div 
                    onClick={() => togglePermission('viewEmployees')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.viewEmployees ? 'text-slate-800' : 'text-slate-400'}`}>View Employees</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.viewEmployees ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.viewEmployees && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('addEmployee')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.addEmployee ? 'text-slate-800' : 'text-slate-400'}`}>Add Employee</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.addEmployee ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.addEmployee && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('addHolidays')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.addHolidays ? 'text-slate-800' : 'text-slate-400'}`}>Add Holidays</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.addHolidays ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.addHolidays && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-100 rounded-lg p-1.5 shadow-[0_1px_3px_rgba(147,51,234,0.02)]">
                <div className="flex items-center gap-1 mb-1 border-b border-purple-50 pb-1">
                  <span className="w-1 h-1 rounded-full bg-[#A855F7]"></span>
                  <h4 className="font-extrabold text-[#7C3AED] text-[6.5px] uppercase tracking-wider">Operations</h4>
                </div>
                
                <div className="space-y-0.5">
                  <div 
                    onClick={() => togglePermission('attendance')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.attendance ? 'text-slate-800' : 'text-slate-400'}`}>Attendance</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.attendance ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.attendance && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('leaveApproval')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.leaveApproval ? 'text-slate-800' : 'text-slate-400'}`}>Leave Approval</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.leaveApproval ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.leaveApproval && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('shift')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.shift ? 'text-slate-800' : 'text-slate-400'}`}>Shift Management</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.shift ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.shift && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('location')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.location ? 'text-slate-800' : 'text-slate-400'}`}>Location</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.location ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.location && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>

                  <div 
                    onClick={() => togglePermission('leaveManager')}
                    className="flex items-center justify-between py-0.5 px-1 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span className={`font-semibold text-[6.5px] ${permissions.leaveManager ? 'text-slate-800' : 'text-slate-400'}`}>Manager Leave</span>
                    <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${permissions.leaveManager ? 'border-purple-500' : 'border-slate-300'}`}>
                      {permissions.leaveManager && <div className="w-1 h-1 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'shift':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5 select-none">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Active Shift</span>
                <Clock className="w-3 h-3 text-fuchsia-400 font-bold" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6px] text-gray-400 uppercase tracking-widest font-bold">CURRENT ROSTER</p>
                <p className="text-[10px] font-bold text-fuchsia-400 mt-0.5">NARESH</p>
                <p className="text-[6px] text-fuchsia-400 font-semibold mt-0.5">Shift F • 14:00-23:00</p>
              </div>

              <div className="space-y-0.5 text-[6.5px] bg-black/40 rounded-xl p-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Department</span>
                  <span className="text-white">Lab Medicine</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-0.5">
                  <span className="text-gray-400">Designation</span>
                  <span className="text-white">Phlebotomist</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-fuchsia-400 font-bold">Shift Timings</span>
                  <span className="text-fuchsia-400 font-bold">14:00 - 23:00</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-1 rounded-xl text-[8px] mt-1 transition-colors flex items-center justify-center gap-0.5">
              <Clock className="w-2.5 h-2.5" /> CLOCK IN SHIFT
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
          <span className="text-sm text-blue-300 font-medium">Modular Workforce Command</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Everything, Integrated.
        </h2>
        <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
          Manage attendance, rosters, compliance, and direct payroll deposits in one unified screen. Review active device synchronization below.
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
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
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
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">Time & Compensation</span>
              </div>
              
              <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                Attendance & Payroll.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Reimagined.</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Track hours, manage leaves, and automate payroll seamlessly. Eliminate manual data entry and ensure everyone gets paid accurately, on time.
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

          {/* DASHBOARD VISUALIZATION SECTION */}
          <section className="px-6 max-w-[1400px] mx-auto mb-20 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Monitor in Real-Time</h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">Keep an eye on who is working, who is late, and who is on leave with our intuitive daily dashboard.</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto md:mx-0"></div>
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
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">Everything you need to know about the attendance, compensation, and payroll ecosystem.</p>
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
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000"></div>
              
              <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300 font-medium">Accounting Integration</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Timesheets approved! <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Now what?</span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                  Push your payroll data directly into your accounting ledger. Generate payslips, calculate taxes, and issue payments without opening another app.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Seamless transition to Accounting</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Automated tax deduction logic</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> One-click payslip distribution</li>
                </ul>
              </div>
              
              <div className="flex-1 relative z-10 w-full">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
                   <div className="flex flex-col gap-4">
                      {/* Fake UI elements */}
                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">AJ</div>
                          <div>
                            <p className="text-white font-medium">Alex Johnson</p>
                            <p className="text-xs text-gray-400">October Payroll</p>
                          </div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">Paid</span>
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

          {/* FINAL CTA SECTION */}
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
                  Ready to automate <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">your payroll?</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Join millions of users who are already saving hours every week on attendance and payroll management.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <Link to="/contact" className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                    Start Automating Now
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

export default Attendance;