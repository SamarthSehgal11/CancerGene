import React from 'react';
import { Activity } from 'lucide-react';
import './CancerCards.css';

const CancerCards = () => {
    const cancerTypes = [
        {
            code: 'BRCA',
            name: 'Breast Invasive Carcinoma',
            organ: 'Breast',
            color: '#EC4899',
            desc: "Starts in breast tissue, often in the ducts or lobules. It is one of the most common cancers globally, affecting both men and women."
        },
        {
            code: 'COAD',
            name: 'Colon Adenocarcinoma',
            organ: 'Colon',
            color: '#F97316',
            desc: "Begins in the lining of the large intestine. It often develops from small polyps and is highly preventable with early detection."
        },
        {
            code: 'KIRC',
            name: 'Kidney Renal Clear Cell Carcinoma',
            organ: 'Kidney',
            color: '#10B981',
            desc: "Originates in the small tubes that filter blood. It is the most common kidney cancer and is often found incidentally during scans."
        },
        {
            code: 'LUAD',
            name: 'Lung Adenocarcinoma',
            organ: 'Lung',
            color: '#8B5CF6',
            desc: "Forms in the mucus-producing glands of the lungs. It occurs in both smokers and non-smokers and affects the respiratory system."
        },
        {
            code: 'PRAD',
            name: 'Prostate Adenocarcinoma',
            organ: 'Prostate',
            color: '#0EA5E9',
            desc: "Develops in the glandular cells of the prostate. It is typically slow-growing and responds very well to early-stage treatment."
        }
    ];

    return (
        <section id="cancer-types" className="cancer-types-section">
            <div className="container">
                <div className="section-header center">
                    <h2 className="section-title">Studied <span>Cancer</span> Types</h2>
                    <p className="section-subtitle">Early awareness saves lives. Learn about each cancer type our model detects.</p>
                </div>

                <div className="cancer-cards-grid">
                    {cancerTypes.map((cancer, index) => (
                        <div key={index} className="flip-card">
                            <div className="flip-card-inner">
                                {/* Front Face */}
                                <div className="flip-card-front" style={{ borderTop: `4px solid ${cancer.color}` }}>
                                    <div className="card-top">
                                        <Activity size={24} color={cancer.color} className="pulse-icon" />
                                        <span className="cancer-code" style={{ color: cancer.color }}>{cancer.code}</span>
                                    </div>
                                    <h4 className="cancer-name">{cancer.name}</h4>
                                    <p className="cancer-organ">Organ: <span>{cancer.organ}</span></p>
                                    <div className="card-bottom">
                                        <span className="target-label">PRIMARY MODEL TARGET</span>
                                    </div>
                                    <div className="card-tint" style={{ backgroundColor: cancer.color }}></div>
                                </div>

                                {/* Back Face */}
                                <div className="flip-card-back" style={{ borderTop: `4px solid ${cancer.color}` }}>
                                    <div className="back-content">
                                        <span className="cancer-code" style={{ color: cancer.color }}>{cancer.code}</span>
                                        <p className="cancer-desc">{cancer.desc}</p>
                                    </div>
                                    <div className="back-tint" style={{ background: `linear-gradient(to bottom, white, ${cancer.color}05)` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CancerCards;
