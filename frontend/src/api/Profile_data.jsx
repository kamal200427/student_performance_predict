const API_BASE = "http://127.0.0.1:5000";
export async function getStudentProfile({studentId,role}) {
  if (!studentId || !role) {
    throw new Error("Missing studentId or role");
  }
  const response = await fetch(
    `${API_BASE}/student/profile?student_id=${studentId}&role=${role}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  
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
