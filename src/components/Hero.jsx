import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = ({ 
  heroImage,
  title,
  subtitle,
  description,
  cta
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Massive text scrolling effects
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Image emerging effects
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.3, 0.8], [0.8, 1]);
  const imageY = useTransform(scrollYProgress, [0.3, 1], ["20%", "0%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Massive Text that scales into the camera */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center items-center z-20 pointer-events-none"
          style={{ scale, opacity }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-bold tracking-tighter leading-none text-center"
          >
            {title ? title : (
              <>
                <span className="text-white">Pro.</span><br />
                <span className="text-gradient">Beyond.</span>
              </>
            )}
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="text-xl md:text-3xl text-gray-400 mt-6 font-light tracking-wide max-w-4xl text-center px-6"
          >
             {subtitle ? subtitle : "The all-in-one platform for modern enterprises."}
          </motion.p>
          {description && (
             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.7 }}
               className="text-lg md:text-xl text-gray-500 mt-4 font-light tracking-wide max-w-3xl text-center px-6"
             >
                {description}
             </motion.p>
          )}
          {cta && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, delay: 0.9 }}
               className="mt-8"
             >
               {cta}
             </motion.div>
          )}
        </motion.div>

        {/* The Image that fades in from the dark */}
        <motion.div
          style={{ opacity: imageOpacity, scale: imageScale, y: imageY }}
          className="absolute inset-x-0 bottom-0 top-[20%] md:top-[30%] mx-auto max-w-6xl px-6 flex justify-center items-end"
        >
          <div className="relative w-full rounded-t-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 bottom-0 h-1/3"></div>
            {heroImage ? (
              <img src={heroImage} alt="Dashboard Interface" className="w-full h-auto object-cover rounded-t-3xl" />
            ) : (
              <div className="w-full aspect-video bg-zinc-900 rounded-t-3xl flex items-center justify-center border border-zinc-800">
                 <span className="text-zinc-700">Hero Image</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
