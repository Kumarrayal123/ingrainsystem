import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { AlertCircle, XCircle, CheckCircle2, ChevronRight } from 'lucide-react';


const FeatureItem = ({ feature, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl flex items-center gap-4 md:gap-6 ${idx === 4 ? 'md:col-span-2 justify-center text-center' : ''}`}
    >
      {idx !== 4 && <span className="text-3xl md:text-5xl font-black text-white/20">{idx + 1}</span>}
      <h3 className={`text-base md:text-3xl font-medium text-white tracking-tight ${idx === 4 ? 'text-xl md:text-4xl' : ''}`}>
        {feature}
      </h3>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const features = [
    "One User ID & Password.",
    "Access multiple tools in one platform.",
    "Integrated data across systems.",
    "One dashboard, complete visibility.",
    "We don’t replace tools. We connect them."
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-[52px] relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        {/* Floating glowing orbs simulating spatial computing space */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        {/* Section 1: Vision Hero */}

        <section className="snap-start min-h-[calc(100vh-60px)] w-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Vision
            </h1> */}

             <h1 className="text-[2.2rem] md:text-[3.8rem] lg:text-[4.8rem] font-bold tracking-tight leading-[1.1] text-white mb-6">
                Built in India. .<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Designed  Connect  World..</span>
              </h1>


            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-8 text-center">
              {/* Built in India.<br />Designed to Connect the World.<br /> */}
              We connect the best tools into one platform.<br />
              We create a unified ecosystem where businesses operate as one system.
            </p>
            <Link to="/about" className="mt-4 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
              Learn More
            </Link>
          </motion.div>
        </section>



        {/* Problem, Pain & Shift Section */}
        <section className="px-6 max-w-[1200px] mx-auto mb-6 md:mb-8 z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-10 md:pt-16 pb-0 px-4 md:px-8 text-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-lg uppercase">
                Problem, Pain & Shift
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* PROBLEM card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.1 }}
                  className="w-full min-h-[500px] bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                  <div className="relative z-10">
                    <AlertCircle className="w-14 h-14 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 uppercase">PROBLEM</h2>
                    <h4 className="text-xl font-semibold text-white mb-6">Great Tools. Broken Systems.</h4>
                    <ul className="text-gray-300 font-light space-y-4 text-base">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> CRM in one place</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> HR in another</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Marketing tools scattered</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Data everywhere</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Multiple logins. No connection.</li>
                    </ul>
                  </div>
                </motion.div>
                {/* PAIN card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.2 }}
                  className="w-full min-h-[500px] bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 relative overflow-hidden group hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
                  <div className="relative z-10">
                    <XCircle className="w-14 h-14 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase">PAIN</h2>
                    <h4 className="text-xl font-semibold text-white mb-6">This Is What It Creates</h4>
                    <ul className="text-gray-300 font-light space-y-4 text-base">
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> Disconnected data</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> No visibility</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> Teams in silos</li>
                      <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> Time lost switching systems</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" /><span>Your tools are strong. Your system is not</span></li>
                    </ul>
                  </div>
                </motion.div>
              
              {/* SHIFT card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.3 }}
                className="w-full md:col-span-2 bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center border border-white/10 relative overflow-hidden group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500"
                style={{ minHeight: '300px' }}
              >
                <CheckCircle2 className="w-20 h-20 text-indigo-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.2} />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 uppercase">SHIFT</h2>
                <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4">You Don't Need More Software</h4>
                <p className="text-lg md:text-xl text-indigo-300 font-light leading-relaxed max-w-2xl">You need a system that connects what you already use.</p>
              </motion.div>
              </div></div>
          </motion.div>
        </section>
        {/* Section 5: The Core Systems List */}
        <section className="px-6 pt-4 md:pt-6 pb-10 md:pb-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg p-2 uppercase">
              solution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
              {features.map((feature, idx) => (
                <FeatureItem key={idx} feature={feature} idx={idx} />
              ))}
            </div>
          </motion.div>
        </section>

            {/* FINAL CTA Section */}
           <section className="px-6 max-w-[1200px] mx-auto mb-12 md:mb-20 z-20 relative">
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
                  <Link to="/price" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                    Get Started
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </motion.div>
          </section> 

        <Footer />
      </div>
    </div>
  );
};

export default About;
