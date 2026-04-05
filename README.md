# 📊 Customer Churn Prediction System

A **full-stack ML application** that predicts customer churn with high accuracy and explains *why* using SHAP.

🚀 **Live Demo:** *(Add your deployed link here)*

---

## ⚡ Overview

This project uses machine learning models to predict whether a customer is likely to churn and provides **interpretable insights** for decision-making.

✔ Real-time predictions
✔ Model comparison (5 algorithms)
✔ Explainable AI using SHAP
✔ Interactive dashboard

---

## 🧠 ML Pipeline

### Models Implemented

* Logistic Regression
* Decision Tree
* Random Forest
* K-Nearest Neighbors (KNN)
* **XGBoost (Final Model)**

### 📊 Evaluation Metrics

* Accuracy
* Precision
* Recall
* F1 Score

👉 **Final Choice:** XGBoost — best balance between performance and generalization.

---

## 🔍 Explainability (SHAP)

* Feature contribution analysis
* Top factors affecting churn prediction
* Improves trust and interpretability

---

## 🛠️ Tech Stack

### Backend

* FastAPI
* Uvicorn

### Frontend

* React.js
* Tailwind CSS
* Axios
* Recharts

### Machine Learning

* pandas
* numpy
* scikit-learn
* XGBoost
* SHAP

---

## 💻 System Architecture

Frontend (React) → API (FastAPI) → ML Model (XGBoost) → Prediction + SHAP Output

---

## 📂 Project Structure

```
churn-project/
│
├── backend/
│   ├── main.py
│   ├── model.pkl
│   ├── columns.pkl
│   └── utils.py
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── ml/
│   ├── train.py
│
└── data/
```

---

## ⚙️ Run Locally

### 1. Clone Repo

```
git clone <your-repo-link>
cd churn-project
```

### 2. Backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

👉 Runs on: http://127.0.0.1:8000

### 3. Frontend

```
cd frontend
npm install
npm run dev
```

👉 Runs on: http://localhost:5173

---

## 📈 Output

* Churn Prediction (Yes / No)
* Probability Score
* Risk Level (Low / Medium / High)
* Key Influencing Features

---

## 🎯 Future Improvements

* SHAP visualization graphs
* User authentication
* Prediction history tracking
* Docker deployment
* Real-time data integration

---

## 👨‍💻 Author

**Ayush Ranjan Ojha**

---

## 📜 License

This project is for educational and portfolio purposes.

