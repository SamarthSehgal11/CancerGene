import React, { useEffect } from 'react';
import './Hero.css';

const Hero = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.fade-in');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="home" className="hero-section">
            <div className="hero-bg-overlay"></div>
            <div className="hero-medical-glow"></div>

            <div className="container hero-container">
                <div className="hero-badge fade-in">
                    <span className="pulse-dot"></span> AI-Powered Precision Oncology
                </div>
                <h1 className="hero-title fade-in">
                    Predict Cancer Type from<br />
                    <span className="gradient-text">Gene Expression Data</span>
                </h1>

                <p className="hero-subtitle fade-in" style={{ transitionDelay: '0.2s' }}>
                    An ML-powered system classifying 5 major cancer types — BRCA, COAD, KIRC, LUAD, PRAD — using 25,000+ gene features with 99% accuracy.
                </p>

                <div className="hero-cta fade-in" style={{ transitionDelay: '0.4s' }}>
                    <a href="#predictor" className="btn-primary">Try the Predictor</a>
                    <a href="#dashboard" className="btn-secondary">View Results</a>
                </div>

                <div className="stats-container fade-in" style={{ transitionDelay: '0.6s' }}>
                    <div className="stat-item glass-card brca">
                        <h3>801</h3>
                        <p>Patients</p>
                    </div>
                    <div className="stat-item glass-card coad">
                        <h3>25,000+</h3>
                        <p>Genes</p>
                    </div>
                    <div className="stat-item glass-card kirc">
                        <h3>5</h3>
                        <p>Cancer Types</p>
                    </div>
                    <div className="stat-item glass-card luad">
                        <h3>99%</h3>
                        <p>Accuracy</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
