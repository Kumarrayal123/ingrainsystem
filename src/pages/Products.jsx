import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Zap,
  HeartPulse,
  Building2,
  Microscope,
  ChevronRight,
  Sparkles,
  Cpu,
  Radar
} from 'lucide-react';
import Footer from '../components/Footer';
import BentoFeatures from '../components/BentoFeatures';
import WhyChooseUs from '../components/WhyChooseUs';

import imgLabAsset from "../img/Lab-1.jpg";

const imgHero = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&q=80&w=2426`;
const imgHrms = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&q=80&w=2670`;
const imgRecruitment = `https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&q=80&w=2670`;
const imgBmi = `https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&q=80&w=2670`;
const imgCoworking = `https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&q=80&w=2670`;
const imgLab = imgLabAsset;

const productsData = [
  {
    id: "recruitment",
    title: "Recruitment",
    subtitle: "HIRE SMARTER",
    description: "Build your dream team with a precision-engineered recruitment ecosystem that automates the heavy lifting.",
    items: [
      "Admin & User Dashboards",
      "Job Posting & Management System",
      "Dynamic Candidate Pipelines",
      "Assessment Management",
      "Interview Scheduling & Status Updates",
      "Employee Journey Tracking"
    ],
    image: imgRecruitment,
    icon: Briefcase,
    color: "violet",
    bgColor: "from-violet-600/20 to-transparent",
    iconColor: "text-violet-400",
    dotColor: "bg-violet-500",
    shadow: "shadow-violet-500/10",
    viewMorePath: "/recruitment"
  },
  {
    id: "payroll",
    title: "Payroll",
    subtitle: "SYSTEMS",
    description: "Seamlessly manage payroll, compliance, and employee operations in one unified command center.",
    items: [
      "Admin & Employee Attendance Dashboards",
      "Leave & Holiday Management System",
      "Shift Scheduling & Roster Management",
      "Attendance Regularization & Approval Workflow",
      "Geo-location & Remote Attendance Tracking",
      "Productivity Tracking & Payroll Processing ",

    ],
    image: imgHrms,
    icon: Zap,
    color: "blue",
    bgColor: "from-blue-600/20 to-transparent",
    iconColor: "text-blue-400",
    dotColor: "bg-blue-500",
    shadow: "shadow-blue-500/10",
    viewMorePath: "/attendance"
  },
  {
    id: "Medical Camps",
    title: "Medical Camps",
    subtitle: "HEALTH",
    description: "Organize and manage medical camps efficiently with a centralized system for coordination, reporting, and patient care.",
    items: [
      "Admin & User Dashboards with real-time insights",
      "Create & Manage Medical Camps",
      "Partner & Doctor Invitation Management",
      "Patient Registration & Medical Reports Tracking",
      "Camp Scheduling & Resource Planning",
      "Real-time Camp Activity Monitoring",
    ],
    image: imgBmi,
    icon: HeartPulse,
    color: "rose",
    bgColor: "from-rose-600/20 to-transparent",
    iconColor: "text-rose-400",
    dotColor: "bg-rose-500",
    shadow: "shadow-rose-500/10"
  },
  {
    id: "coworking",
    title: "Coworking Space",
    subtitle: "SPACES",
    description: "Optimize your physical footprint with intuitive space management and floor plan logistics.",
    items: [
      "Admin & User Dashboards with real-time insights",
      "Desk & Meeting cabin Booking Management",
      "Member & Visitor Access Control",
      "Space Utilization & Occupancy Tracking",
    ],
    image: imgCoworking,
    icon: Building2,
    color: "orange",
    bgColor: "from-orange-600/20 to-transparent",
    iconColor: "text-orange-400",
    dotColor: "bg-orange-500",
    shadow: "shadow-orange-500/10"
  },
  {
    id: "lab",
    title: "Lab Management",
    subtitle: "PRECISION",
    description: "Streamline laboratory operations with a smart system for sample tracking, reporting, and compliance, ensuring accuracy at every step",
    items: [
      "Admin & Phlebotomist Dashboards with real-time insights",
      "Home Sample Collection & Scheduling Management",
      "Sample Tracking & Processing Workflow",
      "Patient Reports Generation & Secure Access",
      "Inventory & Lab Asset Monitoring",
      "Test Booking & Appointment Management"
      
    ],
    image: imgLab,
    icon: Microscope,
    color: "emerald",
    bgColor: "from-emerald-600/20 to-transparent",
    iconColor: "text-emerald-400",
    dotColor: "bg-emerald-500",
    shadow: "shadow-emerald-500/10",
    isUpcoming: true
  }
];

