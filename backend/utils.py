import joblib
import pandas as pd
import shap

model = joblib.load("model.pkl")
columns = joblib.load("columns.pkl")

explainer = shap.TreeExplainer(model)


def _get_shap_values_for_class1(shap_values):
    """
    SHAP can return either:
    - a single array of shape (n_samples, n_features), or
    - a list of arrays (one per class) for classifiers.
    We want contributions for the positive class (churn=1).
    """
    if isinstance(shap_values, list):
        if len(shap_values) >= 2:
            return shap_values[1]
        return shap_values[0]
    return shap_values


def predict(data, top_n: int = 5):
    df = pd.DataFrame([data])

    # convert categorical → dummies
    df = pd.get_dummies(df)

    # add missing columns
    for col in columns:
        if col not in df:
            df[col] = 0

    # keep same order
    df = df[columns]

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    shap_values = explainer.shap_values(df)
    shap_values_class1 = _get_shap_values_for_class1(shap_values)

    # shap_values_class1: (n_samples, n_features) - we only predict 1 row
    impacts = shap_values_class1[0]

    # Pick top features by absolute impact, but keep sign for UI coloring
    k = max(3, min(int(top_n), 5))
    ranked_idx = sorted(
        range(len(impacts)),
        key=lambda i: abs(impacts[i]),
        reverse=True,
    )[:k]

    top_features = [
        {
            "feature": str(columns[i]),
            "impact": float(impacts[i]),
        }
        for i in ranked_idx
    ]

    return prediction, probability, top_features