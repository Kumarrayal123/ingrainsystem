const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black font-bold text-[10px]">
                IG
              </div>
              <span className="font-semibold tracking-tight text-white">
                Ingrain System
              </span>
            </div>
            <p className="text-gray-500 text-xs font-light leading-relaxed max-w-sm">
              Crafting premium solutions for the modern workforce. Elegance, performance, and power, combined for your success.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-xs mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {['HRMS', 'Recruitment', 'BMI Tracker', 'Coworking Management', 'Lab Applications'].map((item) => (
                <li key={item}><a href="#" className="text-gray-500 text-xs hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-xs mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                <li key={item}><a href="#" className="text-gray-500 text-xs hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-xs mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                <li key={item}><a href="#" className="text-gray-500 text-xs hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Ingrain System Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs">LinkedIn</a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
