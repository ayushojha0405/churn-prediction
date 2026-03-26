import { CartesianGrid } from "recharts";
import { useState } from "react";
import { predict } from "./services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Logistic Regression", f1: 0.63 },
  { name: "Decision Tree", f1: 0.50 },
  { name: "Random Forest", f1: 0.53 },
  { name: "KNN", f1: 0.55 },
  { name: "XGBoost", f1: 0.62 },
];

function App() {
  const [form, setForm] = useState({
    tenure: 5,
    MonthlyCharges: 70,
    TotalCharges: 350,
    gender: "Male",
    Contract: "Month-to-month",
    PaymentMethod: "Electronic check",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.tenure || !form.MonthlyCharges || !form.TotalCharges) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        tenure: Number(form.tenure),
        MonthlyCharges: Number(form.MonthlyCharges),
        TotalCharges: Number(form.TotalCharges),

        // default values
        SeniorCitizen: 0,
        Partner: "Yes",
        Dependents: "No",
        PhoneService: "Yes",
        MultipleLines: "No",
        InternetService: "Fiber optic",
        OnlineSecurity: "No",
        OnlineBackup: "Yes",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaperlessBilling: "Yes",
      };

      const res = await predict(payload);
      setResult(res);
    } catch (err) {
      alert("API error");
    }

    setLoading(false);
  };

  const getRisk = (p) => {
    if (p > 0.7) return "High Risk";
    if (p > 0.4) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 p-6 font-[Inter]">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-semibold text-center mb-2">
            Customer Churn Prediction
          </h1>
          <p className="text-center text-slate-400 mb-8 text-sm">
            Enter customer details and get a churn prediction.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: FORM */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all duration-200 hover:border-slate-700">

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="tenure"
                  value={form.tenure}
                  onChange={handleChange}
                  placeholder="Tenure"
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-sm transition"
                />

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <input
                  name="MonthlyCharges"
                  value={form.MonthlyCharges}
                  onChange={handleChange}
                  placeholder="Monthly Charges"
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-sm"
                />

                <select
                  name="Contract"
                  value={form.Contract}
                  onChange={handleChange}
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-sm"
                >
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>

                <input
                  name="TotalCharges"
                  value={form.TotalCharges}
                  onChange={handleChange}
                  placeholder="Total Charges"
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-sm"
                />

                <select
                  name="PaymentMethod"
                  value={form.PaymentMethod}
                  onChange={handleChange}
                  className="p-2.5 rounded-md bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-sm"
                >
                  <option>Electronic check</option>
                  <option>Mailed check</option>
                  <option>Bank transfer</option>
                  <option>Credit card</option>
                </select>

              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-indigo-600 text-sm font-medium p-2.5 rounded-md transition-all duration-200 hover:bg-indigo-500 active:scale-[0.98]"
              >
                {loading ? "Predicting..." : "Predict"}
              </button>

              {result && (
                <div className="mt-6 p-4 bg-slate-800 rounded-md border border-slate-700 transition">

                  <p className="text-base font-medium">
                    {result.prediction === 1 ? "Churn" : "No Churn"}
                  </p>

                  <p className="text-sm text-slate-300">
                    Probability: {result.probability.toFixed(2)}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {getRisk(result.probability)}
                  </p>

                  {/* SHAP FEATURES */}
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-2">Top Features</p>

                    <div className="grid grid-cols-2 gap-2">
                      {[...result.top_features]
                        .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
                        .map((item, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-md bg-slate-700 border border-slate-600 text-xs transition hover:bg-slate-600"
                          >
                            {item.feature.replaceAll("_", " ")}
                            <br />
                            Impact: {item.impact.toFixed(2)}
                          </div>
                        ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* RIGHT: CHART */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all duration-200 hover:border-slate-700">

              <h2 className="text-sm font-medium mb-4 text-slate-200">
                Model Comparison (F1 Score)
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>

                  {/* Grid */}
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

                  {/* X Axis */}
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#cbd5f5", fontSize: 12 }}
                    axisLine={{ stroke: "#334155" }}
                    tickLine={false}
                    interval={0}
                  />

                  {/* Y Axis */}
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={{ stroke: "#334155" }}
                    tickLine={false}
                  />

                  {/* Tooltip */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "6px",
                      color: "#e2e8f0",
                    }}
                    labelStyle={{ color: "#a5b4fc" }}
                    cursor={{ fill: "rgba(99,102,241,0.1)" }}
                  />

                  {/* Bars */}
                  <Bar
                    dataKey="f1"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>

            </div>


          </div>
        </div>
      </div>

      <footer className="mt-auto w-full text-center text-xs text-slate-500 border-t border-slate-800 pt-4">
        <p>
          Made by{" "}
          <span className="text-slate-300 font-medium">Ayush Ranjan Ojha</span>
        </p>
        <p className="mt-1">© {new Date().getFullYear()} • All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;