import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Buy from './pages/Buy';
import Price from './pages/Price';
import Careers from './pages/Careers';
import Howitworks from './pages/Howitworks';
import Recruitment from './pages/Recruitment';
import Attendance from './pages/Attendance';
import Dashboard from './pages/Dashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiePolicy from './pages/CookiePolicy';
import TaskMangement from './pages/TaskMangement';
import Camp from './pages/Camp';
import WorkSpace from './pages/WorkSpace';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import OpMangement from './pages/OpMangement';

// Global Chatbot Component - Only opens on button click
const GlobalChatbot = () => {
  // Initialize as closed (false) - no auto-open on refresh
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Chatbot Window - Only visible when open */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-[360px] h-[480px] md:w-[400px] md:h-[540px] bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10 chatbot-window">
          
          {/* Close Button - Top Right */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-20 text-white/60 hover:text-white transition-colors bg-black/50 hover:bg-black/70 rounded-full p-1.5"
            aria-label="Close Chatbot"
          >
            <X className="w-4 h-4" />
          </button>
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-white/60 text-sm">Loading Assistant...</span>
              </div>
            </div>
          )}
          
          {/* Iframe - Full size */}
          <div className="w-full h-full bg-black">
            <iframe
              src="https://chatbot.iryax.com/"
              className="w-full h-full border-0 chatbot-iframe"
              title="Chatbot"
              allow="microphone; camera; geolocation"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              style={{ 
                minHeight: '100%', 
                width: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}

      {/* Toggle Button - Only visible when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:scale-110 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center group chatbot-toggle"
          aria-label="Open Chatbot"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalChatbot />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/my-dashboard" element={<ClientDashboard />} />
      
        <Route path="/*" element={
          <div className="min-h-screen flex flex-col font-sans">
            <Navigation />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/how-it-works" element={<Howitworks />} />
                <Route path="/price" element={<Price />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/task-management" element={<TaskMangement />} />
                <Route path="/camp" element={<Camp />} />
                <Route path="/workspace" element={<WorkSpace />} />
                <Route path="/op-management" element={<OpMangement />} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;