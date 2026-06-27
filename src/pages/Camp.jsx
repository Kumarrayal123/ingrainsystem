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
  Trash2,
  Heart,
  Stethoscope,
  Syringe,
  Pill,
  Ambulance,
  Bandage,
  Clipboard,
  FileText,
  UserPlus,
  UsersRound,
  CalendarCheck,
  BarChart3,
  PieChart,
  LineChart,
  FileCheck,
  Hospital,
  Microscope,
  Bone,
  Weight,
  Ruler
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import r1 from '../img/camp-1.png';
import a2 from '../img/camp-2.png';
import a3 from '../img/camp-3.1.png';
import r4 from '../img/camp-4.png';

// Mock Data for Medical Camp
const initialCamps = [
  { 
    id: 1, 
    name: 'City Health Camp 2026', 
    location: 'Community Hall, Mumbai', 
    date: '2026-07-15', 
    status: 'active',
    volunteers: 12,
    patientsRegistered: 145,
    totalCapacity: 200,
    specialties: ['General Checkup', 'Dental', 'Eye Care']
  },
  { 
    id: 2, 
    name: 'Rural Medical Outreach', 
    location: 'Village Panchayat, Pune', 
    date: '2026-07-22', 
    status: 'upcoming',
    volunteers: 8,
    patientsRegistered: 67,
    totalCapacity: 150,
    specialties: ['General Checkup', 'Gynecology', 'Pediatrics']
  },
  { 
    id: 3, 
    name: 'Corporate Wellness Camp', 
    location: 'Tech Park, Bangalore', 
    date: '2026-07-28', 
    status: 'planned',
    volunteers: 15,
    patientsRegistered: 89,
    totalCapacity: 250,
    specialties: ['General Checkup', 'Dental', 'Eye Care', 'Physiotherapy']
  },
];

const mockVolunteers = [
  { id: 1, name: 'Dr. Priya Sharma', role: 'Lead Physician', specialization: 'General Medicine', status: 'confirmed' },
  { id: 2, name: 'Dr. Rajesh Kumar', role: 'Consultant', specialization: 'Cardiology', status: 'confirmed' },
  { id: 3, name: 'Nurse Anita Patel', role: 'Senior Nurse', specialization: 'Critical Care', status: 'pending' },
  { id: 4, name: 'Dr. Suresh Reddy', role: 'Consultant', specialization: 'Orthopedics', status: 'confirmed' },
  { id: 5, name: 'Ms. Meera Singh', role: 'Coordinator', specialization: 'Operations', status: 'pending' },
];

const mockPatients = [
  { id: 1, name: 'Amit Kumar', age: 45, gender: 'Male', contact: '+91 98765 43210', bmi: 27.5, bloodPressure: '120/80', bloodSugar: 110, camp: 'City Health Camp 2026' },
  { id: 2, name: 'Priya Patel', age: 32, gender: 'Female', contact: '+91 87654 32109', bmi: 22.3, bloodPressure: '110/70', bloodSugar: 95, camp: 'City Health Camp 2026' },
  { id: 3, name: 'Rahul Singh', age: 28, gender: 'Male', contact: '+91 76543 21098', bmi: 29.8, bloodPressure: '135/85', bloodSugar: 140, camp: 'Rural Medical Outreach' },
  { id: 4, name: 'Sneha Reddy', age: 55, gender: 'Female', contact: '+91 65432 10987', bmi: 31.2, bloodPressure: '145/90', bloodSugar: 160, camp: 'Corporate Wellness Camp' },
];

const bmiCategories = [
  { range: 'Underweight', min: 0, max: 18.5, color: 'bg-blue-500', count: 0 },
  { range: 'Normal', min: 18.5, max: 24.9, color: 'bg-emerald-500', count: 2 },
  { range: 'Overweight', min: 25, max: 29.9, color: 'bg-amber-500', count: 1 },
  { range: 'Obese', min: 30, max: 100, color: 'bg-rose-500', count: 1 },
];

