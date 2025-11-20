// frontend/src/api/predict.js

const API_URL = "http://127.0.0.1:5000/predict";

export default async function predict(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Prediction failed");
  }

  return result.predicted_grade;   // ONLY return prediction
}
