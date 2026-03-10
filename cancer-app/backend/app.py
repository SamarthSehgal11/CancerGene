from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load models and preprocessing objects at startup
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
models = {}
scaler = None
selector = None

def load_resources():
    global models, scaler, selector
    # Load scaler and selector (placeholder filenames)
    scaler_path = os.path.join(MODEL_DIR, 'scaler.pkl')
    selector_path = os.path.join(MODEL_DIR, 'selector.pkl')
    if os.path.exists(scaler_path):
        scaler = joblib.load(scaler_path)
    if os.path.exists(selector_path):
        selector = joblib.load(selector_path)
    # Load model files (example names)
    for name in ['svm', 'random_forest', 'knn', 'naive_bayes', 'decision_tree']:
        model_path = os.path.join(MODEL_DIR, f"{name}.pkl")
        if os.path.exists(model_path):
            models[name] = joblib.load(model_path)

load_resources()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/api/models', methods=['GET'])
def get_models():
    # Placeholder metadata
    metadata = {
        'svm': {'f1': 0.99, 'auc': 1.0, 'accuracy': 0.99},
        'random_forest': {'f1': 0.98, 'auc': 1.0, 'accuracy': 0.98},
        'knn': {'f1': 0.85, 'auc': 0.92, 'accuracy': 0.86},
        'naive_bayes': {'f1': 0.80, 'auc': 0.88, 'accuracy': 0.81},
        'decision_tree': {'f1': 0.72, 'auc': 0.75, 'accuracy': 0.73}
    }
    return jsonify(metadata)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    model_name = data.get('model')
    features = data.get('features')
    if not model_name or not features:
        return jsonify({'error': 'Missing model or features'}), 400
    if model_name not in models:
        # Fallback to mock prediction for demonstration if models aren't loaded
        import random
        confidence = round(random.uniform(0.85, 0.99), 3)
        rem = round((1 - confidence) / 4, 4)
        return jsonify({
            'prediction': 'BRCA',
            'confidence': confidence,
            'probabilities': {
                'BRCA': confidence,
                'COAD': rem,
                'KIRC': rem,
                'LUAD': rem,
                'PRAD': rem
            }
        })
    try:
        X = np.array(features).reshape(1, -1)
        if scaler:
            X = scaler.transform(X)
        if selector:
            X = selector.transform(X)
        pred = models[model_name].predict(X)[0]
        prob = models[model_name].predict_proba(X)[0]
        class_idx = int(pred)
        class_labels = ['BRCA', 'COAD', 'KIRC', 'LUAD', 'PRAD']
        prediction = class_labels[class_idx]
        confidence = float(max(prob))
        probabilities = {label: float(p) for label, p in zip(class_labels, prob)}
        return jsonify({
            'prediction': prediction,
            'confidence': confidence,
            'probabilities': probabilities
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
