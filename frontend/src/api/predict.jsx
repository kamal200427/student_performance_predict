// frontend/src/api/predict.js

const API_URL = "http://127.0.0.1:5000/predict";

export default async function predict(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new Error("Invalid response from server");
  }

  if (!response.ok) {
    throw new Error(result?.error || "Prediction failed");
  }
console.log(result.attendance);

  return {
    predicted_grade: result.predicted_grade ?? null,
    score: typeof result.score === "number"
      ? result.score
      : Number(result.score),
      attendance:result.attendance,
  };
}
const API_URL1 = "http://127.0.0.1:5000/auth/reset-password";
export  async function resetpass(data) {
  const response = await fetch(API_URL1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;
  try {
    result = await response.json();
  } catch (e) {
    throw new Error("Invalid response from server");
  }

  if (!response.ok) {
    throw new Error(result?.error || "Prediction failed");
  }
 

  return  result
}
