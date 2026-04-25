import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Route theme logic
  const isLightModeRoute = false;

  const textColor = isLightModeRoute ? 'text-black' : 'text-white';
  const logoBg = isLightModeRoute ? 'bg-black text-white' : 'bg-white text-black';
  const navItemHover = isLightModeRoute ? 'hover:text-black hover:bg-gray-100' : 'hover:text-white';
  const navItemText = isLightModeRoute ? 'text-gray-600' : 'text-gray-400';
  
  const scrolledBg = isLightModeRoute 
    ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200 py-3' 
    : 'bg-black/70 backdrop-blur-xl border-b border-white/10 py-3';
    
  const unscrolledBg = 'bg-transparent py-5';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'How It Works', path: '/how-it-works' },
    { title: 'Pricing', path: '/price' },
    { title: 'About', path: '/about' },
    { title: 'Book Demo', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? scrolledBg : unscrolledBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer z-50">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${logoBg} transition-colors`}>
              IG
            </div>
            <span className={`font-semibold tracking-tight text-lg ${textColor} transition-colors uppercase`}>
              Ingrain System
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-4 text-xs font-semibold tracking-wider uppercase`}>
            {navLinks.slice(0, 5).map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-3 py-2 rounded-md ${location.pathname === link.path ? textColor : navItemText} ${navItemHover} transition-colors`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/contact" 
              className={`hidden md:block text-xs font-semibold tracking-wider uppercase ${location.pathname === '/contact' ? textColor : navItemText} ${navItemHover} px-3 py-2 rounded-md transition-colors`}
            >
              Book Demo 
            </Link>
            <Link 
              to="/contact"
              className={`${logoBg} text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:scale-105 transition-transform active:scale-95 duration-200 hidden md:block`}
            >
              Buy
            </Link>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 -mr-2 ${textColor} z-50 transition-colors`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black pt-24 px-8 md:hidden"
          >
            {/* Background Orbs to match site aesthetic */}
            <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-4xl font-bold tracking-tight ${location.pathname === link.path ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors`}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="w-full bg-white text-black py-4 rounded-xl flex items-center justify-center font-bold text-lg tracking-wide active:scale-95 transition-transform"
                >
                  Buy Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