const features = [
  {
    image: r1,
    title: "Camp Creation & Management",
    description: "Create and manage medical camps with ease. Set up locations, schedules, specialties, and volunteer requirements in minutes.",
    color: "from-indigo-900/30 to-purple-900/30",
    glow: "bg-indigo-500/10"
  },
  {
    image: a2,
    title: "Volunteer Coordination",
    description: "Invite and manage medical volunteers. Track their availability, specializations, and assignments across multiple camp locations.",
    color: "from-blue-900/30 to-cyan-900/30",
    glow: "bg-blue-500/10"
  },
  {
    image: a3,
    title: "Patient Registration & Records",
    description: "Quickly register patients, record vital stats, track medical history, and generate comprehensive health reports instantly.",
    color: "from-emerald-900/30 to-teal-900/30",
    glow: "bg-emerald-500/10"
  },
  {
    image: r4,
    title: "BMI & Health Analytics",
    description: "Track patient health metrics including BMI, blood pressure, and blood sugar. Generate detailed health reports and insights.",
    color: "from-fuchsia-900/30 to-pink-900/30",
    glow: "bg-fuchsia-500/10"
  }
];

const faqs = [
  {
    question: "How do I create a new medical camp?",
    answer: "Click on the 'Create Camp' button, fill in the camp details including location, date, specialties, and capacity. You can then invite volunteers and start patient registrations."
  },
  {
    question: "Can volunteers be assigned to multiple camps?",
    answer: "Yes, volunteers can be assigned to multiple camps based on their availability and specialization. The system tracks their commitments and prevents scheduling conflicts."
  },
  {
    question: "How are patient records managed?",
    answer: "Each patient gets a unique health record with all their vitals, medical history, and camp visit details. Records are stored securely and can be accessed for follow-ups."
  },
  {
    question: "What health metrics can be tracked?",
    answer: "The system tracks BMI, blood pressure, blood sugar, heart rate, temperature, and other vital signs. You can also record medical history and prescribed medications."
  },
  {
    question: "How do I generate health reports?",
    answer: "Health reports can be generated for individual patients or entire camps. Reports include BMI analysis, vital signs trends, and health risk assessments."
  },
  {
    question: "Can I export patient data?",
    answer: "Yes, you can export patient data, health reports, and camp statistics in various formats including PDF, Excel, and CSV for further analysis or record keeping."
  },
  {
    question: "How is patient privacy maintained?",
    answer: "All patient data is encrypted and access is role-based. Only authorized medical staff can view or modify patient records, ensuring HIPAA and GDPR compliance."
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

// Sub-components

const CreateCampModal = ({ isOpen, onClose, onCampCreate }) => {
  const [campData, setCampData] = useState({
    name: '',
    location: '',
    date: '',
    capacity: '',
    specialties: []
  });

  const specialtyOptions = ['General Checkup', 'Dental', 'Eye Care', 'Gynecology', 'Pediatrics', 'Cardiology', 'Orthopedics', 'Physiotherapy'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onCampCreate(campData);
    onClose();
  };

  const toggleSpecialty = (specialty) => {
    setCampData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#1a1a1e] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create New Medical Camp</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Camp Name</label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter camp name"
              value={campData.name}
              onChange={(e) => setCampData({...campData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Location</label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter location"
              value={campData.location}
              onChange={(e) => setCampData({...campData, location: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Camp Date</label>
            <input
              type="date"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={campData.date}
              onChange={(e) => setCampData({...campData, date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Maximum Capacity</label>
            <input
              type="number"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter max patients"
              value={campData.capacity}
              onChange={(e) => setCampData({...campData, capacity: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Medical Specialties</label>
            <div className="flex flex-wrap gap-2">
              {specialtyOptions.map((specialty) => (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => toggleSpecialty(specialty)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    campData.specialties.includes(specialty)
                      ? 'bg-blue-500 text-white border border-blue-500'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20 mt-4"
          >
            Create Camp
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const AddVolunteerModal = ({ isOpen, onClose, onVolunteerAdd }) => {
  const [volunteerData, setVolunteerData] = useState({
    name: '',
    role: '',
    specialization: '',
    status: 'pending'
  });

  const roleOptions = ['Lead Physician', 'Consultant', 'Senior Nurse', 'Nurse', 'Coordinator', 'Pharmacist', 'Lab Technician'];
  const specializationOptions = ['General Medicine', 'Cardiology', 'Orthopedics', 'Gynecology', 'Pediatrics', 'Physiotherapy', 'Dental', 'Eye Care', 'Critical Care', 'Operations'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onVolunteerAdd(volunteerData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#1a1a1e] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add Volunteer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter full name"
              value={volunteerData.name}
              onChange={(e) => setVolunteerData({...volunteerData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
            <select
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={volunteerData.role}
              onChange={(e) => setVolunteerData({...volunteerData, role: e.target.value})}
            >
              <option value="">Select Role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Specialization</label>
            <select
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={volunteerData.specialization}
              onChange={(e) => setVolunteerData({...volunteerData, specialization: e.target.value})}
            >
              <option value="">Select Specialization</option>
              {specializationOptions.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-500/20 mt-4"
          >
            Add Volunteer
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const PatientRegistrationModal = ({ isOpen, onClose, onPatientRegister }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    bloodPressure: '',
    bloodSugar: '',
    height: '',
    weight: '',
    camp: 'City Health Camp 2026'
  });

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmi = calculateBMI(parseFloat(patientData.height), parseFloat(patientData.weight));
    onPatientRegister({ ...patientData, bmi });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#1a1a1e] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Register Patient</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Patient name"
                value={patientData.name}
                onChange={(e) => setPatientData({...patientData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Age</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Age in years"
                value={patientData.age}
                onChange={(e) => setPatientData({...patientData, age: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Gender</label>
              <select
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                value={patientData.gender}
                onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Contact</label>
              <input
                type="tel"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="+91 98765 43210"
                value={patientData.contact}
                onChange={(e) => setPatientData({...patientData, contact: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Height (cm)</label>
              <input
                type="number"
                step="0.1"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 175"
                value={patientData.height}
                onChange={(e) => setPatientData({...patientData, height: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 72"
                value={patientData.weight}
                onChange={(e) => setPatientData({...patientData, weight: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Blood Pressure</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 120/80"
                value={patientData.bloodPressure}
                onChange={(e) => setPatientData({...patientData, bloodPressure: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Blood Sugar (mg/dL)</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 110"
                value={patientData.bloodSugar}
                onChange={(e) => setPatientData({...patientData, bloodSugar: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Camp</label>
            <select
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              value={patientData.camp}
              onChange={(e) => setPatientData({...patientData, camp: e.target.value})}
            >
              {initialCamps.map((camp) => (
                <option key={camp.id} value={camp.name}>{camp.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-purple-500/20 mt-4"
          >
            Register Patient
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const BMIAnalysisModal = ({ isOpen, onClose }) => {
  const bmiData = mockPatients.map(p => ({
    name: p.name,
    bmi: p.bmi,
    category: p.bmi < 18.5 ? 'Underweight' : p.bmi < 25 ? 'Normal' : p.bmi < 30 ? 'Overweight' : 'Obese'
  }));

  const getCategoryColor = (category) => {
    const map = {
      'Underweight': 'text-blue-400',
      'Normal': 'text-emerald-400',
      'Overweight': 'text-amber-400',
      'Obese': 'text-rose-400'
    };
    return map[category] || 'text-gray-400';
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#1a1a1e] border border-white/10 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">BMI Analysis Report</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {bmiCategories.map((cat) => (
            <div key={cat.range} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className={`w-3 h-3 ${cat.color} rounded-full mx-auto mb-1.5`}></div>
              <p className="text-xs text-gray-400">{cat.range}</p>
              <p className="text-lg font-bold text-white">{cat.count}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {bmiData.map((person, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{person.name}</p>
                <p className="text-xs text-gray-400">BMI: {person.bmi}</p>
              </div>
              <span className={`font-semibold ${getCategoryColor(person.category)}`}>
                {person.category}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            // Download report functionality
            alert('Downloading BMI Report...');
          }}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20 mt-6 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download BMI Report
        </button>
      </motion.div>
    </motion.div>
  );
};

const CampShowcase = () => {
  const [activeTab, setActiveTab] = useState('camps');
  const [camps, setCamps] = useState(initialCamps);
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [patients, setPatients] = useState(mockPatients);
  const [showCreateCamp, setShowCreateCamp] = useState(false);
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);
  const [showRegisterPatient, setShowRegisterPatient] = useState(false);
  const [showBMIAnalysis, setShowBMIAnalysis] = useState(false);

  const tabs = [
    { id: 'camps', label: 'Camps', icon: Hospital, color: 'from-blue-500 to-cyan-500' },
    { id: 'volunteers', label: 'Volunteers', icon: UsersRound, color: 'from-emerald-500 to-teal-500' },
    { id: 'patients', label: 'Patients', icon: UserPlus, color: 'from-purple-500 to-pink-500' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'from-amber-500 to-orange-500' },
  ];

  const handleCampCreate = (campData) => {
    const newCamp = {
      id: camps.length + 1,
      ...campData,
      status: 'planned',
      volunteers: 0,
      patientsRegistered: 0,
      totalCapacity: parseInt(campData.capacity),
      specialties: campData.specialties
    };
    setCamps([...camps, newCamp]);
  };

  const handleVolunteerAdd = (volunteerData) => {
    const newVolunteer = {
      id: volunteers.length + 1,
      ...volunteerData,
      status: 'pending'
    };
    setVolunteers([...volunteers, newVolunteer]);
  };

  const handlePatientRegister = (patientData) => {
    const newPatient = {
      id: patients.length + 1,
      ...patientData,
      age: parseInt(patientData.age),
    };
    setPatients([...patients, newPatient]);
  };

  const getCampContent = () => {
    switch (activeTab) {
      case 'camps':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Hospital className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">Active Medical Camps</span>
              </div>
              <button 
                onClick={() => setShowCreateCamp(true)}
                className="bg-blue-500/10 text-blue-400 text-[8px] px-2 py-1 rounded-full border border-blue-500/20 font-bold hover:bg-blue-500/20 transition-colors flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" /> New Camp
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow overflow-y-auto no-scrollbar max-h-[140px]">
              {camps.map((camp) => (
                <div key={camp.id} className="bg-white/5 border border-white/10 rounded-xl p-2 hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-white text-[9px]">{camp.name}</h4>
                    <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-medium ${
                      camp.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      camp.status === 'upcoming' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {camp.status}
                    </span>
                  </div>
                  <p className="text-[7px] text-gray-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> {camp.location}
                  </p>
                  <p className="text-[7px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-2.5 h-2.5" /> {camp.date}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[7px]">
                    <span className="text-gray-400">👥 {camp.patientsRegistered}/{camp.totalCapacity}</span>
                    <span className="text-gray-400">🩺 {camp.volunteers} volunteers</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {camp.specialties.slice(0, 3).map((spec, idx) => (
                      <span key={idx} className="bg-white/5 text-gray-400 text-[6px] px-1.5 py-0.5 rounded border border-white/5">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'volunteers':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <UsersRound className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">Camp Volunteers</span>
              </div>
              <button 
                onClick={() => setShowAddVolunteer(true)}
                className="bg-emerald-500/10 text-emerald-400 text-[8px] px-2 py-1 rounded-full border border-emerald-500/20 font-bold hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" /> Add
              </button>
            </div>
            
            <div className="space-y-1.5 flex-grow overflow-y-auto no-scrollbar max-h-[140px]">
              {volunteers.map((volunteer) => (
                <div key={volunteer.id} className="bg-white/5 border border-white/10 rounded-lg p-1.5 flex items-center justify-between hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center text-[8px] font-bold text-white">
                      {volunteer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-[8px]">{volunteer.name}</h4>
                      <p className="text-[6px] text-gray-400">{volunteer.role} • {volunteer.specialization}</p>
                    </div>
                  </div>
                  <span className={`text-[6px] px-1.5 py-0.5 rounded-full font-medium ${
                    volunteer.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {volunteer.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'patients':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-semibold text-white">Registered Patients</span>
              </div>
              <button 
                onClick={() => setShowRegisterPatient(true)}
                className="bg-purple-500/10 text-purple-400 text-[8px] px-2 py-1 rounded-full border border-purple-500/20 font-bold hover:bg-purple-500/20 transition-colors flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" /> Register
              </button>
            </div>
            
            <div className="space-y-1.5 flex-grow overflow-y-auto no-scrollbar max-h-[140px]">
              {patients.map((patient) => (
                <div key={patient.id} className="bg-white/5 border border-white/10 rounded-lg p-1.5 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-[8px] font-bold text-white">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-[8px]">{patient.name}</h4>
                        <p className="text-[6px] text-gray-400">{patient.age} yrs • {patient.gender} • {patient.camp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[7px] font-bold text-purple-400">BMI: {patient.bmi}</p>
                      <p className="text-[6px] text-gray-400">{patient.bloodPressure}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">Health Reports & Analytics</span>
              </div>
              <button 
                onClick={() => setShowBMIAnalysis(true)}
                className="bg-amber-500/10 text-amber-400 text-[8px] px-2 py-1 rounded-full border border-amber-500/20 font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-1"
              >
                <BarChart3 className="w-2.5 h-2.5" /> BMI Analysis
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1.5 text-[8px] uppercase tracking-wider">Camp Overview</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[7px]">
                      <span className="text-gray-400">Total Patients</span>
                      <span className="text-white font-bold">{patients.length}</span>
                    </div>
                    <div className="flex justify-between text-[7px]">
                      <span className="text-gray-400">Active Camps</span>
                      <span className="text-white font-bold">{camps.filter(c => c.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between text-[7px]">
                      <span className="text-gray-400">Volunteers</span>
                      <span className="text-white font-bold">{volunteers.filter(v => v.status === 'confirmed').length}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[7px] text-gray-400">
                  <span>📊 Last updated: Today</span>
                  <span className="text-amber-400 hover:underline cursor-pointer">View All →</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1.5 text-[8px] uppercase tracking-wider">BMI Distribution</h4>
                  <div className="space-y-1">
                    {bmiCategories.map((cat) => (
                      <div key={cat.range}>
                        <div className="flex justify-between text-[7px] mb-0.5">
                          <span className="text-gray-400">{cat.range}</span>
                          <span className="text-white font-bold">{cat.count}</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                          <div className={`${cat.color} h-full rounded-full`} style={{ width: `${(cat.count / patients.length) * 100 || 0}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1.5 flex items-center justify-between text-[7px] text-gray-400">
                  <span>📋 {patients.length} patients analyzed</span>
                  <span className="text-amber-400 hover:underline cursor-pointer">Export →</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-1 h-full">
        <div className="bg-[#111113]/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-white/10 shadow-2xl">
          <div className="flex flex-wrap gap-3 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="h-[220px] md:h-[280px] overflow-hidden">
            {getCampContent()}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCreateCamp && (
          <CreateCampModal 
            isOpen={showCreateCamp} 
            onClose={() => setShowCreateCamp(false)} 
            onCampCreate={handleCampCreate}
          />
        )}
        {showAddVolunteer && (
          <AddVolunteerModal 
            isOpen={showAddVolunteer} 
            onClose={() => setShowAddVolunteer(false)} 
            onVolunteerAdd={handleVolunteerAdd}
          />
        )}
        {showRegisterPatient && (
          <PatientRegistrationModal 
            isOpen={showRegisterPatient} 
            onClose={() => setShowRegisterPatient(false)} 
            onPatientRegister={handlePatientRegister}
          />
        )}
        {showBMIAnalysis && (
          <BMIAnalysisModal 
            isOpen={showBMIAnalysis} 
            onClose={() => setShowBMIAnalysis(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Camp = () => {
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
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-sm text-gray-300 font-medium">Medical Camp Management</span>
              </div>
              
              <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                Medical Camp <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-blue-400">Management System</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Create camps, coordinate volunteers, register patients, and track health metrics all in one place. Streamline your medical outreach programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0 mt-8">
                <button className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center gap-2 group">
                  Create New Camp
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>
                <Link to="/contact" className="w-full sm:w-auto bg-[#1c1c1e] text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105 text-center">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </section>

          {/* FEATURES SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto mb-40 relative z-20">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-24 w-full text-center">
              Camp Management Features
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
                      <div className="h-1 w-16 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CAMP SHOWCASE SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative pt-20 border-t border-white/5">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-rose-500/30"
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-sm text-rose-300 font-medium">Camp Management Dashboard</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Manage Everything In One Place
              </h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                Create camps, add volunteers, register patients, and track health reports seamlessly.
              </p>
            </div>

            <CampShowcase />
          </section>

          {/* FAQ SECTION */}
          <section className="px-6 max-w-[900px] mx-auto mb-32 z-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">Everything you need to know about managing medical camps.</p>
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

          {/* FINAL CTA SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto z-20 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-rose-900/30 via-purple-900/30 to-blue-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/30 transition-all duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
                  Ready to Launch Your <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-blue-400">Medical Camp?</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Start organizing your medical camps today. Create camps, coordinate volunteers, and provide quality healthcare to those in need.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <button className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                    Start Free Trial
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <Link to="/contact" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                    Contact Support
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

export default Camp;