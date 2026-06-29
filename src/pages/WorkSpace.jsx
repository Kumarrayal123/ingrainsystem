import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Tv, 
  Wifi, 
  Thermometer, 
  Lock, 
  QrCode, 
  Volume2, 
  Settings, 
  Activity, 
  Copy, 
  Share2, 
  Trash2, 
  Target, 
  ArrowRight, 
  TrendingUp, 
  Star, 
  ChevronDown, 
  Award, 
  Smartphone, 
  X,
  Sparkles,
  Power
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Import images from assets (matching the mockups in Recruitment)
import r1 from '../img/r1.png';
import r2 from '../img/r2.png';
import r3 from '../img/r3.png';
import r4 from '../img/r4.png';

// Kanban Board mock columns
const initialColumns = [
  { id: 'pending', title: 'Pending Approval', count: 2 },
  { id: 'confirmed', title: 'Confirmed Bookings', count: 4 },
  { id: 'active', title: 'Active Sessions', count: 1 },
  { id: 'completed', title: 'Completed', count: 12 },
];

const features = [
  {
    image: r1,
    title: "Don't waste time searching for rooms",
    description: "Automatic calendar syncing and desk scheduling means zero confusion. When a team member books a space, it is instantly indexed, Google/Outlook calendars are updated, and digital door signs reflect the change automatically.",
    color: "from-blue-900/30 to-cyan-900/30",
    glow: "bg-blue-500/10"
  },
  {
    image: r2,
    title: "Seamless desk & cabin resource management",
    description: "Manage bookings, view cabin capacities, and track office layouts. Allow your workforce to book desks and rooms themselves through their personalized portal, with smart conflict resolution preventing double-bookings.",
    color: "from-indigo-900/30 to-purple-900/30",
    glow: "bg-indigo-500/10"
  },
  {
    image: r3,
    title: "Smart occupancy sensors & IoT",
    description: "Our IoT integration tracks live room presence. If a booked room remains unoccupied for 10 minutes, the sensor automatically releases the space and updates the dashboard, maximizing office space efficiency.",
    color: "from-emerald-900/30 to-teal-900/30",
    glow: "bg-emerald-500/10"
  },
  {
    image: r4,
    title: "Control climate, lighting, & AV instantly",
    description: "Upon checking in, users unlock their room via QR code or NFC and gain instant access to room IoT settings. Adjust target temperature, dim lighting levels, or toggle conference displays from a single dashboard.",
    color: "from-fuchsia-900/30 to-pink-900/30",
    glow: "bg-fuchsia-500/10"
  }
];

