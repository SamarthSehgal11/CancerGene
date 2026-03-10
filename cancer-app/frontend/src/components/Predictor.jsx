import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, UploadCloud, FileText, AlertTriangle, Activity } from 'lucide-react';
import './Predictor.css';

const Predictor = () => {
    const [model, setModel] = useState('svm');
    const [inputType, setInputType] = useState('text');
    const [textInput, setTextInput] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSampleData = () => {
        // Generate ~25000 random values for demo purposes
        const sampleFeatures = Array.from({ length: 25000 }, () => (Math.random() * 10).toFixed(4)).join(', ');
        setTextInput(sampleFeatures);
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setTextInput(event.target.result);
            };
            reader.readAsText(uploadedFile);
        }
    };

    const processInput = () => {
        if (!textInput.trim()) return [];

        let targetText = textInput;
        const lines = textInput.split(/\r?\n/);

        // Find a valid numeric row if it's a multi-line CSV
        if (lines.length > 1) {
            for (let i = 0; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length > 10) {
                    // Check if second column is a number to skip header
                    if (!isNaN(parseFloat(parts[1]))) {
                        targetText = lines[i];
                        break;
                    }
                }
            }
        }

        const features = targetText.split(/[\n,]+/).map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
        return features;
    };

    const handlePredict = async () => {
        setError(null);
        setResult(null);
        const features = processInput();

        if (features.length === 0) {
            setError('Please provide valid numerical feature data.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/predict', {
                model,
                features
            });
            setResult(response.data);
            setLoading(false);

        } catch (err) {
            setError('An error occurred during prediction. Ensure the backend is running.');
            setLoading(false);
        }
    };

    return (
        <section id="predictor" className="predictor-section">
            <div className="container">
                <h2 className="section-title">Gene Expression <span>Predictor</span></h2>

                <div className="predictor-container glass-card fade-in">
                    <div className="predictor-controls">
                        <div className="form-group">
                            <label htmlFor="model-select">Select ML Model</label>
                            <select
                                id="model-select"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="input-style"
                            >
                                <option value="svm">SVM (Best Performance)</option>
                                <option value="random_forest">Random Forest</option>
                                <option value="knn">K-Nearest Neighbors</option>
                                <option value="naive_bayes">Naive Bayes</option>
                                <option value="decision_tree">Decision Tree</option>
                            </select>
                        </div>

                        <div className="input-tabs">
                            <button
                                className={`tab-btn ${inputType === 'text' ? 'active' : ''}`}
                                onClick={() => setInputType('text')}
                            >
                                <FileText size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                Paste Values
                            </button>
                            <button
                                className={`tab-btn ${inputType === 'file' ? 'active' : ''}`}
                                onClick={() => setInputType('file')}
                            >
                                <UploadCloud size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                Upload CSV
                            </button>
                        </div>

                        {inputType === 'text' ? (
                            <div className="form-group">
                                <label>Gene Expression Values (comma separated)</label>
                                <textarea
                                    className="input-style feature-textarea"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    placeholder="e.g. 1.254, 0.453, 2.110..."
                                />
                                <button className="btn-secondary btn-sm" onClick={handleSampleData}>
                                    Load Sample Patient Data
                                </button>
                            </div>
                        ) : (
                            <div className="form-group file-upload-group">
                                <input
                                    type="file"
                                    accept=".csv,.txt"
                                    onChange={handleFileUpload}
                                    id="file-upload"
                                    className="file-input"
                                />
                                <label htmlFor="file-upload" className="file-label btn-secondary">
                                    Choose File... {file && <span className="file-name">{file.name}</span>}
                                </label>
                            </div>
                        )}

                        <button
                            className="btn-primary predict-btn"
                            onClick={handlePredict}
                            disabled={loading}
                        >
                            {loading ? <><Loader2 className="spinner" /> Analyzing...</> : 'Predict Cancer Type'}
                        </button>

                        {error && <div className="error-message">{error}</div>}
                    </div>

                    <div className="predictor-result">
                        {result ? (
                            <div className="result-card slide-up">
                                <h3>Prediction Result</h3>
                                <div className="primary-prediction">
                                    <span className="pred-class">{result.prediction}</span>
                                    <span className="pred-name">
                                        {result.prediction === 'BRCA' ? 'Breast Cancer' :
                                            result.prediction === 'COAD' ? 'Colon Adenocarcinoma' :
                                                result.prediction === 'KIRC' ? 'Kidney Renal Clear Cell' :
                                                    result.prediction === 'LUAD' ? 'Lung Adenocarcinoma' : 'Prostate Adenocarcinoma'}
                                    </span>
                                </div>

                                <div className="confidence-wrapper">
                                    <div className="confidence-label">
                                        <span>Confidence</span>
                                        <span>{(result.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="confidence-bar-bg">
                                        <div
                                            className="confidence-bar fill-brca"
                                            style={{ width: `${result.confidence * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="probabilities-list">
                                    <h4>Class Probabilities</h4>
                                    {Object.entries(result.probabilities).map(([key, val]) => (
                                        <div key={key} className="prob-item">
                                            <span className="prob-label">{key}</span>
                                            <div className="prob-bar-container">
                                                <div className={`prob-bar fill-${key.toLowerCase()}`} style={{ width: `${val * 100}%` }}></div>
                                            </div>
                                            <span className="prob-val">{(val * 100).toFixed(1)}%</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="disclaimer-note">
                                    <AlertTriangle size={14} style={{ marginRight: '5px' }} />
                                    For research purposes only. Not a clinical diagnostic tool.
                                </div>
                            </div>
                        ) : (
                            <div className="empty-result">
                                <Activity size={48} className="empty-icon" />
                                <p>Awaiting input data to generate prediction.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Predictor;
