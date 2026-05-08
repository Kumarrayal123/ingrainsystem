import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const About = () => {
  const features = [
    "One User ID & Password.",
    "Access multiple tools in one platform.",
    "Integrated data across systems.",
    "One dashboard, complete visibility.",
    "We don't replace tools. We connect them."
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-black">
         {/* Floating glowing orbs simulating spatial computing space */}
         <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
         <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <main className="relative z-10">
        {/* Section 1: Vision Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 uppercase">
              Vision
            </h1>
          </motion.div>
        </section>

        {/* Section 2: Built in India */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
              Built in India.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Designed to Connect the World.</span>
            </h2>
          </motion.div>
        </section>

        {/* Section 3: Connect Tools */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white mb-8">
              We connect the best tools<br/>into one platform.
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </motion.div>
        </section>

        {/* Section 4: Unified Ecosystem */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-gray-300 leading-tight">
              We create a unified ecosystem<br/>
              <span className="text-white">where businesses operate as one system.</span>
            </h2>
          </motion.div>
        </section>

        {/* Section 5: Solution features */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32 relative">
          <div className="max-w-6xl mx-auto w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-center mb-16 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg uppercase"
            >
              solution
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
              <div className="px-10 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform cursor-pointer text-lg shadow-xl">
                Enter the Ecosystem
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
