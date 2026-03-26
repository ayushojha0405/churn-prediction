from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import predict

app = FastAPI()

# Allow the local React dev server to call this API.
# Without this, browsers usually block the request with CORS and Axios shows "Network Error".
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

@app.post("/predict")
def get_prediction(data: dict):
    pred, prob, top_features = predict(data)

    return {
        "prediction": int(pred),
        "probability": float(prob),
        "top_features": top_features,
    }