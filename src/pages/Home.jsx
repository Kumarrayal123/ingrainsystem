import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  HeartPulse, 
  Building2, 
  Microscope,
  ChevronRight,
  ShieldCheck,
  Zap,
  AlertCircle,
  XCircle,
  CheckCircle2,
  Target,
  Database,
  ArrowUpRight,
  Sparkles,
  LayoutDashboard,
  Fingerprint,
  GitBranch
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
         {/* Floating glowing orbs simulating spatial computing space */}
         <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
         <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">

      <main className="pb-32">
        {/* Simple Hero Section — Normal Scroll */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-white mb-6">
              Connect Your Business.<br />
              Not Just Your Tools.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light mb-3">
              One platform. One login. One Dashboard.
            </p>

            <p className="text-sm md:text-base text-gray-500 font-light max-w-lg mx-auto mb-10">
              Access and connect the best tools in the market — all working together as one system.
            </p>

            <div className="flex flex-row gap-3 justify-center items-center">
              <Link to="/contact" className="bg-[#0071e3] text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:scale-105">
                Book Demo
              </Link>
              <Link to="/how-it-works" className="bg-[#1c1c1e] text-white border border-white/10 px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105">
                See How It Works
              </Link>
            </div>
          </motion.div>

        </section>

        {/* 4. "Get to know" Feature Carousel - Extra Large Stylish Icons */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-white mb-10 w-full text-left">
             Get to know Ingrain Systems.
          </h2>
          
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-10">
            {/* CARD 1 - CRM - Emerald/Teal */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[500px] h-[600px] bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <div>
                <h3 className="text-xl text-gray-400 mb-2 relative z-10">Performance workflows</h3>
                <h4 className="text-4xl font-semibold leading-tight relative z-10">
                  CRM in. <br /> one place.
                </h4>
              </div>
              <div className="flex justify-end relative z-10">
                <LayoutDashboard className="w-56 h-56 text-emerald-400 opacity-90 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(16,185,129,0.5)]" strokeWidth={1} />
              </div>
            </div>

            {/* CARD 2 - Privacy & Security - Cyan/Blue */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[500px] h-[600px] bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <div>
                <h3 className="text-xl text-gray-400 mb-2 relative z-10">Privacy & Security</h3>
                <h4 className="text-4xl font-semibold leading-tight relative z-10">
                  Your business is <br /> nobody else's.
                </h4>
              </div>
              <div className="flex justify-end relative z-10">
                <Fingerprint className="w-56 h-56 text-blue-400 opacity-90 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]" strokeWidth={1} />
              </div>
            </div>

            {/* CARD 3 - Universal Architecture - Indigo/Fuchsia */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[500px] h-[600px] bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
              <div>
                <h3 className="text-xl text-gray-400 mb-2 relative z-10">Universal Architecture</h3>
                <h4 className="text-4xl font-semibold leading-tight relative z-10">
                  Everything talks to everything.
                </h4>
              </div>
              <div className="flex justify-end relative z-10">
                <GitBranch className="w-56 h-56 text-indigo-400 opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </section>

        {/* 11. VISION Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111113]/80 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black/0 to-black/0 opacity-50 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-lg p-2 uppercase">
                  Vision
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8 leading-tight text-center">
                Built in India. <br />
                Designed to Connect the World.
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8"></div>
              
              <div className="max-w-2xl mx-auto space-y-4 text-xl md:text-2xl font-light text-gray-300">
                <p>We connect the best tools into one platform.</p>
                <p>We create a unified ecosystem where businesses operate as one system.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Problem, Pain & Shift Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-white mb-10 w-full text-left">
             Problem, Pain & Shift.
          </h2>
          
          {/* Top Row - PROBLEM and PAIN side by side (equal width) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             
             {/* PROBLEM - Large Card matching Get to know card 1 (Emerald/Teal) */}
             <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-full h-[550px] bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <AlertCircle className="w-14 h-14 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 uppercase">
                  PROBLEM
                </h2>
                <h4 className="text-xl font-semibold text-white mb-6">Great Tools. Broken Systems.</h4>
                <ul className="text-gray-300 font-light space-y-4 text-base">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> CRM in one place</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> HR in another</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> Marketing tools scattered</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> Data everywhere</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> Multiple logins. No connection.</li>
                </ul>
              </div>
            </motion.div>

            {/* PAIN - Large Card matching Get to know card 2 (Cyan/Blue) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full h-[550px] bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 relative overflow-hidden group hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <XCircle className="w-14 h-14 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase">
                  PAIN
                </h2>
                <h4 className="text-xl font-semibold text-white mb-6">This Is What It Creates</h4>
                <ul className="text-gray-300 font-light space-y-4 text-base">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> Disconnected data</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> No visibility</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> Teams in silos</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span> Time lost switching systems</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span> <span>Your tools are strong. Your system is not</span></li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - SHIFT Card spanning full width (same width as both cards combined) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center border border-white/10 relative overflow-hidden group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500"
            style={{ minHeight: '300px' }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[100px] group-hover:bg-fuchsia-500/20 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
              <CheckCircle2 className="w-20 h-20 text-indigo-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]" strokeWidth={1.2} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 uppercase">
                SHIFT
              </h2>
              <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4">You Don't Need More Software</h4>
              <p className="text-lg md:text-xl text-indigo-300 font-light leading-relaxed max-w-2xl">
                You need a system that connects what you already use.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Solution Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg p-2 uppercase">
              solution
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {[
                "One User ID & Password.",
                "Access multiple tools in one platform.",
                "Integrated data across systems.",
                "One dashboard, complete visibility.",
                "We don't replace tools. We connect them."
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex items-center gap-6 group hover:border-white/20 transition-colors duration-500 ${idx === 4 ? 'md:col-span-2 justify-center text-center' : ''}`}
                >
                  {idx !== 4 && <span className="text-5xl font-black text-white/20 group-hover:text-white/40 transition-colors">{idx + 1}</span>}
                  <h3 className={`text-2xl md:text-3xl font-medium text-white tracking-tight ${idx === 4 ? 'text-4xl' : ''}`}>
                    {feature}
                  </h3>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 flex justify-center w-full"
            >
              <div className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform cursor-pointer text-lg shadow-lg">
                Enter the Ecosystem
              </div>
            </motion.div>

          </div>
        </section>

        {/* FINAL CTA Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-1000"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight">
                Stop Managing Tools. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Start Running Your Business.</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-6 justify-center items-center w-full">
                <Link to="/contact" className="w-full sm:w-auto bg-[#0071e3] text-white px-10 py-5 rounded-full text-xl font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                  Book Demo
                  <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </motion.div>
        </section>

        {/* 7. Use Cases - Modern Effects */}
        <section className="px-6 max-w-[1200px] mx-auto mt-20 mb-10 relative">
          <div className="relative py-20 rounded-[3rem] shadow-2xl border border-white/10 backdrop-blur-sm overflow-hidden bg-gradient-to-br from-[#0a1128] via-[#1a0b2e] to-[#0a1128]">
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="text-center mb-16 px-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-purple-500/30"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300 font-medium">Powering Businesses Worldwide</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 drop-shadow-lg">
                 Use Cases
              </h2>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white/80">
                 Built for Growing Businesses.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-10 relative z-10">
               
               {/* Healthcare Card */}
               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-md p-8 rounded-[2rem] border border-purple-500/30 flex flex-col items-center text-center hover:border-purple-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
               >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/10 group-hover:to-purple-600/5 transition-all duration-500"></div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/30">
                   <HeartPulse className="w-9 h-9 text-purple-300 group-hover:text-purple-200 transition-colors" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-3">Healthcare</h4>
                <p className="text-gray-300 text-[15px] leading-relaxed">Empower clinics and modern hospitals with integrated lab systems and HR.</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-purple-400" />
                </div>
               </motion.div>
               
               {/* MSMEs Card */}
               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-md p-8 rounded-[2rem] border border-blue-500/30 flex flex-col items-center text-center hover:border-blue-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
               >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:to-blue-600/5 transition-all duration-500"></div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/30">
                   <Zap className="w-9 h-9 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-3">MSMEs</h4>
                <p className="text-gray-300 text-[15px] leading-relaxed">Scale aggressively with automated workflows out of the box.</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-blue-400" />
                </div>
               </motion.div>
               
               {/* Service Businesses Card */}
               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md p-8 rounded-[2rem] border border-indigo-500/30 flex flex-col items-center text-center hover:border-indigo-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
               >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-600/0 group-hover:from-indigo-500/10 group-hover:to-indigo-600/5 transition-all duration-500"></div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-indigo-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-indigo-500/30">
                   <Users className="w-9 h-9 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-3">Service Businesses</h4>
                <p className="text-gray-300 text-[15px] leading-relaxed">Manage your workforce, scheduling, and coworking seamlessly.</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-indigo-400" />
                </div>
               </motion.div>
               
               {/* Enterprises Card */}
               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-violet-900/40 to-violet-800/20 backdrop-blur-md p-8 rounded-[2rem] border border-violet-500/30 flex flex-col items-center text-center hover:border-violet-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
               >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-600/0 group-hover:from-violet-500/10 group-hover:to-violet-600/5 transition-all duration-500"></div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/30 to-violet-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-violet-500/30">
                   <Building2 className="w-9 h-9 text-violet-300 group-hover:text-violet-200 transition-colors" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-3">Enterprises</h4>
                <p className="text-gray-300 text-[15px] leading-relaxed">Connect multiple subsidiaries and systems into one core architecture.</p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-violet-400" />
                </div>
               </motion.div>
               
            </div>
          </div>
        </section>

      </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;