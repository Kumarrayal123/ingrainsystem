import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
function App() {
  return (
    <Router>
      {/* We remove the global background classes here since each Page component defines its own background wrapper now! */}
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
            <Route path="/workspace" element={<WorkSpace/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
