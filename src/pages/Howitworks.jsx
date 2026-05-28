import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import HowItWorksComponent from '../components/HowItWorks';
import Footer from '../components/Footer';

const Howitworks = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10">
        {/* The Core How It Works Component */}
        <div className="pt-20">
          <HowItWorksComponent />
        </div>

        {/* FINAL CTA Section — same as Home page */}
        <section className="px-6 max-w-[1200px] mx-auto my-32 z-20 relative">
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
                <Link to="/price" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Subtle decorative dot grid background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Howitworks;