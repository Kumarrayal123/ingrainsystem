import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-40 bg-black relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <div className="w-20 h-20 mx-auto mb-8 bg-[#111113] rounded-3xl flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-lg">
                IG
             </div>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            Ready?
          </h2>
          <p className="text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
            Join thousands of modern companies managing their operations seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => navigate('/contact')} className="w-full sm:w-auto bg-white text-black text-lg font-semibold px-12 py-4 rounded-full hover:scale-105 transition-all duration-300">
              Buy Now
            </button>
            <a href="#" className="text-xl font-medium text-blue-500 hover:text-blue-400 hover:underline underline-offset-4 transition-all">
              Learn more about Enterprise ›
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
