import { motion } from 'framer-motion';
import { Settings, Zap, Shield, Heart, BarChart3, Users } from 'lucide-react';

const features = [
  { icon: <Settings className="w-6 h-6" />, title: "Seamless Integration", desc: "Connects beautifully with your existing tools." },
  { icon: <Zap className="w-6 h-6" />, title: "Superfast Performance", desc: "Built for speed, optimizing every interaction." },
  { icon: <Shield className="w-6 h-6" />, title: "Enterprise Grade Security", desc: "Your data is protected with industry-leading encryption." },
  { icon: <Heart className="w-6 h-6" />, title: "Intuitive Design", desc: "Zero learning curve. Designed around human behavior." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Real-time Analytics", desc: "Make proactive decisions with live, actionable data." },
  { icon: <Users className="w-6 h-6" />, title: "Collaborative Workspaces", desc: "Bring your teams together in dedicated environments." }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.6 }
  }
};

const Features = () => {
  return (
    <section className="py-32 bg-appleGray">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-appleDark mb-4">
            Everything you need. <br/>Nothing you don't.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Each feature is meticulously crafted to empower your team without overwhelming them.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-appleDark mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-appleDark mb-2">{item.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
