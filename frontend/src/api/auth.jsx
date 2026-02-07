// frontend/src/api/auth.js

const API_BASE = "http://127.0.0.1:5000";

/**
 * LOGIN API
 * @param {Object} data - { email, password, role }
 * @returns {Object} user data + role
 */
export async function login(data) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;
  try {
    result = await response.json();
  } catch (err) {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(result.error || "Login failed");
  }

  // save token (if using JWT)
  if (result.token) {
    localStorage.setItem("token", result.token);
  }

  return {
    user: result.user,
    role: result.role, // "student" or "teacher"
  };
}

/**
 * REGISTER API
 * @param {Object} data - { name, email, password, role }
 */
export async function register(data) {
  const response = await fetch(`${API_BASE}/auth/register`, {
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

/**
 * LOGOUT
 */
export function logout() {
  localStorage.removeItem("token");
}
