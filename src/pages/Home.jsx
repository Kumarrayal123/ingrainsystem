import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  Sparkles,
  Cpu,
  Radar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import camp from "../img/camp-1.jpg";
import Lab from "../img/Lab-1.jpg";
import StickyReveal from '../components/StickyReveal';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';

const imgHero = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426`;
const imgHrms = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670`;
const imgRecruitment = `https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2670`;
const imgLab = `https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2670`;


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
        {/* 3. Massive Scrolling Hero Frame */}
        <Hero 
          heroImage={imgHero}
          title={<><span className="text-white text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[1.1] block px-4 tracking-tight">Connect Your Business.<br />Not Just Your Tools.</span></>}
          subtitle="One platform. One login. One Dashboard."
          description="Access and connect the best tools in the market — all working together as one system."
          cta={
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-colors shadow-lg">Book Demo</Link>
              <a href="#how-it-works" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-colors shadow-lg">See How It Works</a>
            </div>
          }
        />

        {/* 4. "Get to know" Feature Carousel */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-white mb-10 w-full text-left">
             Get to know Ingrain.
          </h2>
          
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-10">
             
             {/* Feature Card 1 */}
             <div className="snap-center shrink-0 w-[85vw] md:w-[500px] h-[600px] bg-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm border border-white/10 relative overflow-hidden group">
                <div>
                   <h3 className="text-xl font-semibold text-gray-400 mb-2">Performance workflows</h3>
                   <h4 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                     CRM in. <br/> one place.
                     
                   </h4>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform duration-500">
                   <Zap className="w-96 h-96 text-orange-500" />
                </div>
             </div>

             {/* Feature Card 2 */}
             <div className="snap-center shrink-0 w-[85vw] md:w-[500px] h-[600px] bg-black/40 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl border border-white/10 relative overflow-hidden group">
                <div>
                   <h3 className="text-xl font-semibold text-gray-400 mb-2">Privacy & Security</h3>
                   <h4 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                     Your business is nobody else’s.
                   </h4>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-30 group-hover:scale-110 transition-transform duration-500">
                   <ShieldCheck className="w-96 h-96 text-blue-500" />
                </div>
             </div>

             {/* Feature Card 3 */}
             <div className="snap-center shrink-0 w-[85vw] md:w-[500px] h-[600px] bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group border border-white/10 hover:shadow-xl transition-all duration-500">
                <div className="z-10">
                   <h3 className="text-xl font-semibold text-gray-400 mb-2">Universal Architecture</h3>
                   <h4 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                     Everything talks to everything.
                   </h4>
                </div>
                <div className="absolute bottom-10 right-10 flex gap-4 transition-transform duration-700 group-hover:translate-y-[-10px] group-hover:rotate-2">
                   <img src={imgRecruitment} className="w-48 h-auto rounded-xl shadow-lg rotate-[-10deg] group-hover:rotate-[-5deg] transition-all duration-700" alt="img1" />
                   <img src={imgHrms} className="w-48 h-auto rounded-xl shadow-lg rotate-[10deg] absolute left-20 top-20 group-hover:rotate-[5deg] transition-all duration-700" alt="img2" />
                </div>
             </div>
          </div>
        </section>

        {/* 5. "Explore the Lineup" Comparison Grid */}
        <section className="px-6 max-w-[1200px] mx-auto bg-white/5 backdrop-blur-xl py-20 rounded-[3rem] shadow-sm border border-white/10 mb-32 z-20 relative">
          <div className="flex flex-col items-center mb-20 px-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg p-2 uppercase">
               Our Products.
            </h2>
            <Link to="/products" className="text-xl text-[#0066cc] hover:underline flex items-center md:justify-center gap-1 font-medium mt-4">
              Compare all modules <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory no-scrollbar pb-10 px-6 md:px-10">
            
            {/* Base Product Card */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[320px] flex flex-col items-center text-center">
              <img src={imgHrms} alt="HRMS" className="w-56 h-auto mb-8 rounded-xl shadow-md border border-white/10" />
              <div className="w-4 h-4 bg-gray-500 rounded-full mb-4"></div>
              <h3 className="text-3xl font-semibold mb-2 text-white">Recruitment</h3>
              <p className="text-gray-300 font-medium mb-6">Streamline your hiring process and find top talent faster</p>
              <h4 className="text-sm font-normal text-gray-400 mb-6">Free</h4>
              <Link to="/products" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-[15px] font-normal hover:bg-[#0077ED] transition-colors mb-8">
                 Buy
              </Link>
              
           
            </div>

            {/* Pro Product Card */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[320px] flex flex-col items-center text-center">
              <img src={imgRecruitment} alt="Recruitment" className="w-56 h-auto mb-8 rounded-xl shadow-md border border-white/10" />
              <div className="flex gap-2 mb-4">
                 <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                 <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-semibold mb-2 text-white">Payroll</h3>
              <p className="text-gray-300 font-medium mb-6">Handle payroll, onboarding, and employee management.</p>
              <h4 className="text-sm font-normal text-gray-400 mb-6">From ₹4,999/mo.</h4>
              <Link to="/products" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-[15px] font-normal hover:bg-[#0077ED] transition-colors mb-8">
                 Buy
              </Link>
            </div>

            {/* Max/Studio Product Card */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[320px] flex flex-col items-center text-center">
              <img src={Lab} alt="Lab" className="w-56 h-auto mb-8 rounded-xl shadow-md border border-white/10" />
              <div className="w-4 h-4 bg-gray-800 rounded-full mb-4"></div>
              <h3 className="text-3xl font-semibold mb-2 text-white">Lab Systems</h3>
              <p className="text-gray-300 font-medium mb-6">Complete equipment and precision tracking.</p>
              <h4 className="text-sm font-normal text-gray-400 mb-6">From ₹14,999/mo.</h4>
              <Link to="/products" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-[15px] font-normal hover:bg-[#0077ED] transition-colors mb-8">
                 Buy
              </Link>
            </div>

            {/* Medical Camps Product Card */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[320px] flex flex-col items-center text-center">
              <img src={camp} alt="Medical Camps" className="w-56 h-auto mb-8 rounded-xl shadow-md border border-white/10" />
              <div className="flex gap-2 mb-4">
                 <div className="w-4 h-4 bg-rose-500 rounded-full"></div>
                 <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-semibold mb-2 text-white">Medical Camps</h3>
              <p className="text-gray-300 font-medium mb-6">Visualize health insights and patient flows.</p>
              <h4 className="text-sm font-normal text-gray-400 mb-6">From ₹7,999/mo.</h4>
              <Link to="/products" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-[15px] font-normal hover:bg-[#0077ED] transition-colors mb-8">
                 Buy
              </Link>
            </div>

            {/* Work space Product Card */}
            <div className="snap-center shrink-0 w-[85vw] md:w-[320px] flex flex-col items-center text-center">
              <img src={imgHero} alt="Work space" className="w-56 h-auto mb-8 rounded-xl shadow-md border border-white/10" />
              <div className="flex gap-2 mb-4">
                 <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                 <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-semibold mb-2 text-white">Work space</h3>
              <p className="text-gray-300 font-medium mb-6">Digital environments for distributed teams.</p>
              <h4 className="text-sm font-normal text-gray-400 mb-6">From ₹2,499/mo.</h4>
              <Link to="/products" className="bg-[#0071e3] text-white px-5 py-2 rounded-full text-[15px] font-normal hover:bg-[#0077ED] transition-colors mb-8">
                 Buy
              </Link>
            </div>

          </div>
        </section>

        {/* Problem/Pain/Shift Bento Grid */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[350px]">
            
            {/* 2. PROBLEM - Large Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
            >
              <div className="relative z-10">
                <AlertCircle className="w-8 h-8 text-violet-500 mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 drop-shadow-lg uppercase">
                  PROBLEM
                </h2>
                <h4 className="text-2xl font-semibold text-white mb-6">Great Tools. Broken Systems.</h4>
                <ul className="text-gray-400 font-light space-y-3">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 1 CRM in one place</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 2 HR in another</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 3 Marketing tools scattered</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 4 Data everywhere</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 5 Multiple tools. Multiple logins. No connection.</li>
                </ul>
              </div>
              <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] group-hover:bg-violet-500/20 transition-all duration-700"></div>
            </motion.div>

            {/* 3. PAIN - Standard Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
            >
               <div className="relative z-10">
                <XCircle className="w-8 h-8 text-fuchsia-500 mb-6" />
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400 drop-shadow-lg uppercase">
                  PAIN
                </h2>
                <h4 className="text-xl md:text-2xl font-semibold text-white mb-6">This Is What It Creates</h4>
                <ul className="text-gray-400 font-light space-y-3">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span> 1 Disconnected data</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span> 2 No visibility</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span> 3 Teams in silos</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span> 4 Time lost switching systems</li>
                  <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2 shrink-0"></span> <span>5 Your tools are strong. Your system is not</span></li>
                </ul>
              </div>
              <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[80px] group-hover:bg-fuchsia-500/20 transition-all duration-700"></div>
            </motion.div>

            {/* 4. SHIFT - Full Width Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-3 bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-center items-center text-center border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
            >
               <div className="relative z-10 flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-blue-500 mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-lg uppercase">
                  SHIFT
                </h2>
                <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4">You Don’t Need More Software</h4>
                <p className="text-lg md:text-xl text-blue-400 font-light max-w-2xl">
                  You need a system that connects what you already use.
                </p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
            </motion.div>
          </div>
        </section>

        {/* Solution Section (from About page) */}
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
                "We don’t replace tools. We connect them."
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

        <HowItWorks />

        {/* 11. VISION Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111113]/80 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
          >
            {/* Global connection aesthetic map effect */}
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

        {/* FUTURE Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 drop-shadow-lg p-2 uppercase">
               Future
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
               From Systems to Intelligence
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Decorative background for the section */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-rose-600/10 blur-[100px] pointer-events-none z-0"></div>

             {[
               { id: "", title: "AI-driven insights", icon: Sparkles, desc: "Turn raw data into actionable intelligence instantly.", color: "from-pink-500 to-rose-500", glow: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] border-pink-500/20" },
               { id: "", title: "Automated workflows", icon: Cpu, desc: "Self-optimizing systems that run your business on autopilot.", color: "from-purple-500 to-fuchsia-500", glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] border-purple-500/20" },
               { id: "", title: "Predictive decisions", icon: Radar, desc: "Anticipate market trends and operations before they happen.", color: "from-rose-500 to-orange-500", glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.3)] border-rose-500/20" }
             ].map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.15, duration: 0.6 }}
                 className={`relative z-10 bg-[#111113] border ${item.glow} rounded-[2rem] p-10 flex flex-col items-center text-center overflow-hidden group transition-all duration-500 hover:-translate-y-2`}
               >
                 {/* Top animated glowing border */}
                 <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                 
                 {/* Icon container */}
                 <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${item.color} p-[2px] mb-8 relative`}>
                    <div className="absolute inset-[2px] bg-black rounded-full"></div>
                    <item.icon className={`relative z-10 w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
                 </div>
                 
                 <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                 <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                 
                 {/* Large faint number in background */}
                 <div className="absolute -bottom-6 -right-6 text-[8rem] font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors duration-500">
                    {item.id}
                 </div>
               </motion.div>
             ))}
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
            {/* Background glowing orb */}
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
            
            {/* Subtle decorative grid background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </motion.div>
        </section>

        {/* 7. Use Cases */}
        <section className="px-6 max-w-[1200px] mx-auto mt-20 mb-10 bg-white/5 backdrop-blur-xl py-20 rounded-[3rem] shadow-sm border border-white/10">
          <div className="text-center mb-16 px-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white drop-shadow-lg p-2 uppercase">
               Use Cases
            </h2>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white mb-4">
               Built for Growing Businesses.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-10">
             
             {/* Healthcare */}
             <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                   <HeartPulse className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Healthcare</h4>
                <p className="text-gray-400 text-[15px] leading-relaxed">Empower clinics and modern hospitals with integrated lab systems and HR.</p>
             </div>
             
             {/* MSMEs */}
             <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                   <Zap className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">MSMEs</h4>
                <p className="text-gray-400 text-[15px] leading-relaxed">Scale aggressively with automated workflows out of the box.</p>
             </div>
             
             {/* Service Businesses */}
             <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                   <Users className="w-7 h-7 text-orange-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Service Businesses</h4>
                <p className="text-gray-400 text-[15px] leading-relaxed">Manage your workforce, scheduling, and coworking seamlessly.</p>
             </div>
             
             {/* Enterprises */}
             <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                   <Building2 className="w-7 h-7 text-purple-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Enterprises</h4>
                <p className="text-gray-400 text-[15px] leading-relaxed">Connect multiple subsidiaries and systems into one core architecture.</p>
             </div>
             
          </div>
        </section>

      </main>
      </div>
    </div>
  );
};

export default Home;
