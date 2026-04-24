import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LogIn, LayoutGrid, Network, Eye } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Login Once",
    description: "Secure, unified authentication across the entire ecosystem.",
    icon: LogIn,
    color: "from-blue-500 to-cyan-400",
    glowColor: "bg-blue-500/20"
  },
  {
    id: 2,
    title: "Access Everything",
    description: "All your tools and modules available in a single, intuitive dashboard.",
    icon: LayoutGrid,
    color: "from-purple-500 to-fuchsia-400",
    glowColor: "bg-purple-500/20"
  },
  {
    id: 3,
    title: "Data Connects Automatically",
    description: "Information flows instantly between HR, CRM, and operational systems.",
    icon: Network,
    color: "from-emerald-500 to-teal-400",
    glowColor: "bg-emerald-500/20"
  },
  {
    id: 4,
    title: "See Everything Clearly",
    description: "Get a comprehensive, real-time view of your entire business operations.",
    icon: Eye,
    color: "from-orange-500 to-amber-400",
    glowColor: "bg-orange-500/20"
  }
];

const HowItWorks = () => {
  const containerRef = useRef(null);
  
  // Create a scroll-linked animation for the connecting line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative py-20">
      
      {/* Header */}
      <div className="text-center mb-24 px-10 relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-lg p-2 uppercase">
           How It Works
        </h2>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white mb-6">
          Simple by Design. <span className="text-gray-400">Powerful by System.</span>
        </h2>
      </div>

      {/* Connected Flow Layout */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* The Animated Vertical Connecting Line (Background track) */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 md:-translate-x-1/2 rounded-full hidden sm:block"></div>
        
        {/* The Animated Vertical Connecting Line (Active glowing track) */}
        <motion.div 
          className="absolute left-[39px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 md:-translate-x-1/2 rounded-full hidden sm:block shadow-[0_0_15px_rgba(139,92,246,0.5)] z-0"
          style={{ height: lineHeight }}
        ></motion.div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-24 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-16 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className={`w-full sm:w-[calc(100%-80px)] md:w-1/2 flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                  <div className="bg-[#111113]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] hover:border-white/20 transition-all duration-500 group relative overflow-hidden w-full">
                    {/* Hover Glow */}
                    <div className={`absolute -inset-20 ${step.glowColor} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.color} opacity-50`}>
                          0{step.id}
                        </span>
                        <h4 className="text-2xl font-semibold text-white tracking-tight">{step.title}</h4>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden sm:flex relative w-20 h-20 shrink-0 items-center justify-center">
                   {/* Background pulse effect */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                    viewport={{ once: false }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-0 rounded-full ${step.glowColor}`}
                  ></motion.div>
                  
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center z-10 shadow-xl relative group-hover:border-white/50 transition-colors">
                     <Icon className={`w-7 h-7 text-white`} />
                  </div>
                </div>

                {/* Empty Side (for alternating layout on desktop) */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
