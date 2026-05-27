import { motion } from 'framer-motion';

const Hero = ({ 
  heroImage,
  title,
  subtitle,
  description,
  cta,
  isCentered = false,
  minHeight = "min-h-[80vh]"
}) => {
  return (
    <section className={`relative ${minHeight} flex flex-col items-center ${isCentered ? 'justify-center py-20' : 'justify-end pb-32 pt-40'} bg-black overflow-hidden px-6`}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col justify-center items-center max-w-6xl w-full">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-bold tracking-tight leading-[1.1] text-center"
        >
          {title ? title : (
            <>
              <span className="text-white">Pro.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Beyond.</span>
            </>
          )}
        </motion.h1>
        
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-lg md:text-2xl text-gray-400 mt-6 font-light tracking-wide max-w-3xl text-center"
        >
           {subtitle ? subtitle : "The all-in-one platform for modern enterprises."}
        </motion.p>
        
        {description && (
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-base md:text-lg text-gray-500 mt-4 font-light tracking-wide max-w-2xl text-center"
           >
              {description}
           </motion.p>
        )}
        
        {cta && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="mt-10"
           >
             {cta}
           </motion.div>
        )}

        {/* Optional Static Image */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 w-full max-w-5xl"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={heroImage} alt="Dashboard Interface" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
