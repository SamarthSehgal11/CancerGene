import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo">
          <span className="logo-icon">🧬</span> CancerGene <span className="logo-accent">AI</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#dashboard">Results</a></li>
          <li><a href="#predictor">Predictor</a></li>
          <li><a href="#cancer-types">Cancer Types</a></li>
        </ul>
        <a href="#predictor" className="btn-primary nav-btn">Try Predictor</a>
      </div>
    </nav>
  );
};

export default Navbar;
