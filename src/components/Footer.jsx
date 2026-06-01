import { Link } from 'react-router-dom'; import { Instagram, Linkedin, Twitter } from 'lucide-react';
import logo from '../img/Asset 18@300x.png';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group w-max">
              <img src={logo} alt="Iryax Global Logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
              {/* <span className="font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Iryax Global
              </span> */}
            </Link>
            <p className="text-gray-500 text-xs font-light leading-relaxed max-w-sm">
              {/* Crafting premium solutions for the modern workforce. Elegance, performance, and power, combined for your success. */}
              {/* Connect Your Business.Not Just Your Tools. One platform. One login. One Dashboard.Access and connect the best tools in the market — all working together as one System. */}
              Connect Your Business — Not Just Your Tools.<br />

One Platform. One Login. One Dashboard.<br/>

            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-xs mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {/* <li><Link to="/products" className="text-gray-500 text-xs hover:text-white transition-colors">All Products</Link></li> */}
              <li><Link to="/recruitment" className="text-gray-500 text-xs hover:text-white transition-colors">Recruitment</Link></li>
              <li><Link to="/attendance" className="text-gray-500 text-xs hover:text-white transition-colors">Attendance & Payroll</Link></li>
              <li><Link to="/products" className="text-gray-500 text-xs hover:text-white transition-colors">Medical Camps</Link></li>
              <li><Link to="/products" className="text-gray-500 text-xs hover:text-white transition-colors">Coworking Space</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-xs mb-4 uppercase tracking-wider">Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-500 text-xs hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-500 text-xs hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/price" className="text-gray-500 text-xs hover:text-white transition-colors">Pricing</Link></li>
              {/* <li><Link to="/careers" className="text-gray-500 text-xs hover:text-white transition-colors">Careers</Link></li> */}
              <li><Link to="/contact" className="text-gray-500 text-xs hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-xs mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-gray-500 text-xs hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-gray-500 text-xs hover:text-white transition-colors">Terms And Conditions</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-500 text-xs hover:text-white transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/careers" className="text-gray-500 text-xs hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Iryax Global. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