const ProductCard = ({ product }) => {
  const Icon = product.icon;

  return (
    <div id={product.id} className="w-full min-h-screen flex items-center justify-center px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-[950px] bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 relative overflow-hidden flex flex-col ${product.shadow} transition-all duration-700 hover:border-white/20`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-[280px] lg:max-w-lg"
          >
            <div className="relative rounded-[1rem] md:rounded-[1.2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#161617] p-1.5">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>

          <div className="flex-1 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${product.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.4em] uppercase">
                {product.subtitle}
              </h3>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              {product.title}
            </h2>

            <p className="text-sm text-gray-400 font-light leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full grid grid-cols-2 gap-x-8 gap-y-3 mb-8 max-w-2xl mx-auto border-t border-white/5 pt-6">
          {product.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${product.dotColor} shrink-0`} />
              <span className="text-xs text-gray-300 font-light tracking-wide">{item}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex justify-center gap-4">
          <Link to="/contact" className={`inline-flex ${product.isUpcoming ? 'bg-white/5 border border-white/10 text-white' : 'bg-[#0071e3] text-white'} px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-2xl items-center gap-2`}>
            {product.isUpcoming ? 'Notify Me' : 'Book Demo'} <ChevronRight className="w-4 h-4" />
          </Link>
          {product.viewMorePath && (
            <Link to={product.viewMorePath} className="inline-flex bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-white/10 transition-all hover:scale-105 shadow-2xl items-center gap-2">
              View More <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Products = () => {
  return (
    <main className="bg-black text-white min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-black">
         <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        {/* Simplified Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto mb-20"
          >
            <h1 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold tracking-tighter leading-none mb-8">
              <span className="text-white">The Product</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ecosystem.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto">
              Precision-engineered tools designed to integrate and elevate every aspect of your enterprise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-[1200px] mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl font-bold text-white tracking-tight">The Lineup</h2>
                <p className="text-gray-400 font-light mt-2 text-lg">Explore 5 core modules designed for scale.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="hidden sm:flex -space-x-4">
                  {[imgRecruitment, imgHrms, imgBmi, imgCoworking].map((img, i) => (
                    <img key={i} src={img} className="w-14 h-14 rounded-full border-2 border-black object-cover shadow-xl" alt="product preview" />
                  ))}
                </div>
                <Link to="/contact" className="bg-white text-black px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-2xl">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products List */}
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Other Sections */}
        <BentoFeatures />
        <WhyChooseUs />

        {/* Future Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 relative">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 uppercase">
                Future
              </h2>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                From Systems to Intelligence
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "AI-driven insights", icon: Sparkles, desc: "Turn raw data into actionable intelligence instantly.", color: "from-pink-500 to-rose-500" },
                { title: "Automated workflows", icon: Cpu, desc: "Self-optimizing systems that run your business on autopilot.", color: "from-purple-500 to-fuchsia-500" },
                { title: "Predictive decisions", icon: Radar, desc: "Anticipate market trends and operations before they happen.", color: "from-rose-500 to-orange-500" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#111113] border border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center text-center hover:border-white/10 transition-all duration-500"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color} mb-8 shadow-2xl`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-gray-400 leading-relaxed font-light text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
};

export default Products;
