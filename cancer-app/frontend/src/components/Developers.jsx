import React from 'react';
import './Developers.css';

const Developers = () => {
    const devs = [
        {
            name: "Samarth Sehgal",
            initials: "SS",
            role: "ML Engineer & Backend Developer",
            bio: "Specialized in machine learning model development, SVM optimization, Flask API architecture, and the end-to-end ML pipeline for CancerGene AI.",
            skills: ["Python", "Scikit-learn", "Flask", "SVM", "Feature Engineering"],
            gradient: "linear-gradient(135deg, #0EA5E9, #0284C7)",
            github: "#",
            linkedin: "#"
        },
        {
            name: "Yash Mahala",
            initials: "YM",
            role: "Data Scientist & Frontend Developer",
            bio: "Focused on gene expression data preprocessing, mutual information feature selection, model evaluation, and building the React.js visualization dashboard.",
            skills: ["React.js", "Pandas", "NumPy", "Data Analysis", "Visualization"],
            gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
            github: "#",
            linkedin: "#"
        }
    ];

    return (
        <section id="developers" className="developers-section">
            <div className="container">
                <div className="section-header center">
                    <h2 className="section-title">Meet the <span>Developers</span></h2>
                    <p className="section-subtitle">The minds behind CancerGene AI</p>
                </div>

                <div className="developers-grid">
                    {devs.map((dev, idx) => (
                        <div key={idx} className="developer-card fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                            <div className="dev-avatar" style={{ background: dev.gradient }}>
                                {dev.initials}
                            </div>
                            <h3>{dev.name}</h3>
                            <div className="dev-badge">{dev.role}</div>
                            <p className="dev-bio">{dev.bio}</p>

                            <div className="dev-skills">
                                {dev.skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Developers;
