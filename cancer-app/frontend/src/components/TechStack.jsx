import React from 'react';
import './TechStack.css';

const TechStack = () => {
    const technologies = [
        'Python', 'Scikit-learn', 'Flask', 'React.js',
        'Pandas', 'NumPy', 'Mutual Information',
        'MinMax Scaler', '10-Fold Cross Validation', 'Chart.js'
    ];

    return (
        <section id="tech-stack" className="tech-stack-section">
            <div className="container">
                <h2 className="section-title">Methodology & <span>Tech Stack</span></h2>

                <div className="tech-stack-container">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="tech-badge fade-in"
                            style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
