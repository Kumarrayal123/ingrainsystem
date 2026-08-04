import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
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
import ClientSidebar from './components/ClientSidebar';

// Global Chatbot Component - Sab pages pe show hoga
const GlobalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Chatbot Window - Only visible when open */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[450px] h-[600px] md:w-[520px] md:h-[680px] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-white/10 mb-3">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Iframe - Full size */}
          <div className="w-full h-full pt-12 bg-black">
            <iframe
              src="http://62.72.29.27:8501/"
              className="w-full h-full border-0"
              title="Chatbot"
              allow="microphone; camera; geolocation"
              loading="lazy"
              style={{ minHeight: '100%', width: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:scale-110 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center group"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* Global Chatbot - Sab pages pe show hoga */}
      <GlobalChatbot />
      
      <Routes>
        {/* Login route - WITHOUT Navigation */}
        <Route path="/login" element={<Login />} />
        <Route path="/my-dashboard" element={<ClientDashboard />} />
      
        {/* All other routes - WITH Navigation */}
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
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;