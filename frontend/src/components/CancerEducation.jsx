import React, { useState } from 'react';
import { ChevronDown, AlertCircle, ExternalLink } from 'lucide-react';
import './CancerEducation.css';

const CancerEducation = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const cancerTypes = [
        {
            id: 'BRCA',
            name: 'Breast Cancer',
            color: '#EC4899',
            what: 'Breast cancer begins in the cells of the breast. It is one of the most common cancers worldwide, affecting both men and women.',
            symptoms: ['Lump in breast', 'Change in breast shape', 'Skin dimpling', 'Nipple discharge'],
            risks: ['Family history', 'BRCA1/BRCA2 gene mutations', 'Age', 'Hormonal factors'],
            todo: 'Consult an oncologist immediately. Treatment options include surgery (lumpectomy/mastectomy), chemotherapy, radiation, and hormone therapy. Seek a second opinion. Connect with a breast cancer support group. Maintain a healthy lifestyle during treatment.',
            tip: 'Regular mammograms and self-examinations are critical for early detection.'
        },
        {
            id: 'COAD',
            name: 'Colon (Colorectal) Cancer',
            color: '#F97316',
            what: 'Colorectal cancer starts in the colon or rectum. It typically begins as small polyps that can become cancerous over time.',
            symptoms: ['Change in bowel habits', 'Blood in stool', 'Abdominal discomfort', 'Unexplained weight loss'],
            risks: ['Age over 50', 'Family history', 'High-fat low-fiber diet', 'Inflammatory bowel disease'],
            todo: 'Consult a gastroenterologist and oncologist. Treatment includes surgery, chemotherapy, targeted therapy, and immunotherapy. Colonoscopy screening is critical. Adopt a fiber-rich, plant-based diet post-treatment.',
            tip: 'Colonoscopy screening after age 45 can detect polyps before they become cancerous.'
        },
        {
            id: 'KIRC',
            name: 'Kidney (Renal Cell) Cancer',
            color: '#0EA5E9',
            what: "Kidney cancer (Renal Cell Carcinoma) originates in the lining of the kidney's tubules. It is often discovered incidentally during imaging for other conditions.",
            symptoms: ['Blood in urine', 'Persistent back/side pain', 'Unexplained weight loss', 'Fatigue', 'Intermittent fever'],
            risks: ['Smoking', 'Obesity', 'High blood pressure', 'Long-term dialysis', 'Family history'],
            todo: 'Consult a urologist or oncologist. Treatments include partial or radical nephrectomy, targeted therapy (VEGF inhibitors), immunotherapy, and ablation therapy. Quitting smoking and managing blood pressure is essential.',
            tip: 'Kidney cancer often has no early symptoms — routine imaging can catch it early.'
        },
        {
            id: 'LUAD',
            name: 'Lung Adenocarcinoma',
            color: '#8B5CF6',
            what: 'Lung Adenocarcinoma is the most common subtype of lung cancer, originating in the mucus-secreting glands of the lung. It can occur in non-smokers too.',
            symptoms: ['Persistent cough', 'Coughing blood', 'Chest pain', 'Shortness of breath', 'Hoarseness', 'Unexplained weight loss'],
            risks: ['Smoking', 'Secondhand smoke', 'Radon gas exposure', 'Air pollution', 'Asbestos exposure'],
            todo: 'Consult a pulmonologist and thoracic oncologist immediately. Treatments include surgery (lobectomy), chemotherapy, radiation, targeted therapy (EGFR inhibitors), and immunotherapy (PD-L1 inhibitors). Quit smoking immediately.',
            tip: 'Annual low-dose CT scans are recommended for high-risk individuals (heavy smokers aged 50–80).'
        },
        {
            id: 'PRAD',
            name: 'Prostate Cancer',
            color: '#10B981',
            what: 'Prostate cancer develops in the prostate gland in men. It is one of the most common cancers in men and is often slow-growing.',
            symptoms: ['Frequent urination', 'Weak urine stream', 'Blood in urine or semen', 'Pelvic discomfort', 'Erectile dysfunction'],
            risks: ['Age over 50', 'African-American ethnicity', 'Family history', 'High-fat diet'],
            todo: 'Consult a urologist or oncologist. Treatment options include active surveillance (watchful waiting), surgery (prostatectomy), radiation, hormone therapy (ADT), and chemotherapy. PSA monitoring is essential post-treatment.',
            tip: 'PSA (Prostate-Specific Antigen) blood test and digital rectal exam are key screening tools for men over 50.'
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section id="cancer-info" className="cancer-edu-section">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Understanding the <span>5 Cancer Types</span></h2>
                    <p className="section-subtitle">Early awareness saves lives. Learn about each cancer type our model detects.</p>
                </div>

                <div className="accordion-container fade-in" style={{ transitionDelay: '0.2s' }}>
                    {cancerTypes.map((type, index) => (
                        <div
                            key={type.id}
                            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                            style={{ borderLeft: `6px solid ${type.color}` }}
                        >
                            <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                <div className="accordion-title">
                                    <span className="type-code" style={{ color: type.color }}>{type.id}</span>
                                    <span className="type-name">{type.name}</span>
                                </div>
                                <ChevronDown size={20} className="icon-chevron" />
                            </div>
                            <div className="accordion-content">
                                <div className="edu-grid">
                                    <div className="edu-block">
                                        <h4>What it is</h4>
                                        <p>{type.what}</p>
                                    </div>
                                    <div className="edu-block">
                                        <h4>Common Symptoms</h4>
                                        <ul>
                                            {type.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div className="edu-block">
                                        <h4>Risk Factors</h4>
                                        <ul>
                                            {type.risks.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                    </div>
                                    <div className="diagnosed-block">
                                        <h4>If Diagnosed — What To Do</h4>
                                        <p>{type.todo}</p>
                                    </div>
                                    <div className="tip-block">
                                        <strong>Early Detection Tip:</strong> {type.tip}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="medical-disclaimer-box fade-in" style={{ transitionDelay: '0.4s' }}>
                    <div className="disclaimer-title">
                        <AlertCircle size={24} />
                        <span>Medical Disclaimer</span>
                    </div>
                    <p className="disclaimer-text">
                        The information provided here is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you or someone you know has been diagnosed with cancer, please consult a qualified oncologist or healthcare provider immediately.
                    </p>
                    <a
                        href="https://www.apollohospitals.com/departments/cancer/clinical-team-doctors"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-oncologist"
                    >
                        Find an Oncologist Near You <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CancerEducation;
