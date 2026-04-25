import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Buy from './pages/Buy';
import Price from './pages/Price';
import Howitworks from './pages/Howitworks';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
