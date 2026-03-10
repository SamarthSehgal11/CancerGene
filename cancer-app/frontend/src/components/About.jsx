import React from 'react';
import { Database, FileDigit, Activity, Award } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container about-container">
                <div className="about-text fade-in">
                    <h2 className="section-title">The <span>Challenge</span></h2>
                    <p>
                        Gene expression data is notoriously high-dimensional. With over <strong>25,000+ features</strong> (genes) per sample and only a few hundred patients, traditional diagnostic methods struggle with the "p >> n" problem—leading to overfitting and noise.
                    </p>
                    <p>
                        Early and precise diagnosis of cancer types is critical for effective treatment. CancerGene AI leverages machine learning algorithms, coupled with robust feature selection (Mutual Information) and MinMax scaling, to identify the most predictive genetic markers and classify five major cancer variants with remarkable accuracy.
                    </p>
                </div>

                <div className="about-stats">
                    <div className="about-stat-card glass-card fade-in" style={{ transitionDelay: '0.1s' }}>
                        <Database className="stat-icon" />
                        <h4>801 Samples</h4>
                        <p>Patient expression profiles</p>
                    </div>
                    <div className="about-stat-card glass-card fade-in" style={{ transitionDelay: '0.2s' }}>
                        <FileDigit className="stat-icon" />
                        <h4>25,000+ Features</h4>
                        <p>Raw gene measurements</p>
                    </div>
                    <div className="about-stat-card glass-card fade-in" style={{ transitionDelay: '0.3s' }}>
                        <Activity className="stat-icon" />
                        <h4>5 Classes</h4>
                        <p>Major cancer variants</p>
                    </div>
                    <div className="about-stat-card glass-card fade-in" style={{ transitionDelay: '0.4s' }}>
                        <Award className="stat-icon" />
                        <h4>99% Accuracy</h4>
                        <p>Peak SVM performance</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