const faqs = [
  {
    question: "What workspace management options are included in the dashboard?",
    answer: "The platform provides cabin and desk reservations, real-time occupancy sensor feeds, smart door locking controls, interactive calendar views, equipment status checks, and space utilization reports."
  },
  {
    question: "How do users check in to their booked cabins or meeting rooms?",
    answer: "Users can check in directly using their web portal, scanning the QR code displayed at the cabin's entrance, or tapping a registered NFC access card. Once checked in, the door lock releases and the environmental controls activate."
  },
  {
    question: "Can we invite external clients or guests to booked rooms?",
    answer: "Yes, you can register visitor email addresses during reservation. The system automatically sends them an invitations email with directions, a Google Maps link, and a digital visitor pass QR code for building check-in."
  },
  {
    question: "What happens if a reserved cabin is not used?",
    answer: "To prevent wasted space, the system releases bookings if no occupancy is detected by the cabin's smart sensors within 15 minutes of the scheduled start time, returning the room to the public pool."
  },
  {
    question: "Does the system support recurring bookings?",
    answer: "Yes. You can schedule recurring cabins or desks (daily, weekly, monthly, or custom cycles) from the reservation screen, with automated overlap conflict warnings."
  },
  {
    question: "How do smart climate and AV controls work?",
    answer: "When a booking goes active and you check in, a secure environment controller becomes available. This panel communicates directly with smart IoT devices in the cabin to let you adjust temperature, lighting presets, and projector power."
  },
  {
    question: "Can we manage multiple building layouts or floors?",
    answer: "Absolutely. The workspace registry is fully customizable, allowing you to categorize cabins, conference rooms, hot desks, and private suites by building, floor, department, or amenity criteria."
  },
  {
    question: "Are detailed utilization statistics provided?",
    answer: "Yes, building admins receive monthly reports on occupancy rates, peak hours, average booking duration, and popular amenities to make data-driven real estate decisions."
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

const WorkspaceShowcase = ({ cabins, bookings, handleBookNow, handleCancelBooking, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'cabins', label: 'Workspace Registry', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20' },
    { id: 'bookings', label: 'Active Bookings', color: 'from-violet-500 to-indigo-500', glow: 'shadow-violet-500/20' },
    { id: 'occupancy', label: 'Occupancy Sensors', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/20' },
    { id: 'amenities', label: 'Smart Amenities', color: 'from-rose-500 to-pink-500', glow: 'shadow-rose-500/20' },
    { id: 'support', label: 'Service Requests', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
    { id: 'analytics', label: 'Office Analytics', color: 'from-fuchsia-500 to-purple-500', glow: 'shadow-fuchsia-500/20' }
  ];

  const getLaptopContent = () => {
    switch (activeTab) {
      case 'cabins':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">Office Workspace Registry</span>
              </div>
              <span className="bg-blue-500/10 text-blue-400 text-[8px] px-1.5 py-0.5 rounded-full border border-blue-500/20 font-bold">{cabins.length} CABINS AVAILABLE</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="overflow-y-auto no-scrollbar max-h-[120px] w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-[7.5px] uppercase tracking-wider font-bold">
                      <th className="pb-1.5 pl-1">Cabin Name</th>
                      <th className="pb-1.5">Floor</th>
                      <th className="pb-1.5 text-center">Capacity</th>
                      <th className="pb-1.5">Hourly Price</th>
                      <th className="pb-1.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {cabins.map((cabin) => (
                      <tr key={cabin.id} className="hover:bg-white/5 transition-colors text-[8px]">
                        <td className="py-2 pl-1 font-medium text-white">{cabin.name}</td>
                        <td className="py-2 text-gray-300">{cabin.floor}</td>
                        <td className="py-2 text-center font-bold text-blue-400">{cabin.capacity} Pax</td>
                        <td className="py-2 font-mono">₹{cabin.price}/hr</td>
                        <td className="py-2">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleBookNow(cabin)}
                              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[7.5px] px-2 py-0.5 rounded transition-colors"
                            >
                              Book Now
                            </button>
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
      case 'bookings':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                <span className="font-semibold text-white">Active Reservations Registry</span>
              </div>
              <span className="bg-violet-500/10 text-violet-400 text-[8px] px-1.5 py-0.5 rounded-full border border-violet-500/20 font-bold">{bookings.length} RESERVED</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex-grow overflow-hidden flex flex-col justify-between">
              <div className="space-y-1.5 overflow-y-auto no-scrollbar max-h-[120px]">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-black/30 border border-white/5 rounded-lg p-2 flex items-center justify-between text-[8px] hover:border-violet-500/30 transition-all">
                    <div>
                      <h4 className="font-semibold text-white text-[9px]">{booking.cabinName}</h4>
                      <p className="text-gray-400 text-[7px]">{booking.time} • Date: {booking.date} • {booking.floor}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-2 border-r border-white/10 pr-2 mr-0.5">
                        <Copy className="w-3 h-3 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" title="Copy Invite Link" />
                        <Share2 className="w-3 h-3 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors" title="Share Pass" />
                        <Trash2 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer transition-colors" 
                          title="Cancel Booking" 
                        />
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold border ${
                        booking.status === 'confirmed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>{booking.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'occupancy':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">Live Occupancy Sensor Tracker</span>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">ALL SENSORS ONLINE</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-white text-[10px]">Executive Cabin A</h4>
                      <p className="text-[7px] text-gray-400">Sensor ID: TH-SEN-201 • 2nd Floor</p>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded font-bold border border-emerald-500/20">Occupied</span>
                  </div>
                  <div className="space-y-1 text-gray-400 text-[8px]">
                    <div className="flex justify-between">
                      <span>Live Person Count:</span>
                      <span className="text-white font-bold">3 People</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Motion Detected:</span>
                      <span className="text-emerald-400 font-bold">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Noise Level:</span>
                      <span className="text-white">45 dB (Normal)</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-1 flex items-center justify-between text-[7px] text-gray-500 font-mono">
                  <span>📡 Updated: 4 seconds ago</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between overflow-hidden">
                <h4 className="font-semibold text-white mb-1 text-[8px] uppercase tracking-wider">Live sensor status logs</h4>
                <div className="bg-black/40 border border-white/5 rounded p-1.5 flex-grow overflow-y-auto no-scrollbar font-mono text-[6px] text-emerald-500/70 leading-relaxed">
                  [18:30:02] TH-SEN-201: Motion event detected. Occupancy = 3<br />
                  [18:29:45] TH-SEN-302: Cabin vacant. Release timer scheduled.<br />
                  [18:28:10] TH-SEN-103: Hot desk zone active. Occupancy = 12<br />
                  [18:25:00] TH-LOCK-404: NFC card swap detected. Lock released.
                </div>
              </div>
            </div>
          </div>
        );
       case 'amenities':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-white">Smart Cabin Amenities Status</span>
              </div>
              <span className="bg-rose-500/10 text-rose-400 text-[8px] px-1.5 py-0.5 rounded-full border border-rose-500/20 font-bold">3 ACTIVE CONTROLLERS</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow overflow-hidden">
              <div className="bg-white/5 border border-rose-500/20 rounded-xl p-2.5 flex flex-col justify-between overflow-y-auto no-scrollbar max-h-[140px]">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-white text-[9px]">Executive Cabin A Status</h4>
                      <p className="text-[7px] text-gray-400">Smart devices diagnostic feed</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-[7.5px] text-gray-300">
                    <p className="flex items-center gap-1.5 text-emerald-400"><Wifi className="w-3.5 h-3.5" /> High-speed WiFi (350 Mbps) - Connected</p>
                    <p className="flex items-center gap-1.5 text-emerald-400"><Thermometer className="w-3.5 h-3.5" /> Target Temp 21°C - Heating Active</p>
                    <p className="flex items-center gap-1.5 text-rose-400"><Tv className="w-3.5 h-3.5" /> Room Display (85" 4K TV) - Standby Mode</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white text-[8px] uppercase tracking-wider mb-1">Equipment Health Diagnostics</h4>
                  <div className="space-y-1 text-[7px]">
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Gateway Uplink</span>
                      <span className="text-emerald-400 font-bold">100% OK</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>NFC Door Lock</span>
                      <span className="text-emerald-400 font-bold">Secured</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>HVAC Controller</span>
                      <span className="text-emerald-400 font-bold">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projector Lamp Life</span>
                      <span className="text-amber-400 font-bold">82%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[7px] border-t border-white/5 pt-1.5">
                  <span>Hardware Status:</span>
                  <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="h-full flex flex-col text-[10px] text-gray-300 font-sans p-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-white">Active Service & Support Tickets</span>
              </div>
              <span className="bg-amber-500/10 text-amber-400 text-[8px] px-1.5 py-0.5 rounded-full border border-amber-500/20 font-bold">1 PENDING</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-grow">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 space-y-1.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white text-[8px] uppercase tracking-wider mb-1">Ticket #9385 - Room 302</h4>
                  <div className="space-y-1 text-[7px]">
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Request Type</span>
                      <span className="text-white">Technical Support</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Issue</span>
                      <span className="text-amber-400 font-bold">HDMI Adapter Missing</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5">
                      <span>Assigned to</span>
                      <span className="text-white">Saidulu R. (Facilities)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority</span>
                      <span className="text-rose-400 font-bold">High</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[7px] border-t border-white/5 pt-1.5">
                  <span>Status:</span>
                  <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">In Progress</span>
                </div>
              </div>

              <div className="bg-white/5 border border-amber-500/20 rounded-xl p-2.5 flex flex-col justify-between overflow-hidden">
                <h4 className="font-semibold text-white mb-1 text-[8px] uppercase tracking-wider">User request details</h4>
                <p className="text-[7px] text-gray-400 italic leading-relaxed">"Meeting starts in 10 minutes. The HDMI to USB-C dongle is missing from the table console. Please supply immediately."</p>
                <div className="border-t border-white/5 pt-1 mt-1 text-[6px] text-amber-400 text-right">
                  - Kardam N. (Organizer)
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="h-full flex flex-col bg-[#f8fafc] text-slate-800 rounded-xl p-2.5 font-sans border border-gray-200 select-none overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
              <div className="flex items-center">
                <span className="bg-blue-50 border border-blue-150 text-blue-600 rounded px-1.5 py-0.5 font-bold text-[7px] leading-none">WEEKLY</span>
                <span className="text-[#0f172a] text-[8.5px] font-semibold ml-1.5">Weekly Office Workspace Occupancy Report</span>
              </div>
              <span className="text-emerald-600 text-[7px] font-bold tracking-wider shrink-0">✓ OPTIMIZED</span>
            </div>

            <div className="space-y-1.5">
              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">1</span>
                  <span className="text-slate-700 font-bold text-[7px]">Executive Cabin A</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider">88% Utilized</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">2</span>
                  <span className="text-slate-700 font-bold text-[7px]">Meeting Room B</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider">74% Utilized</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">3</span>
                  <span className="text-slate-700 font-bold text-[7px]">Open Workspace Zone 1</span>
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider">62% Utilized</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6.5px] font-bold">4</span>
                  <span className="text-slate-700 font-bold text-[7px]">Private Office Suite</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider">92% Utilized</span>
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
      case 'cabins':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Office Registry</span>
                <Building2 className="w-3 h-3 text-blue-400 cursor-pointer" />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center mb-2">
                <p className="text-[6.5px] text-gray-400 uppercase tracking-widest font-bold">TOTAL OFFICE SPACES</p>
                <p className="text-base font-bold text-blue-400 mt-0.5">{cabins.length} Registered</p>
              </div>

              <div className="space-y-1.5 max-h-[90px] overflow-y-auto no-scrollbar">
                {cabins.map((cabin) => (
                  <div key={cabin.id} className="flex justify-between items-center bg-black/45 rounded-lg p-1.5 border border-white/5 text-[7.5px]">
                    <span className="text-white font-medium truncate max-w-[65px]">{cabin.name}</span>
                    <span className="text-blue-400 font-bold font-mono">₹{cabin.price}/hr</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-xl text-[8.5px] mt-1 transition-colors leading-none">
              View All Cabins
            </button>
          </div>
        );
      case 'bookings':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">Reservations</span>
                <Calendar className="w-3 h-3 text-violet-400" />
              </div>

              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-2 text-center mb-2">
                <p className="text-[7px] text-violet-400 uppercase tracking-wider font-bold">ACTIVE RESERVATIONS</p>
                <p className="text-[10px] font-bold text-white mt-0.5">{bookings.length} Bookings Live</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center text-[7px]">
                <p className="text-gray-400">All slots synchronized. Integrations active with Outlook & Google Calendar.</p>
              </div>
            </div>
            
            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Schedule Cabin
            </button>
          </div>
        );
      case 'occupancy':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-[10px]">IoT Sensors</span>
                <Smartphone className="w-3 h-3 text-emerald-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center mb-2">
                <p className="text-[7px] text-gray-400 tracking-widest uppercase">LIVE SENSOR STATUS</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">ONLINE</p>
                <p className="text-[6px] text-emerald-400 font-semibold mt-0.5">EXECUTIVE CABIN A</p>
              </div>

              <div className="space-y-1 text-[8px] font-mono bg-black/40 rounded-xl p-1.5 border border-white/5">
                <div className="flex justify-between">
                  <span>Occupancy Index</span>
                  <span className="text-emerald-400">Occupied</span>
                </div>
                <div className="flex justify-between">
                  <span>Live People Count</span>
                  <span className="text-white">3 Pax</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Approve Release
            </button>
          </div>
        );
      case 'amenities':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Smart Controls</span>
                <Settings className="w-3 h-3 text-rose-400" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 text-center mb-1.5">
                <p className="text-[6px] text-gray-400 uppercase tracking-widest">CLIMATE target</p>
                <p className="text-[9px] font-bold text-white mt-0.5">Executive Cabin A</p>
                <p className="text-[6px] text-rose-400 mt-0.5 flex items-center justify-center gap-0.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span> 21.0°C Active
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-1.5 text-center text-[6px] mb-1.5">
                <p className="text-rose-300 truncate">📡 Gateway TH-SEN-201: Online</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 space-y-0.5 text-[6.5px]">
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>WiFi (350M)</span>
                  <span className="text-emerald-400 font-bold">OK</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>NFC Lock</span>
                  <span className="text-emerald-400 font-bold">OK</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>HVAC</span>
                  <span className="text-emerald-400 font-bold">21°C</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors flex items-center justify-center gap-0.5 shadow-lg shadow-rose-500/20">
              <Power className="w-2.5 h-2.5" /> Toggle Power
            </button>
          </div>
        );
      case 'support':
        return (
          <div className="h-full flex flex-col justify-between font-sans text-[9px] text-gray-300 p-0.5">
            <div>
              <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                <span className="font-bold text-white text-[10px]">Help & Support</span>
                <Award className="w-3 h-3 text-amber-400" />
              </div>

              <div className="bg-gradient-to-br from-amber-500/15 to-orange-600/25 rounded-xl p-1.5 text-center mb-1.5 border border-amber-500/20">
                <p className="text-[8px] font-bold text-white leading-none">Room 302 Request</p>
                <p className="text-[6.5px] text-amber-400 mt-1">HDMI Adapter Missing</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-1.5 space-y-0.5 text-[6.5px]">
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Assignee</span>
                  <span className="text-white">Saidulu R.</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/5 pb-0.5">
                  <span>Priority</span>
                  <span className="text-rose-400 font-bold">High</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Status</span>
                  <span className="text-amber-400 font-bold">Active</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-1.5 rounded-xl text-[9px] mt-1 transition-colors">
              Approve Resolve
            </button>
          </div>
        );
      case 'analytics':
        return (
          <div className="h-full flex flex-col justify-between bg-[#f8fafc] text-slate-800 rounded-2xl p-2 font-sans border border-gray-200 select-none overflow-y-auto no-scrollbar">
            <div>
              <div className="flex items-center justify-between border-b border-gray-250 pb-1.5 mb-1.5">
                <div className="flex items-center">
                  <span className="bg-blue-50 border border-blue-150 text-blue-600 rounded px-1.5 py-0.5 font-bold text-[6.5px] leading-none">RPT</span>
                  <span className="text-[#0f172a] text-[7.5px] font-semibold ml-1">Weekly Space Utilization</span>
                </div>
                <span className="text-[#0f172a] text-[6.5px] font-bold shrink-0">✓ OK</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-1 mb-1 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6px] font-bold">A</span>
                  <span className="text-slate-700 font-bold text-[6.5px]">Exec Cabin A</span>
                </div>
                <span className="text-emerald-700 font-bold text-[6.5px]">88%</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-1 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="bg-slate-50 border border-slate-200 text-slate-500 rounded px-1.5 py-0.5 text-[6px] font-bold">B</span>
                  <span className="text-slate-700 font-bold text-[6.5px]">Meeting Room B</span>
                </div>
                <span className="text-emerald-700 font-bold text-[6.5px]">74%</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 rounded-xl text-[7.5px] mt-1 transition-colors leading-none">
              Download CSV Report
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
          <span className="text-sm text-blue-300 font-medium">Smart Workspace Control Panel</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Everything, Integrated.
        </h2>
        <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
          Manage cabin catalogs, real-time calendars, smart IoT control dashboards, sensor events, and active facility help tickets on one screen.
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
          className="absolute right-[-10px] md:right-[-25px] bottom-[-25px] w-[130px] md:w-[165px] aspect-[9/19] bg-[#1c1c1e] rounded-[1.8rem] border-[5px] border-[#2c2c2e] shadow-2xl overflow-hidden flex flex-col z-20 pointer-events-auto"
        >
          <div className="w-full h-5 bg-[#1c1c1e] shrink-0 flex items-center justify-between px-4 pt-1">
            <span className="text-[7px] text-white font-semibold">18:30</span>
            <div className="w-[45px] h-3 bg-black rounded-b-lg shrink-0"></div>
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="w-2.5 h-1 bg-white rounded-full"></span>
            </div>
          </div>
          
          <div className="flex-grow bg-[#050505] p-2 text-left select-none overflow-y-auto no-scrollbar border border-white/5 flex flex-col justify-between">
            {getPhoneContent()}
          </div>
          <div className="w-full h-3 bg-[#1c1c1e] shrink-0 flex items-center justify-center pb-1">
            <div className="w-[45px] h-0.5 bg-white/30 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-30">
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

const WorkSpace = () => {
  const [cabins, setCabins] = useState([
    { id: 1, name: 'Executive Cabin A', capacity: 4, floor: '2nd Floor', price: 500, amenities: ['WiFi', 'AC', 'Projector', 'Whiteboard'], image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&q=80&w=800', status: 'Available' },
    { id: 2, name: 'Meeting Room B', capacity: 8, floor: '3rd Floor', price: 800, amenities: ['WiFi', 'AC', 'Projector', 'Video Conference'], image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&q=80&w=800', status: 'Booked' },
    { id: 3, name: 'Open Workspace Zone 1', capacity: 20, floor: '1st Floor', price: 200, amenities: ['WiFi', 'AC', 'Standing Desks'], image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&q=80&w=800', status: 'Available' },
    { id: 4, name: 'Private Office Suite', capacity: 2, floor: '4th Floor', price: 1200, amenities: ['WiFi', 'AC', 'Private Bathroom', 'Mini Fridge'], image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&q=80&w=800', status: 'Available' },
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, cabinId: 1, cabinName: 'Executive Cabin A', date: '2026-06-30', time: '10:00 AM - 12:00 PM', status: 'confirmed', floor: '2nd Floor', rating: 4, attendees: 4, source: 'Admin Portal' },
    { id: 2, cabinId: 2, cabinName: 'Meeting Room B', date: '2026-07-01', time: '02:00 PM - 04:00 PM', status: 'pending', floor: '3rd Floor', rating: 5, attendees: 8, source: 'Mobile App' },
    { id: 3, cabinId: 3, cabinName: 'Open Workspace Zone 1', date: '2026-06-29', time: '09:00 AM - 05:00 PM', status: 'active', floor: '1st Floor', rating: 4, attendees: 1, source: 'Slack Bot' },
  ]);

  const [selectedCabin, setSelectedCabin] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newBooking, setNewBooking] = useState({ date: '', time: '' });
  const [activeTab, setActiveTab] = useState('cabins');
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  // Smart Control state variables
  const [targetTemp, setTargetTemp] = useState(21);
  const [lightLevel, setLightLevel] = useState(70);
  const [projectorOn, setProjectorOn] = useState(false);
  const [smartLockSecured, setSmartLockSecured] = useState(true);

  const handleBookNow = (cabin) => {
    setSelectedCabin(cabin);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedCabin && newBooking.date && newBooking.time) {
      const booking = {
        id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
        cabinId: selectedCabin.id,
        cabinName: selectedCabin.name,
        date: newBooking.date,
        time: newBooking.time,
        status: 'pending',
        floor: selectedCabin.floor,
        rating: 5,
        attendees: selectedCabin.capacity,
        source: 'Web App'
      };
      setBookings([...bookings, booking]);
      setShowBookingModal(false);
      setNewBooking({ date: '', time: '' });
      setSelectedCabin(null);
      
      // Auto switch view to bookings list inside showcase
      setActiveTab('bookings');
    }
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] md:pt-[64px] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
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
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">Smart Workplace Coordinator</span>
              </div>
              
              <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5.2rem] font-bold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                Workspaces.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Reimagined.</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Book premium cabins, manage desk occupancy, and control room climate/AV instantly. A unified system integrating calendars, physical hardware, and facilities helpdesks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0 mt-8">
                <button 
                  onClick={() => {
                    const el = document.getElementById('pipeline-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Manage Bookings
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedCabin(cabins[0]);
                    setShowBookingModal(true);
                  }}
                  className="w-full sm:w-auto bg-[#1c1c1e] text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105 text-center"
                >
                  Book Cabin
                </button>
              </div>
            </motion.div>
          </section>

          {/* KANBAN VISUALIZATION SECTION (Reservation Pipeline) */}
          <section id="pipeline-section" className="px-6 max-w-[1400px] mx-auto mb-20 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Reservation Pipeline</h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                Track room usage flow in real-time. Automatically moves reservations based on scheduled times and physical check-ins.
              </p>
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
                      <span className="bg-white/10 text-xs px-2.5 py-1 rounded-full text-gray-300 font-medium">
                        {bookings.filter(b => b.status === col.id).length}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {bookings.filter(b => b.status === col.id).map((booking, idx) => (
                        <motion.div 
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1) }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-blue-500/30 hover:bg-white/10 transition-all shadow-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-white">{booking.cabinName}</h4>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < booking.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">Organizer: {booking.organizer}</p>
                          <p className="text-xs text-blue-400 mb-4">{booking.time} • {booking.floor}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {booking.source}</span>
                            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">{booking.attendees} Pax</span>
                          </div>
                        </motion.div>
                      ))}
                      
                      {bookings.filter(b => b.status === col.id).length === 0 && (
                        <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-gray-500 text-sm">
                          No reservations active in this stage
                        </div>
                      )}
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
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* WORKSPACE REGISTRY & CONTROLS SHOWCASE */}
          <WorkspaceShowcase 
            cabins={cabins}
            bookings={bookings}
            handleBookNow={handleBookNow}
            handleCancelBooking={handleCancelBooking}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* FAQ SECTION */}
          <section className="px-6 max-w-[900px] mx-auto mb-32 z-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">Everything you need to know about the smart workspace ecosystem.</p>
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

          {/* SMART ENVIRONMENT INTEGRATION SHOWCASE */}
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
                  <span className="text-sm text-gray-300 font-medium">IoT Room Control & Access</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Checked-in! <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Now what?</span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                  Unlock the doors instantly. Once you check in at the cabin door via NFC or QR code, your environment panel wakes up. Adjust the smart devices directly from this screen.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Automated NFC/QR access entry keys</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Direct smart control over HVAC & lighting</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Synchronized conference equipment settings</li>
                </ul>
              </div>
              
              {/* SMART ROOM INTERACTIVE MOCKUP */}
              <div className="flex-1 relative z-10 w-full">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
                   <div className="flex flex-col gap-5">
                      {/* Active Room Title */}
                      <div className="flex items-center justify-between p-4 bg-black/45 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold">A</div>
                          <div>
                            <p className="text-white font-medium">Executive Cabin A</p>
                            <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>Checked In</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSmartLockSecured(!smartLockSecured)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                            smartLockSecured 
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          {smartLockSecured ? 'Unlock Door' : 'Lock Door'}
                        </button>
                      </div>

                      {/* Interactive Controls */}
                      <div className="space-y-4">
                        {/* Climate Slider */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold flex items-center gap-2"><Thermometer className="w-4 h-4 text-orange-400" /> Climate Control</span>
                            <span className="text-xs font-mono font-bold text-orange-400">{targetTemp}°C</span>
                          </div>
                          <input 
                            type="range" 
                            min="16" 
                            max="28" 
                            value={targetTemp} 
                            onChange={(e) => setTargetTemp(parseInt(e.target.value))}
                            className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                          />
                        </div>

                        {/* Lights Control */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold flex items-center gap-2"><Volume2 className="w-4 h-4 text-yellow-400" /> Lighting Intensity</span>
                            <span className="text-xs font-mono font-bold text-yellow-400">{lightLevel}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={lightLevel} 
                            onChange={(e) => setLightLevel(parseInt(e.target.value))}
                            className="w-full accent-yellow-400 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                          />
                        </div>

                        {/* Projector Power & QR Access */}
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => setProjectorOn(!projectorOn)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:bg-white/5 ${
                              projectorOn 
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                                : 'bg-[#1c1c1e] border-white/10 text-gray-400'
                            }`}
                          >
                            <Tv className="w-5 h-5" />
                            <span className="text-xs font-semibold">{projectorOn ? 'Projector On' : 'Projector Off'}</span>
                          </button>
                          <div className="p-3 bg-[#1c1c1e] border border-white/10 rounded-xl flex flex-col items-center justify-center gap-2">
                            <QrCode className="w-5 h-5 text-gray-300" />
                            <span className="text-xs font-semibold text-gray-300">Access QR Code</span>
                          </div>
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
              className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
                  Optimize your workspace <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">efficiency today.</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Join modern, distributed teams using smart environment orchestration.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <button 
                    onClick={() => {
                      setSelectedCabin(cabins[0]);
                      setShowBookingModal(true);
                    }}
                    className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn"
                  >
                    Reserve Workspace
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <Link to="/contact" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                    Talk to Facilities
                  </Link>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </motion.div>
          </section>

        </main>
      </div>
      <Footer />

      {/* Booking Modal */}
      {showBookingModal && selectedCabin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-6"
          onClick={() => setShowBookingModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0b] border border-white/10 rounded-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">Book {selectedCabin.name}</h2>
            <p className="text-gray-400 mb-6">{selectedCabin.floor} • Capacity: {selectedCabin.capacity} People • ₹{selectedCabin.price}/hr</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Choose Date</label>
                <input
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Select Time Slot</label>
                <select
                  value={newBooking.time}
                  onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select time slot</option>
                  <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                  <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                  <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={!newBooking.date || !newBooking.time}
                className="flex-1 bg-[#0071e3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default WorkSpace;