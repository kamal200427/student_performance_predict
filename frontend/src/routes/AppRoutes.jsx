// frontend/src/routes/AppRoutes.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import PublicLayout from "../layout/PublicLayout";
import StudentLayout from "../layout/StudentLayout";
import TeacherLayout from "../layout/TeacherLayout";

/* Public Pages */
import LandingPage from "../pages/public/LandingPage";
import RoleSelect from "../pages/public/RoleSelect";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

/* Student Pages */
import StudentDashboard from "../pages/student/StudentDashboard";

/* Teacher Pages */
import TeacherDashboard from "../pages/teacher/TeacherDashboard";

/* Auth */
import ProtectedRoute from "../components/common/ProtectedRoute";
import StudentProfile from "../pages/student/Studentprofile"
 

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-role" element={<RoleSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />
        } />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
        <Route path="/student/dashboard/profile" element={<StudentProfile   />} />
         

        {/* TEACHER ROUTES */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
        <Route path="/teacher/dashboard/profile" element={<StudentProfile  />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}
