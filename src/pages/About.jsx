import { motion } from 'framer-motion';
import Footer from '../components/Footer';

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
  const features = [
    "One User ID & Password.",
    "Access multiple tools in one platform.",
    "Integrated data across systems.",
    "One dashboard, complete visibility.",
    "We don’t replace tools. We connect them."
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        {/* Floating glowing orbs simulating spatial computing space */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 pt-[52px]">
        {/* Section 1: Vision Hero */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-[4rem] md:text-[7rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
              VISION
            </h1>
          </motion.div>
        </section>

        {/* Section 2: Built in India */}
        <section className="min-h-[40vh] flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
              Built in India.<br />
              <span className="text-gray-400">Designed to Connect the World.</span>
            </h2>
          </motion.div>
        </section>

        {/* Section 3: Connect Tools */}
        <section className="min-h-[40vh] flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto text-center flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white mb-6">
              We connect the best tools<br />into one platform.
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </motion.div>
        </section>

        {/* Section 4: Unified Ecosystem */}
        <section className="min-h-[40vh] flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-gray-300 leading-tight">
              We create a unified ecosystem<br />
              <span className="text-white">where businesses operate as one system.</span>
            </h2>
          </motion.div>
        </section>

        {/* Section 5: The Core Systems List */}
        <section className="min-h-screen px-6 py-20 max-w-6xl mx-auto">
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

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-20 flex justify-center w-full"
            >
              <div className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform cursor-pointer text-lg shadow-lg">
                Enter the Ecosystem
              </div>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
