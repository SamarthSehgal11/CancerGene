import React from 'react';
import { AlertTriangle, Github, FileText } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <span className="logo-icon">🧬</span> CancerGene <span className="logo-accent">AI</span>
                        <p className="footer-tagline">Multi-Cancer Classification via Gene Expression</p>
                    </div>
                    <div className="footer-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                            <Github size={18} /> Source Code
                        </a>
                        <a href="https://drive.google.com/file/d/1U-ukFNOeVRmfvT2Dwr8MwTfqdqjzxmUE/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="footer-link">
                            <FileText size={18} /> Documentation
                        </a>
                    </div>
                </div>

                <div className="footer-disclaimer">
                    <AlertTriangle className="disclaimer-icon" size={20} />
                    <p><strong>Disclaimer:</strong> This tool is intended for research and educational purposes only. It is not a substitute for professional medical diagnosis, advice, or treatment.</p>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CancerGene AI Project. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
