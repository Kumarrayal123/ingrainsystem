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
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import BentoFeatures from '../components/BentoFeatures';
import WhyChooseUs from '../components/WhyChooseUs';

import imgLabAsset from "../img/Lab-1.jpg";
import imgCampAsset from "../img/camp-1.jpg";

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
    shadow: "shadow-violet-500/10"
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
    shadow: "shadow-blue-500/10"
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
    <div id={product.id} className="w-full h-screen flex items-center justify-center snap-start px-4 py-4 md:py-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-[950px] bg-[#0a0a0b]/80 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 border border-white/10 relative overflow-hidden flex flex-col ${product.shadow} transition-all duration-700 hover:border-white/20`}
      >
        {/* Animated Background Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br ${product.bgColor} rounded-full blur-[60px] md:blur-[80px] pointer-events-none`}
        ></motion.div>

        {/* Top Section: Split Content & Image */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 mb-4 md:mb-6">
          {/* Image - First on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[280px] lg:max-w-lg order-first lg:order-none"
          >
            <div className="relative rounded-[1rem] md:rounded-[1.2rem] overflow-hidden shadow-2xl border border-white/10 group bg-[#161617] p-1 md:p-1.5">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto rounded-lg group-hover:scale-[1.01] transition-transform duration-700 shadow-inner"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-1.5 md:mb-2"
            >
              <div className={`p-1.5 md:p-2 rounded-xl bg-white/5 border border-white/10 ${product.iconColor}`}>
                <Icon className="w-3.5 h-3.5 md:w-4 h-4" />
              </div>
              <h3 className="text-[8px] md:text-[9px] font-bold text-gray-500 tracking-[0.4em] uppercase">
                {product.subtitle}
              </h3>
              {product.isUpcoming && (
                <span className="bg-emerald-500/10 text-emerald-400 text-[7px] md:text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/20 tracking-widest uppercase animate-pulse">
                  Coming Soon
                </span>
              )}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-3 tracking-tight"
            >
              {product.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs md:text-sm text-gray-400 font-light leading-relaxed line-clamp-2 md:line-clamp-3"
            >
              {product.description}
            </motion.p>
          </div>
        </div>

        {/* Bottom Section: Split Bullet Points */}
        <div className="relative z-10 w-full grid grid-cols-2 lg:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 mb-6 max-w-2xl mx-auto border-t border-white/5 pt-4 md:pt-6">
          {product.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.1), duration: 0.5 }}
              className="flex items-center gap-2 group/item justify-start"
            >
              <div className={`w-1 h-1 rounded-full ${product.dotColor} shrink-0 shadow-[0_0_6px_${product.color}]`} />
              <span className="text-[10px] md:text-xs text-gray-300 font-light tracking-wide text-left line-clamp-1">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Centered Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 flex justify-center"
        >
          <Link to="/contact" className={`inline-flex ${product.isUpcoming ? 'bg-white/5 border border-white/10 text-white' : 'bg-[#0071e3] text-white'} px-6 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-white/10 transition-all hover:scale-105 shadow-2xl items-center gap-2.5 group/btn`}>
            {product.isUpcoming ? 'Notify Me' : 'Book Demo'} <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Products = () => {
  return (
    <main className="bg-black text-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth font-sans no-scrollbar selection:bg-blue-500/30">

      {/* Hero Section */}
      <section className="snap-start min-h-screen relative">
        <Hero
          heroImage={imgHero}
          title={<><span className="text-white">The Product</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ecosystem.</span></>}
          subtitle="Precision-engineered tools designed to integrate and elevate every aspect of your enterprise."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="px-6 -mt-32 relative z-30"
        >
          <div className="max-w-[1200px] mx-auto flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">The Lineup</h2>
              <p className="text-gray-400 font-light mt-1">Explore 5 core modules designed for scale.</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex -space-x-4">
                {[imgRecruitment, imgHrms, imgBmi, imgCoworking].map((img, i) => (
                  <img key={i} src={img} className="w-12 h-12 rounded-full border-2 border-[#161617] object-cover shadow-lg" alt="product preview" />
                ))}
              </div>
              <Link to="/contact" className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-xl">
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Scroll to Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent relative">
            <motion.div
              animate={{ y: [0, 60] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"
            />
          </div>
        </div>
      </section>

      {/* Products List */}
      {productsData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Platform & Marketplace Section */}
      <section className="snap-start min-h-screen flex items-center">
        <BentoFeatures />
      </section>

      {/* Why Choose Us Section */}
      <section className="snap-start min-h-screen flex items-center">
        <WhyChooseUs />
      </section>

      {/* Future Section */}
      <section className="snap-start min-h-screen flex items-center">
        <div className="px-6 max-w-[1200px] mx-auto w-full py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 drop-shadow-lg p-2 uppercase">
              Future
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              From Systems to Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-rose-600/10 blur-[100px] pointer-events-none z-0"></div>

            {[
              { title: "AI-driven insights", icon: Sparkles, desc: "Turn raw data into actionable intelligence instantly.", color: "from-pink-500 to-rose-500", glow: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] border-pink-500/20" },
              { title: "Automated workflows", icon: Cpu, desc: "Self-optimizing systems that run your business on autopilot.", color: "from-purple-500 to-fuchsia-500", glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] border-purple-500/20" },
              { title: "Predictive decisions", icon: Radar, desc: "Anticipate market trends and operations before they happen.", color: "from-rose-500 to-orange-500", glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.3)] border-rose-500/20" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={`relative z-10 bg-[#111113] border ${item.glow} rounded-[2rem] p-10 flex flex-col items-center text-center overflow-hidden group transition-all duration-500 hover:-translate-y-2`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color} p-[2px] mb-8 relative`}>
                  <div className="absolute inset-[2px] bg-black rounded-full"></div>
                  <item.icon className="relative z-10 w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA & Footer Section */}
      <section className="snap-start min-h-screen flex flex-col bg-gradient-to-b from-black to-[#0a0a0b]">
        <div className="flex-grow flex items-center justify-center py-20">
          <CTASection />
        </div>
      </section>

      {/* Navigation Dot Sidebar */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
        {productsData.map((product) => (
          <a
            key={product.id}
            href={`#${product.id}`}
            className="group relative flex items-center justify-end"
            title={product.title}
          >
            <span className="absolute right-8 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-widest uppercase pointer-events-none whitespace-nowrap">
              {product.title}
            </span>
            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-150 border border-white/10" />
          </a>
        ))}
      </div>
    </main>
  );
};

export default Products;
