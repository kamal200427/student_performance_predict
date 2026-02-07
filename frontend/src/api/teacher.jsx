// frontend/src/api/teacher.js

const API_BASE = "http://127.0.0.1:5000";

/**
 * Get list of all students (Teacher only)
 */
export async function getAllStudents() {
  const response = await fetch(`${API_BASE}/teacher/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch students");
  }

  return result.students;
}

/**
 * Get detailed performance of a specific student
 * @param {string} studentId
 */
export async function getallStudentPerformance() {
  const response = await fetch(
    `${API_BASE}/progress/latest-performances`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let result;
  try {
    result = await response.json();
    
    
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch student performance");
  }

  return result;
}

/**
 * Get overall class analytics (Teacher dashboard)
 */
export async function sentSuggestionapi(data) {
  const response = await fetch(`${API_BASE}/teacher/send-suggestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;
  try {
    result = await response.json();
    console.log(result)
  } catch (err) {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.error || "Registration failed");
  }

  return result;
}