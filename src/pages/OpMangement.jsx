import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Activity,
  Shield,
  Plus,
  Sparkles,
  Smartphone,
  Eye,
  Edit2,
  Download,
  IndianRupee,
  ChevronDown,
  UserCheck,
  FileText,
  ClipboardList,
  Layers,
  HeartPulse,
  Building2,
  Search,
  Filter,
  Check,
  X,
  AlertCircle,
  Pill,
  Microscope,
  CalendarDays,
  Settings,
  Bell,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Mock Data for Live OPD Queue Columns
const initialOpColumns = [
  { id: 'waiting', title: 'Waiting in Queue', count: 18, color: 'text-amber-400', badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300' },
  { id: 'consulting', title: 'In Consultation', count: 5, color: 'text-cyan-400', badgeBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' },
  { id: 'completed', title: 'Completed Today', count: 42, color: 'text-emerald-400', badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' },
  { id: 'urgent', title: 'Priority / Emergency', count: 3, color: 'text-rose-400', badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-300' },
];

const mockOpPatients = [
  { id: 1, token: 'OP-104', name: 'Rajesh Sharma', age: '45 M', doctor: 'Dr. Priya Mehta (Cardiology)', status: 'waiting', time: '10:15 AM', dept: 'Cardiology', service: 'Follow-up ECG' },
  { id: 2, token: 'OP-105', name: 'Ananya Roy', age: '29 F', doctor: 'Dr. Arvind Rao (General Med)', status: 'waiting', time: '10:30 AM', dept: 'General OPD', service: 'Fever Consultation' },
  { id: 3, token: 'OP-101', name: 'Mohammed Ali', age: '52 M', doctor: 'Dr. Sneha Kapoor (Orthopedics)', status: 'consulting', time: 'Started 10:05 AM', dept: 'Orthopedics', service: 'Knee X-Ray Review' },
  { id: 4, token: 'OP-102', name: 'Kavita Reddy', age: '38 F', doctor: 'Dr. Priya Mehta (Cardiology)', status: 'consulting', time: 'Started 10:12 AM', dept: 'Cardiology', service: 'Echo Stress Test' },
  { id: 5, token: 'OP-094', name: 'Vikas Gupta', age: '61 M', doctor: 'Dr. Arvind Rao (General Med)', status: 'completed', time: '10:00 AM', dept: 'General OPD', service: 'Diabetes Regular' },
  { id: 6, token: 'OP-095', name: 'Sunita Patel', age: '34 F', doctor: 'Dr. Sunita Sen (Dermatology)', status: 'completed', time: '09:45 AM', dept: 'Dermatology', service: 'Skin Allergy' },
  { id: 7, token: 'EM-003', name: 'Ramesh Verma', age: '67 M', doctor: 'Dr. Priya Mehta (Cardiology)', status: 'urgent', time: 'Priority 10:20 AM', dept: 'Emergency / Triage', service: 'Chest Pain Triage' },
];

// Clinical Features List
const opFeatures = [
  {
    icon: Activity,
    badge: 'Real-Time Triage',
    title: 'Intelligent OP Dashboard & Live Queue',
    description: 'Transform chaotic OPD waiting halls into structured, real-time queues. Track live footfall, token movements, doctor consultation velocity, and emergency triage instantly on one central monitor.',
    color: 'from-cyan-900/30 to-blue-900/30',
    glow: 'bg-cyan-500/10',
    highlights: ['Live TV Waiting Hall Token Displays', 'Dynamic Wait-Time Estimations', 'Multi-Counter Triage & Priority Calls']
  },
  {
    icon: UserCheck,
    badge: 'Practitioner Hub',
    title: 'Comprehensive Doctor Management & Booking Controls',
    description: 'Empower healthcare specialists to take total command of their OPD sessions. Doctors can view upcoming patient queues, check vital signs, open or reschedule slots, and triage high-priority cases with zero friction.',
    color: 'from-teal-900/30 to-emerald-900/30',
    glow: 'bg-teal-500/10',
    highlights: ['Next Patient Auto-Queue Calling', 'One-Click Consultation Status Updates', 'Integrated Specialty & Fee Profiles']
  },
  {
    icon: CalendarDays,
    badge: 'Dynamic Scheduling',
    title: 'Doctor Slot Availability & Slot Engine',
    description: 'Give doctors full autonomy to open custom available slots, block hours for surgery or rounds, set 10/15/30-minute interval buffers, and manage morning/evening shift availability effortlessly.',
    color: 'from-indigo-900/30 to-violet-900/30',
    glow: 'bg-indigo-500/10',
    highlights: ['Custom Interval & Shift Configuration', 'Instant Slot Blocking & Holiday Overrides', 'Real-Time Online Slot Syncing']
  },
  {
    icon: FileText,
    badge: 'Clinical Documentation',
    title: 'Digital OP Records & e-Prescriptions (e-Rx)',
    description: 'Eliminate illegible handwriting and scattered paper files. Generate clean, branded digital prescriptions, capture ICD-10 diagnosis codes, record vitals, and link pathology test orders directly to the patient history.',
    color: 'from-rose-900/30 to-pink-900/30',
    glow: 'bg-rose-500/10',
    highlights: ['Comprehensive EMR & Patient History', 'One-Click Digital Rx with Dosage Instructions', 'Instant Lab & Radiology Order Routing']
  },
  {
    icon: Layers,
    badge: 'Revenue & Tariffs',
    title: 'Add Custom Services & Tariff Management',
    description: 'Tailor your clinic or hospital service catalogue on demand. Add new consultation specialties, minor OPD procedures, nursing fees, vaccine administration, and diagnostic packages with transparent price masters.',
    color: 'from-amber-900/30 to-orange-900/30',
    glow: 'bg-amber-500/10',
    highlights: ['Department-wise Tariff Configuration', 'Package Pricing & Procedure Bundling', 'Integrated Billing & Invoicing Automation']
  }
];

// OP FAQs
const opFaqs = [
  {
    question: "How does the OP Dashboard manage token queues for walk-ins and booked appointments?",
    answer: "Our intelligent token engine automatically merges pre-booked appointment slots with walk-in patient registrations. High-priority or emergency cases can be pushed to the top of the queue with one click, while waiting room displays update real-time token numbers."
  },
  {
    question: "Can doctors open, customize, or block their own consultation slots?",
    answer: "Yes! Doctors have dedicated portal access to set their weekly OPD schedules, open emergency walk-in buffers, change consultation duration (e.g. 15 vs 30 minutes), and block specific hours for emergency procedures or hospital rounds."
  },
  {
    question: "How are digital OP Records and e-Prescriptions stored and retrieved?",
    answer: "Every consultation creates an encrypted Electronic Medical Record (EMR) entry tied to the patient's unique Health ID. Doctors can review past visit notes, allergy warnings, previous prescriptions, and lab reports with instantaneous search."
  },
  {
    question: "Can we add custom services, minor procedures, and diagnostic tariffs?",
    answer: "Absolutely. The Add Services module allows administrators and clinic managers to configure consultation tiers, nursing charges, ECG/dressing procedures, injection fees, and bundle packages with distinct tax and tariff rules."
  },
  {
    question: "Does the system support multi-doctor and multi-specialty OPD counters?",
    answer: "Yes. You can manage unlimited doctors, consultation chambers, and specialized departments (e.g., General Medicine, Pediatrics, Cardiology, Orthopedics, Dermatology) simultaneously under one unified license."
  },
  {
    question: "How are appointment bookings confirmed for patients?",
    answer: "Patients receive instant confirmation via SMS and WhatsApp with token numbers, doctor names, chamber locations, and Google Maps links. Automated reminders ensure no-show rates drop by up to 60%."
  },
  {
    question: "Can OP records integrate directly with Pharmacy and In-house Pathology Labs?",
    answer: "Yes! When a doctor finalizes a digital prescription or orders a blood panel, the request is instantly routed to the in-house pharmacy for dispensing and the lab module for automated sample requisition."
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border border-white/10 bg-[#111113]/50 backdrop-blur-md rounded-2xl overflow-hidden mb-4 transition-all duration-300 hover:border-cyan-500/30"
  >
    <button
      className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none group"
      onClick={onClick}
    >
      <span className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
        {faq.question}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
          isOpen ? 'rotate-180 text-cyan-400' : ''
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// Modular Interactive OP Showcase Component
const OpCommandShowcase = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSlotDoctor, setSelectedSlotDoctor] = useState('Dr. Priya Mehta');
  const [slotDuration, setSlotDuration] = useState('15 mins');
  const [doctorSlots, setDoctorSlots] = useState({
    '09:00 AM': 'available',
    '09:15 AM': 'booked',
    '09:30 AM': 'booked',
    '09:45 AM': 'available',
    '10:00 AM': 'available',
    '10:15 AM': 'blocked',
    '10:30 AM': 'available',
    '10:45 AM': 'available',
  });

  const [activeServices, setActiveServices] = useState([
    { id: 1, name: 'General OPD Consultation', dept: 'General Medicine', fee: 400, duration: '15 min', active: true },
    { id: 2, name: 'Cardiology Specialist Consultation', dept: 'Cardiology', fee: 800, duration: '20 min', active: true },
    { id: 3, name: 'Standard 12-Lead ECG Test', dept: 'Diagnostics', fee: 350, duration: '10 min', active: true },
    { id: 4, name: 'Minor Wound Dressing & Suture', dept: 'Nursing / Minor OT', fee: 500, duration: '25 min', active: true },
    { id: 5, name: 'Pediatric Growth Assessment', dept: 'Pediatrics', fee: 600, duration: '20 min', active: false },
  ]);

  const toggleSlotStatus = (time) => {
    setDoctorSlots((prev) => {
      const current = prev[time];
      const next = current === 'available' ? 'blocked' : current === 'blocked' ? 'available' : 'available';
      return { ...prev, [time]: next };
    });
  };

  const toggleService = (id) => {
    setActiveServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const tabs = [
    { id: 'dashboard', label: 'OP Dashboard', color: 'from-cyan-500 to-blue-500' },
    { id: 'doctor', label: 'Doctor Management', color: 'from-teal-500 to-emerald-500' },
    { id: 'slots', label: 'Slot Engine', color: 'from-indigo-500 to-violet-500' },
    { id: 'records', label: 'OP Records', color: 'from-rose-500 to-pink-500' },
    { id: 'services', label: 'Add Services', color: 'from-amber-500 to-orange-500' },
    { id: 'bookings', label: 'Appointment Bookings', color: 'from-blue-500 to-teal-500' },
  ];

  const getLaptopContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-semibold text-white">Live OPD Command Center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/10 text-cyan-400 text-[8px] px-2 py-0.5 rounded-full border border-cyan-500/20 font-bold">
                  68 PATIENTS TODAY
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  4 DOCTORS ON DUTY
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-2.5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col">
                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider">Queue Waiting</span>
                <span className="text-base font-bold text-amber-400 mt-0.5">18</span>
                <span className="text-[7px] text-gray-400">Avg. wait ~11 min</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col">
                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider">In Chambers</span>
                <span className="text-base font-bold text-cyan-400 mt-0.5">5</span>
                <span className="text-[7px] text-gray-400">Chambers 1, 2, 4, 5, 7</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col">
                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider">Completed</span>
                <span className="text-base font-bold text-emerald-400 mt-0.5">42</span>
                <span className="text-[7px] text-emerald-400 font-semibold">92% on time</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col">
                <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wider">OP Revenue</span>
                <span className="text-base font-bold text-white mt-0.5 font-sans">₹34,800</span>
                <span className="text-[7px] text-gray-400">Consults + Services</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[110px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1 pl-1">Token</th>
                      <th className="pb-1">Patient Name</th>
                      <th className="pb-1">Doctor Assigned</th>
                      <th className="pb-1">Department</th>
                      <th className="pb-1 text-center">Status</th>
                      <th className="pb-1 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[8px]">
                    {[
                      { token: 'OP-104', name: 'Rajesh Sharma (45M)', doctor: 'Dr. Priya Mehta', dept: 'Cardiology', status: 'Waiting', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                      { token: 'OP-101', name: 'Mohammed Ali (52M)', doctor: 'Dr. Sneha Kapoor', dept: 'Orthopedics', status: 'In Chamber', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
                      { token: 'EM-003', name: 'Ramesh Verma (67M)', doctor: 'Dr. Priya Mehta', dept: 'Triage / Emergency', status: 'Priority', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
                      { token: 'OP-094', name: 'Vikas Gupta (61M)', doctor: 'Dr. Arvind Rao', dept: 'General Medicine', status: 'Completed', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-1.5 pl-1 font-mono font-bold text-cyan-300">{row.token}</td>
                        <td className="py-1.5 font-medium text-white">{row.name}</td>
                        <td className="py-1.5 text-gray-300">{row.doctor}</td>
                        <td className="py-1.5 text-gray-400">{row.dept}</td>
                        <td className="py-1.5 text-center">
                          <span className={`px-1.5 py-0.5 rounded-full text-[7px] font-bold border ${row.color}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-1.5 text-right">
                          <button className="bg-cyan-600 hover:bg-cyan-500 text-white text-[7.5px] px-2 py-0.5 rounded font-medium transition-colors">
                            Call Next
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'doctor':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-semibold text-white">Doctor Management & Booking Control</span>
              </div>
              <button className="bg-teal-600 hover:bg-teal-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors">
                <Plus className="w-2.5 h-2.5" /> Add Doctor
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 flex-grow overflow-hidden">
              <div className="space-y-1.5 overflow-y-auto no-scrollbar max-h-[140px]">
                {[
                  { name: 'Dr. Priya Mehta', role: 'Chief Cardiologist', chamber: 'Chamber 101', status: 'Online', queue: '6 waiting', fee: '₹800' },
                  { name: 'Dr. Arvind Rao', role: 'General Physician', chamber: 'Chamber 102', status: 'Online', queue: '4 waiting', fee: '₹400' },
                  { name: 'Dr. Sneha Kapoor', role: 'Orthopedic Surgeon', chamber: 'Chamber 104', status: 'In Consultation', queue: '5 waiting', fee: '₹700' },
                  { name: 'Dr. Sunita Sen', role: 'Dermatologist', chamber: 'Chamber 106', status: 'Break (15 min)', queue: '2 waiting', fee: '₹600' },
                ].map((doc, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-2 hover:border-teal-500/30 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center font-bold text-teal-300 text-[9px]">
                        {doc.name.split(' ')[1][0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-[9px]">{doc.name}</h4>
                        <p className="text-[7.5px] text-gray-400">{doc.role} • {doc.chamber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] font-bold text-teal-400 block">{doc.fee}</span>
                      <span className="text-[7px] text-gray-400">{doc.queue}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8.5px] font-bold text-white uppercase tracking-wider">Active Chamber Control</span>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[7px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">
                      LIVE SESSION
                    </span>
                  </div>
                  <p className="text-[8px] text-gray-300 mb-2">
                    Dr. Priya Mehta is currently consulting Token <strong className="text-cyan-300">OP-102 (Kavita Reddy)</strong>.
                  </p>
                  <div className="space-y-1 bg-black/40 p-2 rounded-lg border border-white/5 mb-2 text-[7.5px]">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Chief Complaint:</span>
                      <span className="text-white font-medium">Palpitations & Fatigue</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recorded Vitals:</span>
                      <span className="text-teal-300 font-medium">BP: 120/80 • HR: 74 bpm • SpO2: 99%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/5">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold py-1 rounded transition-colors flex items-center justify-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" /> Finish & e-Prescribe
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-[8px] font-bold py-1 rounded transition-colors flex items-center justify-center gap-1">
                    <ArrowRight className="w-2.5 h-2.5" /> Next Patient
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'slots':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-white">Dynamic Appointment Slot Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-gray-400">Interval:</span>
                <select
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(e.target.value)}
                  className="bg-black/60 border border-white/20 text-white text-[8px] rounded px-1.5 py-0.5 focus:outline-none focus:border-indigo-400"
                >
                  <option>10 mins</option>
                  <option>15 mins</option>
                  <option>20 mins</option>
                  <option>30 mins</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 flex-grow">
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-bold text-white text-[9px]">{selectedSlotDoctor}</h4>
                      <p className="text-[7.5px] text-indigo-300">Morning Shift • 09:00 AM - 01:00 PM</p>
                    </div>
                    <span className="text-[7.5px] text-gray-400 italic">Click slot to toggle Open / Block</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {Object.entries(doctorSlots).map(([time, status]) => (
                      <button
                        key={time}
                        onClick={() => toggleSlotStatus(time)}
                        className={`p-1.5 rounded-lg border text-center transition-all ${
                          status === 'available'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                            : status === 'booked'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 opacity-90'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <span className="text-[8px] font-mono font-bold block">{time}</span>
                        <span className="text-[6.5px] uppercase tracking-wider font-semibold">
                          {status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[7.5px] text-gray-400 border-t border-white/5 pt-1.5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Available</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Booked</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Blocked/Break</span>
                  </div>
                  <button className="text-indigo-400 hover:underline font-bold">Open Emergency Buffer +</button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-[8.5px] uppercase tracking-wider mb-1.5">Doctor Shift Timings</h4>
                  <div className="space-y-1.5 text-[7.5px]">
                    <div className="p-1.5 bg-black/40 rounded border border-white/5">
                      <span className="text-gray-400 block">Morning OPD</span>
                      <strong className="text-white">09:00 AM - 01:00 PM</strong>
                    </div>
                    <div className="p-1.5 bg-black/40 rounded border border-white/5">
                      <span className="text-gray-400 block">Evening OPD</span>
                      <strong className="text-white">05:00 PM - 08:30 PM</strong>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1 rounded text-[8px] transition-colors">
                  Save Shift Matrix
                </button>
              </div>
            </div>
          </div>
        );

      case 'records':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-white">Digital OP Records & EMR Explorer</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-full px-2 py-0.5">
                <Search className="w-2.5 h-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Patient / Token..."
                  className="bg-transparent border-none text-[7.5px] text-white focus:outline-none w-28 placeholder:text-gray-500"
                  readOnly
                  value="Rajesh Sharma"
                />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px]">
                <table className="w-full text-left border-collapse text-[8px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7px] uppercase font-bold tracking-wider">
                      <th className="pb-1.5 pl-1">Health ID</th>
                      <th className="pb-1.5">Patient Details</th>
                      <th className="pb-1.5">Diagnosis</th>
                      <th className="pb-1.5">e-Prescription (Rx)</th>
                      <th className="pb-1.5">Pathology / Lab</th>
                      <th className="pb-1.5 text-right pr-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { hid: 'HID-88410', name: 'Rajesh Sharma (45M)', diag: 'Hypertension Stage II', rx: 'Tab Telmisartan 40mg (1-0-0)', lab: 'Lipid Panel, HbA1c', doctor: 'Dr. Priya Mehta' },
                      { hid: 'HID-88392', name: 'Ananya Roy (29F)', diag: 'Acute Pharyngitis', rx: 'Tab Azithromycin 500mg, Paracetamol', lab: 'CBC Profile', doctor: 'Dr. Arvind Rao' },
                      { hid: 'HID-88219', name: 'Mohammed Ali (52M)', diag: 'Osteoarthritis Left Knee', rx: 'Tab Etoricoxib 90mg, Calcium D3', lab: 'X-Ray Knee AP/LAT', doctor: 'Dr. Sneha Kapoor' },
                      { hid: 'HID-88104', name: 'Sunita Patel (34F)', diag: 'Contact Dermatitis', rx: 'Clobetasol Cream, Levocetirizine', lab: 'IgE Total Blood', doctor: 'Dr. Sunita Sen' },
                    ].map((rec, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-2 pl-1 font-mono font-bold text-rose-300">{rec.hid}</td>
                        <td className="py-2 font-medium text-white">{rec.name}</td>
                        <td className="py-2 text-amber-300">{rec.diag}</td>
                        <td className="py-2 text-gray-300 font-mono">{rec.rx}</td>
                        <td className="py-2 text-cyan-300">{rec.lab}</td>
                        <td className="py-2 text-right pr-1">
                          <div className="flex items-center justify-end gap-1.5">
                            <Eye className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer" title="View Full EMR" />
                            <Download className="w-3 h-3 text-gray-400 hover:text-rose-400 cursor-pointer" title="Download Rx PDF" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-[7.5px] text-gray-400 border-t border-white/5 pt-1.5 mt-1">
                <span>Encrypted HIPAA/NABH Compliant Records</span>
                <span className="text-rose-400 hover:underline cursor-pointer font-bold">Export Case Summary →</span>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">Add Services & Clinical Tariffs</span>
              </div>
              <button className="bg-amber-600 hover:bg-amber-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors">
                <Plus className="w-2.5 h-2.5" /> Add New Service
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px]">
                <table className="w-full text-left border-collapse text-[8px]">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7px] uppercase font-bold tracking-wider">
                      <th className="pb-1.5 pl-1">Service Name</th>
                      <th className="pb-1.5">Department</th>
                      <th className="pb-1.5 text-center">Duration</th>
                      <th className="pb-1.5 text-right">Tariff / Fee</th>
                      <th className="pb-1.5 text-center">Active Status</th>
                      <th className="pb-1.5 text-right pr-1">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeServices.map((svc) => (
                      <tr key={svc.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-2 pl-1 font-medium text-white">{svc.name}</td>
                        <td className="py-2 text-gray-400">{svc.dept}</td>
                        <td className="py-2 text-center text-gray-300 font-mono">{svc.duration}</td>
                        <td className="py-2 text-right font-mono font-bold text-amber-400 font-sans">₹{svc.fee}</td>
                        <td className="py-2 text-center">
                          <button
                            onClick={() => toggleService(svc.id)}
                            className={`px-2 py-0.5 rounded-full text-[6.5px] font-bold transition-all ${
                              svc.active
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}
                          >
                            {svc.active ? 'ACTIVE' : 'INACTIVE'}
                          </button>
                        </td>
                        <td className="py-2 text-right pr-1">
                          <Edit2 className="w-3 h-3 text-gray-400 hover:text-amber-400 inline cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-[7.5px] text-gray-400 border-t border-white/5 pt-1.5 mt-1">
                <span>Total 18 Clinical Services & Packages Active</span>
                <span className="text-amber-400 hover:underline cursor-pointer font-bold">Manage Tariff Masters →</span>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">OPD Appointment Bookings Console</span>
              </div>
              <button className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors">
                <Plus className="w-2.5 h-2.5" /> Book Appointment
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 flex-grow overflow-hidden">
              <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div className="overflow-y-auto no-scrollbar max-h-[110px]">
                  <table className="w-full text-left border-collapse text-[8px]">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-[7px] uppercase font-bold">
                        <th className="pb-1 pl-1">Slot Time</th>
                        <th className="pb-1">Patient</th>
                        <th className="pb-1">Doctor</th>
                        <th className="pb-1">Type</th>
                        <th className="pb-1 text-right">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { time: '10:00 AM', patient: 'Deepak Nair', doctor: 'Dr. Priya Mehta', type: 'Online App', pay: 'Paid (₹800)' },
                        { time: '10:15 AM', patient: 'Rajesh Sharma', doctor: 'Dr. Priya Mehta', type: 'Walk-in', pay: 'Counter (₹800)' },
                        { time: '10:30 AM', patient: 'Ananya Roy', doctor: 'Dr. Arvind Rao', type: 'WhatsApp', pay: 'Pending' },
                        { time: '10:45 AM', patient: 'Suresh Menon', doctor: 'Dr. Sneha Kapoor', type: 'Online App', pay: 'Paid (₹700)' },
                      ].map((bk, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-1.5 pl-1 font-mono font-bold text-cyan-300">{bk.time}</td>
                          <td className="py-1.5 font-medium text-white">{bk.patient}</td>
                          <td className="py-1.5 text-gray-300">{bk.doctor}</td>
                          <td className="py-1.5 text-gray-400">{bk.type}</td>
                          <td className="py-1.5 text-right font-mono font-bold text-emerald-400">{bk.pay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-white/5 pt-1 flex justify-between text-[7px] text-gray-400">
                  <span>Auto SMS & WhatsApp Alerts Active</span>
                  <span className="text-blue-400 font-bold">Check-in Patient →</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-[8px] uppercase tracking-wider mb-1">Booking Channels</h4>
                  <div className="space-y-1 text-[7px]">
                    <div className="flex justify-between p-1 bg-black/40 rounded border border-white/5">
                      <span className="text-gray-400">Online Web / App</span>
                      <span className="text-cyan-300 font-bold">54%</span>
                    </div>
                    <div className="flex justify-between p-1 bg-black/40 rounded border border-white/5">
                      <span className="text-gray-400">Direct Walk-in</span>
                      <span className="text-amber-300 font-bold">32%</span>
                    </div>
                    <div className="flex justify-between p-1 bg-black/40 rounded border border-white/5">
                      <span className="text-gray-400">WhatsApp Bot</span>
                      <span className="text-emerald-300 font-bold">14%</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1 text-center text-[7px] text-gray-400">
                  <span>99.2% Booking Accuracy</span>
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
      case 'dashboard':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                <span className="font-bold text-white text-[10px]">Live OPD Token</span>
                <Activity className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-2 text-center mb-1.5">
                <span className="text-[6.5px] text-cyan-300 uppercase font-bold tracking-widest">NOW SERVING</span>
                <p className="text-lg font-mono font-bold text-cyan-400 mt-0.5">OP-102</p>
                <p className="text-[6.5px] text-gray-300 mt-0.5">Chamber 1 • Dr. Priya</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-gray-400">Your Token: <strong className="text-white">OP-104</strong></p>
                <p className="text-amber-400 font-bold mt-0.5">Est. Wait: 8 Mins</p>
              </div>
            </div>
            <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-1 rounded-xl text-[8px] transition-colors">
              Refresh Queue
            </button>
          </div>
        );

      case 'doctor':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                <span className="font-bold text-white text-[10px]">Doctor Console</span>
                <UserCheck className="w-3 h-3 text-teal-400" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 mb-1.5 text-left">
                <p className="text-[6.5px] text-teal-400 uppercase font-bold">NEXT PATIENT</p>
                <p className="text-[9px] font-bold text-white mt-0.5">Rajesh Sharma (45M)</p>
                <p className="text-[6.5px] text-gray-400">ECG Follow-up • Token OP-104</p>
              </div>
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-teal-300 font-bold">Vitals BP: 120/80 • HR: 74</p>
              </div>
            </div>
            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-1.5 rounded-xl text-[8px] transition-colors flex items-center justify-center gap-1">
              <Stethoscope className="w-2.5 h-2.5" /> Start Consultation
            </button>
          </div>
        );

      case 'slots':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                <span className="font-bold text-white text-[10px]">Open Slots</span>
                <CalendarDays className="w-3 h-3 text-indigo-400" />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-2">
                <div className="bg-emerald-500/20 border border-emerald-500/40 p-1 rounded text-center">
                  <span className="text-[7px] font-bold text-emerald-300 block">10:00 AM</span>
                  <span className="text-[5.5px] text-emerald-400">OPEN</span>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-500/40 p-1 rounded text-center">
                  <span className="text-[7px] font-bold text-emerald-300 block">10:15 AM</span>
                  <span className="text-[5.5px] text-emerald-400">OPEN</span>
                </div>
                <div className="bg-rose-500/20 border border-rose-500/40 p-1 rounded text-center">
                  <span className="text-[7px] font-bold text-rose-300 block">10:30 AM</span>
                  <span className="text-[5.5px] text-rose-400">BLOCKED</span>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-500/40 p-1 rounded text-center">
                  <span className="text-[7px] font-bold text-emerald-300 block">10:45 AM</span>
                  <span className="text-[5.5px] text-emerald-400">OPEN</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1 rounded-xl text-[8px] transition-colors">
              + Add 30m Slot
            </button>
          </div>
        );

      case 'records':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/10 pb-1">
                <span className="font-bold text-white text-[10px]">Patient e-Rx</span>
                <FileText className="w-3 h-3 text-rose-400" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 mb-1.5 text-[7px]">
                <p className="text-rose-400 font-bold">Rx #88410 • Rajesh Sharma</p>
                <p className="text-white mt-0.5">1. Tab Telmisartan 40mg (1-0-0)</p>
                <p className="text-white">2. Tab Atorvastatin 10mg (0-0-1)</p>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-1 text-center text-[6.5px]">
                <p className="text-rose-300">Signed Dr. Priya Mehta (Cardiology)</p>
              </div>
            </div>
            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1 rounded-xl text-[8px] transition-colors flex items-center justify-center gap-1">
              <Download className="w-2.5 h-2.5" /> PDF Prescription
            </button>
          </div>
        );

      case 'services':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                <span className="font-bold text-white text-[10px]">Quick Services</span>
                <Layers className="w-3 h-3 text-amber-400" />
              </div>
              <div className="space-y-1 text-[7px]">
                <div className="flex justify-between p-1 bg-white/5 rounded border border-white/10">
                  <span className="text-white">General Consultation</span>
                  <span className="text-amber-400 font-bold font-sans">₹400</span>
                </div>
                <div className="flex justify-between p-1 bg-white/5 rounded border border-white/10">
                  <span className="text-white">Cardiology Consult</span>
                  <span className="text-amber-400 font-bold font-sans">₹800</span>
                </div>
                <div className="flex justify-between p-1 bg-white/5 rounded border border-white/10">
                  <span className="text-white">12-Lead ECG</span>
                  <span className="text-amber-400 font-bold font-sans">₹350</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-1 rounded-xl text-[8px] transition-colors">
              + New Service
            </button>
          </div>
        );

      case 'bookings':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/10 pb-1">
                <span className="font-bold text-white text-[10px]">Booking Alert</span>
                <Calendar className="w-3 h-3 text-blue-400" />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6.5px] text-blue-300 uppercase font-bold">CONFIRMED SLOT</p>
                <p className="text-[9px] font-bold text-white mt-0.5">Today 10:15 AM</p>
                <p className="text-[6.5px] text-emerald-400 font-semibold mt-0.5">Token OP-104 • Paid</p>
              </div>
              <p className="text-[7px] text-gray-400 text-center">SMS sent to +91 98765 43210</p>
            </div>
            <button className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold py-1 rounded-xl text-[8px] transition-colors">
              Instant Check-in
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
          className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-cyan-500/30"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300 font-medium">Modular Clinical OPD Suite</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Everything for Outpatient Care. Unified.
        </h2>
        <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
          From live queue triage and doctor slot availability to electronic records and service tariffs, test the interactive clinical consoles below.
        </p>
      </div>

      {/* Synchronized Laptop & Phone Mockups */}
      <div className="relative w-full max-w-[720px] mx-auto mb-16 px-6 pt-10">
        <div className="absolute inset-10 bg-gradient-to-tr from-cyan-500/10 via-teal-500/10 to-blue-500/10 rounded-full blur-[80px] opacity-70 pointer-events-none -z-10 animate-pulse duration-[8000ms]"></div>

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

      {/* Feature Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto pt-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md ${
                isActive
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
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

const OpMangement = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-teal-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[50%] right-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[180px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        <main className="pb-32">
          {/* HERO SECTION */}
          <section className="min-h-[65vh] flex flex-col items-center justify-center px-6 text-center relative py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm shadow-inner">
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300 font-medium">Healthcare Outpatient Ecosystem</span>
              </div>

              <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                OP Management.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
                  Precision in Every Consultation.
                </span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Streamline outpatient tokens, doctor bookings, dynamic slot availability, digital e-Prescriptions, and custom clinical services into one powerful command center.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0 mt-8">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-cyan-500/30 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Book Demo
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/price"
                  className="w-full sm:w-auto bg-[#1c1c1e] text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105 text-center"
                >
                  View Pricing Plans
                </Link>
              </div>
            </motion.div>
          </section>

          {/* REAL-TIME OPD QUEUE BOARD */}
          <section className="px-6 max-w-[1400px] mx-auto mb-24 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Monitor Live OPD Traffic in Real-Time
              </h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                Track patient arrival tokens, doctor consultation velocity, and emergency triage instantly across all clinic chambers.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="bg-[#111113]/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-white/10 shadow-2xl shadow-cyan-500/10 overflow-hidden"
            >
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x no-scrollbar">
                {initialOpColumns.map((col, index) => (
                  <div key={col.id} className="min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="font-semibold text-lg text-white/90 flex items-center gap-2">
                        {col.title}
                      </h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${col.badgeBg}`}>
                        {col.count}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {mockOpPatients
                        .filter((p) => p.status === col.id)
                        .map((patient, idx) => (
                          <motion.div
                            key={patient.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.1 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-cyan-500/30 hover:bg-white/10 transition-all shadow-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 mr-2">
                                  {patient.token}
                                </span>
                                <h4 className="font-bold text-white text-base inline">{patient.name}</h4>
                              </div>
                              <span className="text-xs text-gray-400 font-mono">{patient.age}</span>
                            </div>

                            <p className="text-xs text-gray-300 mb-3 flex items-center gap-1.5">
                              <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                              {patient.doctor}
                            </p>

                            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-white/5 pt-3">
                              <span className="text-[11px] text-gray-400 font-light">{patient.service}</span>
                              <div className="flex items-center gap-1 text-cyan-300 font-medium">
                                <Clock className="w-3 h-3" />
                                <span>{patient.time}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ALTERNATING CLINICAL FEATURES DEEP-DIVE */}
          <section className="px-6 max-w-[1200px] mx-auto mb-40 relative z-20">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-24 w-full text-center">
              Engineered for Modern Clinical Workflows.
            </h2>

            <div className="flex flex-col gap-32">
              {opFeatures.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col md:flex-row items-center gap-16 ${
                      idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Visual Card Side */}
                    <div className="flex-1 w-full relative group">
                      <div
                        className={`absolute -inset-4 ${feature.glow} rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`}
                      ></div>
                      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111113]/70 backdrop-blur-md p-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                                {feature.badge}
                              </span>
                              <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-4">
                          {feature.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-3 text-sm text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                          <span>Verified High-Performance Module</span>
                          <span className="text-cyan-400 font-bold">Learn more →</span>
                        </div>
                      </div>
                    </div>

                    {/* Text Description Side */}
                    <div className="flex-1 w-full text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <span className="text-sm text-gray-300 font-medium">OP Module {idx + 1}</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light mb-8">
                        {feature.description}
                      </p>
                      <div>
                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mx-auto md:mx-0"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* INTERACTIVE MODULAR SHOWCASE */}
          <OpCommandShowcase />

          {/* FAQ SECTION */}
          <section className="px-6 max-w-[900px] mx-auto mb-32 z-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                Everything you need to know about the OP Management and outpatient clinic ecosystem.
              </p>
            </div>

            <div className="flex flex-col">
              {opFaqs.map((faq, idx) => (
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
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-1000"></div>

              <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-300 font-medium">Connected Healthcare</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Prescriptions issued! <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                    What happens next?
                  </span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                  Route digital prescriptions directly to your pharmacy counter and diagnostic orders to pathology labs in real time with zero duplicate data entry.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Automated pharmacy dispensing alerts
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Instant lab requisition barcoding
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Automated WhatsApp follow-up reminders
                  </li>
                </ul>
              </div>

              <div className="flex-1 relative z-10 w-full">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-black font-bold">
                          Rx
                        </div>
                        <div>
                          <p className="text-white font-medium">Digital e-Prescription #88410</p>
                          <p className="text-xs text-gray-400">Dr. Priya Mehta • Sent to In-House Pharmacy</p>
                        </div>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                        Dispatched
                      </span>
                    </div>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Microscope className="w-5 h-5 text-cyan-400" />
                        <div className="flex-1">
                          <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2"></div>
                          <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Pill className="w-5 h-5 text-teal-400" />
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
              className="bg-gradient-to-r from-cyan-900/30 via-teal-900/30 to-emerald-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-teal-500/30 transition-all duration-1000"></div>

              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
                  Ready to upgrade <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    your outpatient clinic?
                  </span>
                </h2>

                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Empower your clinicians, cut patient wait times in half, and eliminate paperwork with the Ingrain OP Management platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn"
                  >
                    Start Automating Now
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/price"
                    className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center"
                  >
                    Explore Pricing Plans
                  </Link>
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              ></div>
            </motion.div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OpMangement;