// frontend/src/components/common/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * ProtectedRoute
 * - Blocks unauthenticated users
 * - Enforces role-based access (student / teacher)
 *
 * @param {ReactNode} children
 * @param {string[]} allowedRoles - ["student"], ["teacher"], or both
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();

  // ⏳ Wait until auth state is resolved
  if (loading) {
    return null; // or <Loader /> if you prefer
  }

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Access granted
  return children;
}
