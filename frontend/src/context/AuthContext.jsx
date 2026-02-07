// frontend/src/context/AuthContext.jsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "student" | "teacher"
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage on app start
  useEffect(() => {
    try {
      const raw = localStorage.getItem("app_auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
        setRole(parsed.role);
      }
    } catch (err) {
      console.error("Failed to parse auth data");
    } finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
  if (user && role) {
    const key =
      role === "student" ? "student_auth" : "teacher_auth";

    localStorage.setItem(
      key,
      JSON.stringify({ user, role })
    );
  }
}, [user, role]);


  /**
   * Login function
   * @param {Object} payload
   * @param {string} payload.id
   * @param {string} payload.name
   * @param {string} payload.role - "student" | "teacher"
   */
  const login = ({ id, name, role }) => {
    setUser({ id, name });
    setRole(role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
