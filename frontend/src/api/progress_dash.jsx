// frontend/src/api/progress.js

 

const API_BASE = "http://127.0.0.1:5000";

/**
 * Get daily progress entries for a student
 * @param {string} studentId
 * @returns {Array} list of daily records
 */
export async function getStudentProgress(studentId) {
  const response = await fetch(
    `${API_BASE}/student/overview?student_id=${studentId}`,
    // http://127.0.0.1:5000/student/overview
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
  } catch (err) {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch progress");
  }

  return result; // array of progress records
}

/**
 * Get aggregated progress summary for a student
 * @param {string} studentId
 * @returns {Object} summary stats
 */
export async function getStudentSummary(studentId) {
  const response = await fetch(
    `${API_BASE}/progress/summary?student_id=${studentId}`,
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
  } catch (err) {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch summary");
  }

  return result;
}

/**
 * Teacher: Get progress of a specific student
 * @param {string} studentId
 */
export async function getProgressByStudentId(studentId) {
  return getStudentProgress(studentId);
}
