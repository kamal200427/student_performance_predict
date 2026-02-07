// frontend/src/context/UserContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * UserContext
 * - Stores user-related data (profile, stats, preferences)
 * - Does NOT handle authentication (handled by AuthContext)
 */
export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch user profile data
   * @param {string} userId
   */
  const fetchProfile = async (userId) => {
    if (!userId) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/user/profile`, {
        params: { user_id: userId },
      });
      setProfile(res.data.profile);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch user academic stats
   * (attendance avg, performance avg, etc.)
   */
  const fetchStats = async (userId) => {
    if (!userId) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/user/stats`, {
        params: { user_id: userId },
      });
      setStats(res.data.stats);
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear user data on logout
   */
  const clearUserData = () => {
    setProfile(null);
    setStats(null);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        stats,
        loading,
        fetchProfile,
        fetchStats,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};
