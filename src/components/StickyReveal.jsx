import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeatureItem = ({ item, index, totalItems, scrollYProgress }) => {
  const step = 0.5 / (totalItems || 1);
  const start = 0.4 + (index * step);
  const peak = start + (step * 0.3);
  const end = start + step;

  const opacity = useTransform(
    scrollYProgress,
    [start - (step * 0.2), start, peak, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start - (step * 0.2), end],
    [50, -50]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center text-center px-4"
      style={{ opacity, y }}
    >
      <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white drop-shadow-2xl tracking-tight leading-tight">
        {item}
      </h3>
    </motion.div>
  );
};

const StickyReveal = ({ title, subtitle, items, image }) => {
  const containerRef = useRef(null);
  
  // Height is massive so we have plenty of time to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phases of the scroll:
  // 0.0 - 0.2: Title comes in and fades out/scales up completely.
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 4]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);

  // 0.15 - 0.3: Image reveals.
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.15, 0.3], [1.1, 1]);
  // Fade image slightly when text overlay starts
  const imageOverlayOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0.4]);

  // Feature text items are now rendered using the FeatureItem component
  // to ensure React hooks (useTransform) are called correctly.

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Massive Intro Title */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6"
          style={{ scale: titleScale, opacity: titleOpacity }}
        >
          <h2 className="text-5xl md:text-8xl font-bold text-center tracking-tight text-white mb-4">
            {title}
          </h2>
          <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide">
            {subtitle}
          </p>
        </motion.div>

        {/* The Product Image pinned in the background */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 px-6 md:px-12 object-cover"
          style={{ opacity: imageOverlayOpacity }}
        >
           <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="w-full max-w-6xl relative">
              <div className="absolute inset-0 bg-black/20 z-10 rounded-2xl"></div>
              {image ? (
                <img src={image} className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10" alt={title} />
              ) : (
                <div className="w-full aspect-video bg-zinc-900 rounded-2xl border border-zinc-800"></div>
              )}
           </motion.div>
        </motion.div>

        {/* Rolling Text overlay indicating features */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none px-6">
          <div className="max-w-4xl mx-auto w-full relative h-[200px]">
            {items && items.map((item, index) => (
              <FeatureItem 
                key={index}
                item={item}
                index={index}
                totalItems={items.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StickyReveal;
