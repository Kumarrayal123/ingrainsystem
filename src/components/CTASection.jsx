import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../img/ig-logo.png';

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
          <div className="w-20 h-20 mx-auto mb-8  rounded-3xl flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] p-4">
             <img src={logo} alt="Ingrain Systems Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            {/* Ready? */}
            Are you ready.? 

          </h2>
          <p className="text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
            {/* Join thousands of modern companies managing their operations seamlessly. */}
            Join Today. And Manage Your Company Operations Seamlessly.. with Iryax..!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => navigate('/contact')} className="w-full sm:w-auto bg-white text-black text-lg font-semibold px-12 py-4 rounded-full hover:scale-105 transition-all duration-300">
              Buy Now
            </button>
            <a href="#" className="text-xl font-medium text-blue-500 hover:text-blue-400 hover:underline underline-offset-4 transition-all">
              Learn More ›
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
