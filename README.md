📊 Customer Churn Prediction System

A full-stack machine learning web application that predicts whether a customer is likely to churn (leave a service) using classification models and provides explainability using SHAP.

---

🚀 Live Demo
*(Add your deployed link here later)*


📌 Features

* 🔍 Predict customer churn in real-time
* 🤖 Multiple ML models comparison (5 models)
* ⚡ FastAPI backend for inference
* 🎯 XGBoost as final optimized model
* 📈 Model performance visualization (F1 Score)
* 🧠 SHAP-based feature importance (top contributing factors)
* 💻 Clean and responsive React dashboard
* 🎨 Professional UI with Tailwind CSS

🧠 Machine Learning Details

Models Used

* Logistic Regression
* Decision Tree
* Random Forest
* K-Nearest Neighbors (KNN)
* XGBoost (Final Model)

Evaluation Metrics

* Accuracy
* Precision
* Recall
* F1 Score

Final Model Selection

XGBoost was chosen based on balanced performance and generalization.

📊 Explainability

* Integrated **SHAP (SHapley Additive Explanations)**
* Displays top features influencing prediction
* Helps understand *why* a customer may churn


🛠️ Tech Stack

Frontend

* React.js
* Tailwind CSS
* Axios
* Recharts

Backend

* FastAPI
* Uvicorn

Machine Learning

* pandas
* numpy
* scikit-learn
* XGBoost
* SHAP


📂 Project Structure


churn-project/
│
├── backend/
│   ├── main.py
│   ├── model.pkl
│   ├── columns.pkl
│   ├── utils.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── ml/
│   ├── train.py
│
└── data/


⚙️ How to Run Locally

1️⃣ Clone Repository

git clone <your-repo-link>
cd churn-project

2️⃣ Backend Setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:

http://127.0.0.1:8000

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

📈 Example Output

* Prediction: **Churn / No Churn**
* Probability Score
* Risk Level (Low / Medium / High)
* Top Contributing Features

🎯 Future Improvements

* SHAP visualization graph
* User authentication system
* Prediction history tracking
* Deployment with Docker
* Real-time dataset integration

👨‍💻 Author

**Ayush Ranjan Ojha**

📜 License

This project is for educational and portfolio purposes.
