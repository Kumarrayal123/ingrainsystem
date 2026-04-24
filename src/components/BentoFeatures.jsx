import { motion } from 'framer-motion';
import { Layers, Rocket, Code2, Briefcase, Database } from 'lucide-react';

const BentoFeatures = () => {
  return (
    <section className="py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4 block"
          >
            Platform & Marketplace
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6"
          >
            A Platform That <br/>Brings Tools Together.
          </motion.h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[300px]">
          
          {/* 1. Best tools */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
            <div className="relative z-10">
              <Layers className="w-8 h-8 text-white mb-4" />
              <h3 className="text-3xl font-semibold text-white mb-2">Best tools in the market on one platform.</h3>
              <p className="text-gray-400 font-light max-w-md">Access industry-leading applications seamlessly unified under a single interface.</p>
            </div>
            <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-all duration-700"></div>
          </motion.div>

          {/* 2. Integrate and grow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
             <div className="relative z-10">
              <Rocket className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Integrate and grow.</h3>
              <p className="text-gray-400 font-light">Tool providers can tap into our ecosystem and instantly reach new businesses.</p>
            </div>
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          </motion.div>

          {/* 3. Developers */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
             <div className="relative z-10">
              <Code2 className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Build and launch apps.</h3>
              <p className="text-gray-400 font-light">Developers can use robust APIs to create custom solutions on the marketplace.</p>
            </div>
            <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-rose-600/10 rounded-full blur-[80px] group-hover:bg-rose-500/20 transition-all duration-700"></div>
          </motion.div>

          {/* 4. Businesses operate */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
             <div className="relative z-10">
              <Briefcase className="w-8 h-8 text-white mb-4" />
              <h3 className="text-3xl font-semibold text-white mb-2">Businesses operate everything in one place.</h3>
              <p className="text-gray-400 font-light max-w-md">Centralize operations. Manage HR, CRM, and analytics from one command center.</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] group-hover:bg-purple-500/20 transition-all duration-700"></div>
          </motion.div>

          {/* 5. Infrastructure layer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-3 bg-[#111113] rounded-[2rem] p-10 flex flex-col justify-center items-center text-center border border-white/5 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
             <div className="relative z-10 flex flex-col items-center">
              <Database className="w-10 h-10 text-white mb-6" />
              <h3 className="text-4xl md:text-5xl font-semibold text-white mb-4">Infrastructure layer for business tools.</h3>
              <p className="text-gray-400 font-light text-xl max-w-2xl">We provide the secure, scalable backbone that allows disparate tools to share data effortlessly.</p>
            </div>
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-all duration-700"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
