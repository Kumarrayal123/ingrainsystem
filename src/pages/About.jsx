import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeatureItem = ({ feature, idx, scrollYProgress }) => {
  const itemStart = 0.70 + (idx * 0.04);
  const itemY = useTransform(scrollYProgress, [itemStart, itemStart + 0.05], [50, 0]);
  const itemOp = useTransform(scrollYProgress, [itemStart, itemStart + 0.05], [0, 1]);

  return (
    <motion.div 
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl flex items-center gap-4 md:gap-6 ${idx === 4 ? 'md:col-span-2 justify-center text-center' : ''}`}
      style={{ y: itemY, opacity: itemOp }}
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
  
  // Create a massive scrolling container for deep storytelling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: The Vision Scaling Effect (0 - 0.25)
  const visionScale = useTransform(scrollYProgress, [0, 0.15], [1, 20]);
  const visionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);

  // Section 2: "Built in India..." (0.15 - 0.35)
  const introOp = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.15, 0.35], [50, -50]);

  // Section 3: "We connect the best tools..." (0.35 - 0.5)
  const connectOp = useTransform(scrollYProgress, [0.35, 0.4, 0.45, 0.5], [0, 1, 1, 0]);
  const connectY = useTransform(scrollYProgress, [0.35, 0.5], [50, -50]);

  // Section 4: "We create a unified ecosystem..." (0.5 - 0.65)
  const ecoOp = useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]);
  const ecoY = useTransform(scrollYProgress, [0.5, 0.65], [50, -50]);

  // Section 5: The Glassmorphic Feature Reveal (0.65 - 1.0)
  const systemIntroOp = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);
  const systemIntroY = useTransform(scrollYProgress, [0.65, 0.7], [100, 0]);

  const features = [
    "One User ID & Password.",
    "Access multiple tools in one platform.",
    "Integrated data across systems.",
    "One dashboard, complete visibility.",
    "We don’t replace tools. We connect them."
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans relative">
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
         {/* Floating glowing orbs simulating spatial computing space */}
         <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
         <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div ref={containerRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">

          {/* Section 1: Massive Vison Scale */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ scale: visionScale, opacity: visionOpacity }}
          >
            <h1 className="text-[6rem] md:text-[14rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">
              VISION
            </h1>
          </motion.div>

          {/* Section 2: Built in India */}
          <motion.div 
            className="absolute inset-0 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ opacity: introOp, y: introY }}
          >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
              Built in India.<br/>
              <span className="text-gray-400">Designed to Connect the World.</span>
            </h2>
          </motion.div>

          {/* Section 3: Connect Tools */}
          <motion.div 
            className="absolute inset-0 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ opacity: connectOp, y: connectY }}
          >
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white mb-6">
              We connect the best tools<br/>into one platform.
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </motion.div>

          {/* Section 4: Unified Ecosystem */}
          <motion.div 
            className="absolute inset-0 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ opacity: ecoOp, y: ecoY }}
          >
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-gray-300 leading-tight">
              We create a unified ecosystem<br/>
              <span className="text-white">where businesses operate as one system.</span>
            </h2>
          </motion.div>

          {/* Section 5: The Core Systems List (Spatial Computing Vibe) */}
          <motion.div 
            className="absolute inset-x-0 bottom-0 top-0 pt-[12vh] md:pt-[20vh] px-4 md:px-6 max-w-6xl mx-auto flex flex-col items-center"
            style={{ opacity: systemIntroOp, y: systemIntroY }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-lg p-2 uppercase">
              solution
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
              {features.map((feature, idx) => (
                 <FeatureItem key={idx} feature={feature} idx={idx} scrollYProgress={scrollYProgress} />
              ))}
            </div>
            
            <motion.div 
              className="mt-20 flex justify-center w-full"
              style={{
                opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1])
              }}
            >
              <div className="px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform cursor-pointer">
                Enter the Ecosystem
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
