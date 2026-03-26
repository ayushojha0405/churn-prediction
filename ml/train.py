import pandas as pd
import numpy as np
import shap
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import f1_score, accuracy_score, precision_score, recall_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("../data/Telco-Customer-Churn.csv")

df.drop("customerID", axis=1, inplace=True)

df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")
df.fillna(0, inplace=True)

df = pd.get_dummies(df, drop_first=True)

df["Churn"] = df["Churn_Yes"]
df.drop("Churn_Yes", axis=1, inplace=True)

X = df.drop("Churn", axis=1)
y = df["Churn"]

X=X.astype(float)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

models = {
    "Logistic Regression": LogisticRegression(max_iter=2000, class_weight='balanced'),
    "Decision Tree": DecisionTreeClassifier(class_weight='balanced'),
    "Random Forest": RandomForestClassifier(class_weight='balanced'),
    "KNN": KNeighborsClassifier(),
    "XGBoost": XGBClassifier(scale_pos_weight=3, eval_metric='logloss')
}

results = []

for name, model in models.items():

    if name == "KNN" or name == "Logistic Regression":
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        model.fit(X_train_scaled, y_train)
        pred = model.predict(X_test_scaled)
    else:
        model.fit(X_train, y_train)
        pred = model.predict(X_test)

    acc = accuracy_score(y_test, pred)
    prec = precision_score(y_test, pred)
    rec = recall_score(y_test, pred)
    f1 = f1_score(y_test, pred)

    results.append([name, acc, prec, rec, f1])

    print(f"\n{name}")
    print("Accuracy:", acc)
    print("Precision:", prec)
    print("Recall:", rec)
    print("F1 Score:", f1)

results_df = pd.DataFrame(results, columns=["Model", "Accuracy", "Precision", "Recall", "F1"])

print("\nFinal Comparison:\n")
print(results_df)

print("\nGenerating SHAP explanation...")

model = XGBClassifier(scale_pos_weight=3, eval_metric='logloss')
model.fit(X_train, y_train)

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

shap.summary_plot(shap_values, X_test)

plt.show()

print("\nSaving model and features...")

# Train final model (XGBoost)
final_model = XGBClassifier(scale_pos_weight=3, eval_metric='logloss')
final_model.fit(X_train, y_train)

# Save model
joblib.dump(final_model, "../backend/model.pkl")

# Save column names (VERY IMPORTANT)
joblib.dump(X.columns.tolist(), "../backend/columns.pkl")

print("Saved model.pkl and columns.pkl")