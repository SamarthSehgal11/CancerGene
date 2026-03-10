import React, { useState, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CheckCircle } from 'lucide-react';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
);

// Custom Plugin for Value Labels
const valueLabelsPlugin = {
    id: 'valueLabels',
    afterDatasetsDraw(chart) {
        const { ctx, data } = chart;
        ctx.save();
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((bar, index) => {
                const value = dataset.data[index].toFixed(2);
                ctx.fillStyle = i === 0 ? '#0B7285' : '#099268';
                ctx.fillText(value, bar.x, bar.y - 5);
            });
        });
        ctx.restore();
    }
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('metrics');

    const models = [
        { name: 'SVM', f1: 0.99, auc: 1.00, status: 'Best Model', tag: 'best' },
        { name: 'Random Forest', f1: 0.98, auc: 1.00, status: 'Strong', tag: 'strong' },
        { name: 'KNN', f1: 0.83, auc: 0.87, status: 'Good', tag: 'good' },
        { name: 'Naive Bayes', f1: 0.79, auc: 0.82, status: 'Moderate', tag: 'moderate' },
        { name: 'Decision Tree', f1: 0.72, auc: 0.74, status: 'Weak', tag: 'weak' }
    ];

    const confusionMatrix = [
        [150, 2, 0, 0, 5],
        [0, 48, 0, 0, 0],
        [0, 0, 60, 0, 1],
        [0, 1, 0, 55, 0],
        [0, 0, 0, 0, 52]
    ];

    const classes = ['BRCA', 'COAD', 'KIRC', 'LUAD', 'PRAD'];
    const maxVal = 150; // As requested

    const barData = {
        labels: models.map(m => m.name),
        datasets: [
            {
                label: 'F1-Score',
                data: models.map(m => m.f1),
                backgroundColor: '#0EA5E9',
                borderRadius: 4,
                barThickness: 32
            },
            {
                label: 'ROC-AUC',
                data: models.map(m => m.auc),
                backgroundColor: '#10B981',
                borderRadius: 4,
                barThickness: 32
            }
        ]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default') {
                    delay = context.dataIndex * 150 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 1.1,
                grid: { color: '#E2E8F0' },
                ticks: { color: '#64748B', font: { weight: '600' } },
                title: { display: true, text: 'Score (0 to 1.0)', color: '#475569', font: { weight: '700' } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#0F172A', font: { weight: '700' } }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: { color: '#0F172A', font: { weight: '700' }, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' }
            },
            tooltip: {
                backgroundColor: '#0F172A',
                padding: 12,
                titleFont: { size: 14 },
                bodyFont: { size: 13 }
            }
        }
    };

    return (
        <section id="dashboard" className="dashboard-section">
            <div className="container">
                <h2 className="section-title">Model <span>Performance</span> Dashboard</h2>

                <div className="cv-badge slide-up">
                    <span>10-Fold Cross Validation Average Accuracy: <strong>98.5%</strong></span>
                </div>

                <div className="chart-tabs slide-up">
                    <button
                        className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('metrics')}
                    >
                        Comparative Metrics
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'confusion' ? 'active' : ''}`}
                        onClick={() => setActiveTab('confusion')}
                    >
                        SVM Confusion Matrix
                    </button>
                </div>

                <div className="chart-container slide-up">
                    {activeTab === 'metrics' && (
                        <>
                            <p className="chart-subtitle">10-Fold Cross Validation — All scores are averaged across folds</p>
                            <div className="chart-wrapper">
                                <Bar data={barData} options={barOptions} plugins={[valueLabelsPlugin]} />
                            </div>
                        </>
                    )}

                    {activeTab === 'confusion' && (
                        <div className="confusion-matrix-card">
                            <div className="confusion-matrix-container">
                                {/* Left Side: True Label */}
                                <div className="true-label-axis">TRUE LABEL</div>

                                {/* Center: Grid + Predicted Label */}
                                <div className="matrix-grid-wrapper">
                                    <div className="matrix-grid">
                                        {/* Header Row (Column Labels) */}
                                        <div className="grid-label empty"></div>
                                        {classes.map(cls => (
                                            <div key={`col-${cls}`} className="grid-label col">{cls}</div>
                                        ))}

                                        {/* Cells + Row Labels */}
                                        {confusionMatrix.map((row, i) => (
                                            <React.Fragment key={`row-group-${i}`}>
                                                <div className="grid-label row">{classes[i]}</div>
                                                {row.map((val, j) => {
                                                    const isDiagonal = i === j;
                                                    let bgColor = '#EFF6FF';
                                                    let textColor = '#94A3B8';

                                                    if (isDiagonal) {
                                                        bgColor = '#0EA5E9';
                                                        textColor = 'white';
                                                    } else if (val >= 100) {
                                                        bgColor = '#0EA5E9';
                                                        textColor = 'white';
                                                    } else if (val >= 11) {
                                                        bgColor = '#60A5FA';
                                                        textColor = 'white';
                                                    } else if (val >= 1) {
                                                        bgColor = '#BFDBFE';
                                                        textColor = '#1E40AF';
                                                    }

                                                    return (
                                                        <div
                                                            key={`${i}-${j}`}
                                                            className={`matrix-cell ${isDiagonal ? 'diagonal' : ''}`}
                                                            style={{ backgroundColor: bgColor, color: textColor }}
                                                        >
                                                            {val}
                                                        </div>
                                                    );
                                                })}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="predicted-label-axis">PREDICTED LABEL</div>
                                </div>

                                {/* Right Side: Color Scale */}
                                <div className="color-scale-legend">
                                    <span className="scale-val">150</span>
                                    <div className="scale-bar"></div>
                                    <span className="scale-val">0</span>
                                </div>
                            </div>
                            <p className="caption">Interactive Heatmap for Best Model (SVM)</p>
                        </div>
                    )}
                </div>

            </div>
        </section >
    );
};

export default Dashboard;
