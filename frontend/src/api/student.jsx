const API_BASE = "http://127.0.0.1:5000";
export async function studentSuggestion(studentId) {
  const response = await fetch(
    `${API_BASE}/student/suggestion?student_id=${studentId}`,
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