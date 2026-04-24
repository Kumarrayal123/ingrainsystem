import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProductSection = ({ title, subtitle, description, items, image, reverse = false, isDark = false }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const contentOrder = reverse ? "md:order-2" : "md:order-1";
  const imageOrder = reverse ? "md:order-1" : "md:order-2";

  return (
    <section 
      ref={containerRef} 
      className={`py-32 overflow-hidden ${isDark ? 'bg-appleDark text-white' : 'bg-white text-appleDark'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: yText }}
            className={`flex flex-col gap-6 ${contentOrder}`}
          >
            <h3 className={`text-sm font-semibold tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-500'} font-light leading-relaxed`}>
              {description}
            </p>
            
            {items && (
              <ul className="mt-4 space-y-4">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-appleDark'}`} />
                    <span className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            
            <div className="mt-6">
              <a href="#" className={`text-lg font-medium inline-flex items-center gap-1 group ${isDark ? 'text-white' : 'text-appleBlue'}`}>
                Learn more 
                <span className="group-hover:translate-x-1 transition-transform">›</span>
              </a>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            style={{ y: yImage }}
            className={`relative rounded-3xl overflow-hidden shadow-2xl ${imageOrder}`}
          >
            {image ? (
               <img src={image} alt={title} className="w-full h-auto object-cover" />
            ) : (
              <div className={`aspect-square md:aspect-[4/3] flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>Product UI Image</span>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProductSection;
