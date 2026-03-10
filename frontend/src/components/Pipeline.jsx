import React from 'react';
import { UploadCloud, Scaling, Filter, BrainCircuit, Activity } from 'lucide-react';
import './Pipeline.css';

const Pipeline = () => {
    const steps = [
        {
            icon: <UploadCloud />,
            title: 'Upload Gene Data',
            desc: 'Raw expression values'
        },
        {
            icon: <Scaling />, // Using an available icon as placeholder for MinMax Scaling
            title: 'MinMax Scaling',
            desc: 'Normalize features to [0,1]'
        },
        {
            icon: <Filter />,
            title: 'Feature Selection',
            desc: 'Mutual Information (Top 1000)'
        },
        {
            icon: <BrainCircuit />,
            title: 'ML Inference',
            desc: 'Run through trained model'
        },
        {
            icon: <Activity />,
            title: 'Prediction',
            desc: 'Output cancer type class'
        }
    ];

    return (
        <section id="how-it-works" className="pipeline-section">
            <div className="container">
                <h2 className="section-title">How It <span>Works</span></h2>

                <div className="pipeline-container">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="pipeline-step glass-card fade-in" style={{ transitionDelay: `${index * 0.15}s` }}>
                                <div className="step-number">{index + 1}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="pipeline-arrow fade-in" style={{ transitionDelay: `${index * 0.15 + 0.1}s` }}>
                                    →
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pipeline;
