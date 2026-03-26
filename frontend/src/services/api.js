import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const predict = async (data) => {
  const res = await API.post("/predict", data);
  return res.data;
};