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
  Cpu,
  Database,
  ArrowUpRight,
  Sparkles,
  Fingerprint,
  GitBranch,
  Layers,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Problem from '../pages/Problem';
import BentoFeatures from '../components/BentoFeatures';

const Home = () => {
  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
        {/* Floating glowing orbs simulating spatial computing space */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        <main className="pb-12 md:pb-20">
          {/* Simple Hero Section — Normal Scroll */}
          <section className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              <h1 className="text-[2.2rem] md:text-[3.8rem] lg:text-[4.8rem] font-bold tracking-tight leading-[1.1] text-white mb-6">
                Connect Your Business.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Not Just Your Tools.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 font-light mb-3">
                One platform. One login. One Dashboard.
              </p>

              <p className="text-sm md:text-base text-gray-500 font-light max-w-lg mx-auto mb-10">
                Access and connect the best tools in the market — all working together as one System.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0">
                <Link to="/contact" className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:scale-105 text-center">
                  Book Demo
                </Link>
                <Link to="/how-it-works" className="w-full sm:w-auto bg-[#1c1c1e] text-white border border-white/10 px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105 text-center">
                  See How It Works
                </Link>
              </div>
            </motion.div>
          </section>

          {/* 4. "Get to know" Feature Carousel - Extra Large Stylish Icons */}
          <section className="px-6 max-w-[1200px] mx-auto mb-12 md:mb-16">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-white mb-10 w-full text-left">
              Why Iryax...?
            </h2>

            <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-10">
              {/* CARD 1 - CRM - Emerald/Teal */}
              <div className="snap-center shrink-0 w-[85vw] md:w-[400px] min-h-[450px] bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div>
                  <h3 className="text-xl text-gray-400 mb-2 relative z-10">Performance workflows</h3>
                  <h4 className="text-4xl font-semibold leading-tight relative z-10">
                    No <br/> Multiple logins
                  </h4>
                </div>
                <div className="flex justify-end relative z-10 mt-2">
                  <Target className="w-32 h-32 text-emerald-400 opacity-90 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(16,185,129,0.5)]" strokeWidth={1} />
                </div>
              </div>

              {/* CARD 2 - Privacy & Security - Cyan/Blue */}
              <div className="snap-center shrink-0 w-[85vw] md:w-[400px] min-h-[450px] bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
                <div>
                  <h3 className="text-xl text-gray-400 mb-2 relative z-10">Privacy & Security</h3>
                  <h4 className="text-4xl font-semibold leading-tight relative z-10">
                    No  <br/> Fragmented data
                  </h4>
                </div>
                <div className="flex justify-end relative z-10 mt-2">
                  <ShieldCheck className="w-32 h-32 text-blue-400 opacity-90 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]" strokeWidth={1} />
                </div>
              </div>

              {/* CARD 3 - Data-Driven Insights - Indigo/Fuchsia */}
              <div className="snap-center shrink-0 w-[85vw] md:w-[400px] min-h-[450px] bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div>
                  <h3 className="text-xl text-gray-400 mb-2 relative z-10">Data-Driven Insights</h3>
                  <h4 className="text-4xl font-semibold leading-tight relative z-10">
                    Better decisions
                  </h4>
                </div>
                <div className="flex justify-end relative z-10 mt-2">
                  <Database className="w-32 h-32 text-indigo-400 opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]" strokeWidth={1} />
                </div>
              </div>

              {/* CARD 4 - Agile Workflows */}
              <div className="snap-center shrink-0 w-[85vw] md:w-[400px] min-h-[450px] bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div>
                  <h3 className="text-xl text-gray-400 mb-2 relative z-10">Agile Workflows</h3>
                  <h4 className="text-4xl font-semibold leading-tight relative z-10">
                    Faster execution
                  </h4>
                </div>
                <div className="flex justify-end relative z-10 mt-2">
                  <Zap className="w-32 h-32 text-indigo-400 opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]" strokeWidth={1} />
                </div>
              </div>

              {/* CARD 5 - Enterprise Foundation */}
              <div className="snap-center shrink-0 w-[85vw] md:w-[400px] min-h-[450px] bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 group hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <div>
                  <h3 className="text-xl text-gray-400 mb-2 relative z-10">Enterprise Foundation</h3>
                  <h4 className="text-4xl font-semibold leading-tight relative z-10">
                    Built for scale
                  </h4>
                </div>
                <div className="flex justify-end relative z-10 mt-2">
                  <GitBranch className="w-32 h-32 text-indigo-400 opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]" strokeWidth={1} />
                </div>
              </div>
            </div>
          </section>

          <BentoFeatures/>

          {/* Use Cases - Modern Effects */}
          <section className="px-6 max-w-[1200px] mx-auto mb-12 md:mb-16 relative">
            <div className="relative py-10 rounded-[3rem] shadow-2xl border border-white/10 backdrop-blur-sm overflow-hidden bg-gradient-to-br from-[#0a1128] via-[#1a0b2e] to-[#0a1128]">
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
                  className="group relative bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-md p-6 rounded-[1.8rem] border border-purple-500/30 flex flex-col items-center text-center hover:border-purple-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/10 group-hover:to-purple-600/5 transition-all duration-500"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/30">
                    <HeartPulse className="w-7 h-7 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Healthcare</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Empower clinics and modern hospitals with integrated lab systems and HR.</p>
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
                  className="group relative bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-md p-6 rounded-[1.8rem] border border-blue-500/30 flex flex-col items-center text-center hover:border-blue-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:to-blue-600/5 transition-all duration-500"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/30">
                    <Zap className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">MSMEs</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Scale aggressively with automated workflows out of the box.</p>
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
                  className="group relative bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md p-6 rounded-[1.8rem] border border-indigo-500/30 flex flex-col items-center text-center hover:border-indigo-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-600/0 group-hover:from-indigo-500/10 group-hover:to-indigo-600/5 transition-all duration-500"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-indigo-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-indigo-500/30">
                    <Users className="w-7 h-7 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Service Businesses</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Manage your workforce, scheduling, and coworking seamlessly.</p>
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
                  className="group relative bg-gradient-to-br from-violet-900/40 to-violet-800/20 backdrop-blur-md p-6 rounded-[1.8rem] border border-violet-500/30 flex flex-col items-center text-center hover:border-violet-400/60 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-600/0 group-hover:from-violet-500/10 group-hover:to-violet-600/5 transition-all duration-500"></div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/30 to-violet-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-violet-500/30">
                    <Building2 className="w-7 h-7 text-violet-300 group-hover:text-violet-200 transition-colors" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Enterprises</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Connect multiple subsidiaries and systems into one core architecture.</p>
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