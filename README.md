# CancerGene AI — Multi-Cancer Classification Using Gene Expression Data

![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)
![Scikit-Learn](https://img.shields.io/badge/Library-Scikit--Learn-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen)

## Overview
This project builds a machine learning pipeline to classify five major cancer types from high-dimensional gene expression profiles. The dataset contains 801 patient samples with over 8,000 gene features sourced from publicly available genomic data. The five cancer classes are Breast Invasive Carcinoma (BRCA), Colon Adenocarcinoma (COAD), Kidney Renal Clear Cell Carcinoma (KIRC), Lung Adenocarcinoma (LUAD), and Prostate Adenocarcinoma (PRAD). The primary motivation is to assist early and accurate cancer diagnosis using non-invasive computational methods, reducing reliance on expensive and time-consuming traditional diagnostic procedures.

## Problem Statement
Gene expression data presents a classic high-dimensionality challenge where the number of features far exceeds the number of samples (p >> n). This makes traditional statistical methods unreliable and increases the risk of overfitting. The goal was to build a robust, generalizable classifier that handles this challenge through careful preprocessing, dimensionality reduction, and model selection.

## Dataset
| Attribute | Description |
|-----------|-------------|
| Source | Publicly available gene expression dataset |
| Samples | 801 patient records |
| Features | 8,000+ gene expression values |
| Classes | 5 (BRCA, COAD, KIRC, LUAD, PRAD) |
| Format | CSV with labeled samples |

## Methodology

### Preprocessing
The raw data underwent several transformation steps to prepare it for modeling. First, irrelevant columns such as sample identifiers were removed, and the target variable was encoded using label encoding. To ensure that the feature ranges did not bias the models, MinMax scaling was applied to normalize all gene expression values between 0 and 1, which is particularly important for distance-based algorithms like KNN and SVM. Finally, a stratified 80/20 train-test split was implemented to maintain consistent class proportions across both sets.

### Feature Selection
To address the high-dimensionality of the dataset, Mutual Information (MI) scoring was used to rank all 8,000+ genes based on their predictive relevance to the target labels. By calculating the statistical dependency between each feature and the cancer type, the top 1,000 most informative genes were selected for training. This process significantly reduced noise and computational requirements while retaining the variance necessary for accurate classification.

### Models Trained
| Model | Type | Notes |
|-------|------|-------|
| Random Forest | Ensemble | Robust to noise, handles high-dimensional data well |
| Decision Tree | Baseline | Prone to overfitting without pruning |
| K-Nearest Neighbors | Instance-based | Sensitive to scaling, benefits from MinMax normalization |
| Naive Bayes | Probabilistic | Assumes feature independence, fast but limited |
| Support Vector Machine | Margin-based | Best performer, effective in high-dimensional spaces |

## Results
| Model | F1-Score | ROC-AUC | Notes |
|-------|----------|---------|-------|
| SVM | 0.99 | 1.00 | Best overall performer |
| Random Forest | 0.98 | 1.00 | Strong and stable |
| KNN | 0.83 | 0.87 | Good but computationally heavy |
| Naive Bayes | 0.79 | 0.82 | Moderate, limited by independence assumption |
| Decision Tree | 0.72 | 0.74 | Weakest, prone to overfitting |

SVM with an RBF kernel achieved the highest performance, which aligns with its known strength in separating high-dimensional feature spaces. 10-fold cross-validation was used to verify stability and reduce the risk of overfitting — results remained consistent across all folds. The confusion matrix for SVM shows near-perfect classification across all five cancer types.

## Project Structure
```text
CancerGene-AI/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── models/
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       └── components/
├── notebooks/
│   └── cancer_classification.ipynb
├── data/
│   └── gene_expression.csv
└── README.md
```

## Installation & Setup

### Backend setup:
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python app.py`

### Frontend setup:
1. `cd frontend`
2. `npm install`
3. `npm start`

Place your trained .pkl model files inside the `backend/models/` directory before starting the server. The app expects `svm_model.pkl`, `scaler.pkl`, and `selector.pkl` at minimum.

## Tech Stack
| Layer | Technology |
|-------|------------|
| ML/Backend | Python, Scikit-learn, Flask, Joblib |
| Frontend | React.js, Chart.js, Tailwind CSS |
| Data Processing | Pandas, NumPy, MinMaxScaler |
| Feature Selection | Mutual Information (sklearn) |
| Validation | 10-Fold Stratified Cross Validation |

## Developers
This project was developed by Samarth Sehgal and Yash Mahala as part of a machine learning research project focused on computational genomics and cancer diagnostics.

## Disclaimer
> This project is intended strictly for academic and research purposes. It is not a clinical diagnostic tool and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions.
