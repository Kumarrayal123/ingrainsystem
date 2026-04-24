import { motion } from 'framer-motion';
import { Users, Target, Settings, Activity } from 'lucide-react';

const WhyChooseUs = () => {
  const items = [
    { id: "", title: "Employees", icon: Users, color: "from-blue-500 to-cyan-400", shadow: "shadow-[0_0_40px_rgba(59,130,246,0.15)]" },
    { id: "", title: "Leads & customers", icon: Target, color: "from-purple-500 to-fuchsia-400", shadow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]" },
    { id: "", title: "Operations", icon: Settings, color: "from-emerald-500 to-teal-400", shadow: "shadow-[0_0_40px_rgba(16,185,129,0.15)]" },
    { id: "", title: "Performance", icon: Activity, color: "from-orange-500 to-amber-400", shadow: "shadow-[0_0_40px_rgba(249,115,22,0.15)]" }
  ];

  return (
    <section className="py-40 bg-black border-t border-white/5 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Typography */}
        <div className="w-full lg:w-1/2 text-left">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-blue-500 tracking-widest uppercase mb-6"
          >
            Control
          </motion.h3>
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Why do you need..? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Everything That Runs Your Business.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          ></motion.div>
        </div>

        {/* Right Side: Unique Staggered Layout */}
        <div className="w-full lg:w-1/2 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100 
                }}
                className={`relative group bg-[#111113] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center items-center text-center hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:${item.shadow} ${
                  index % 2 === 1 ? "sm:translate-y-12" : "" // Stagger odd items down on desktop
                }`}
              >
                {/* Background Hover Glow */}
                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}></div>
                
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.color} bg-opacity-10 mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}></div>
                  <item.icon className="w-8 h-8 text-white relative z-10" />
                </div>

                <div className="text-[5rem] font-black text-white/5 absolute -bottom-4 -right-2 group-hover:text-white/10 transition-colors duration-500 pointer-events-none">
                  {item.id}
                </div>

                <h4 className="text-2xl font-semibold text-white relative z-10">
                  {item.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
