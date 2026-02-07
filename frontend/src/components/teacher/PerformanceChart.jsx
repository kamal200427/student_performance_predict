import { useEffect, useState } from "react";
  
import axios from "axios"; import { LineChart, 
  Line, 
  XAxis,
   YAxis, 
   Tooltip,
    CartesianGrid, 
    ResponsiveContainer, 
    BarChart, 
    Bar, } from "recharts"; 
import { Box, 
  Typography, 
  CircularProgress,
   Paper } from "@mui/material";
export default function PerformanceChart({ result }) {
  const [trend, setTrend] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Hook is ALWAYS called
  useEffect(() => {
    if (!result) {
      setTrend([]);
      setDistribution([]);
      return;
    }

    setLoading(true);

    try {
      setTrend(result.trend || []);
       
    } catch (err) {
      console.error("Failed to load performance analytics", err);
    } finally {
      setLoading(false);
    }
  }, [result]);

  // ✅ Conditional rendering AFTER hooks
  if (!result) {
    return (
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography color="text.secondary">
          No performance analytics available yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
        Class Performance Analytics
      </Typography>

      {loading && <CircularProgress />}

      {trend.length > 0 && (
        <Box sx={{ height: 340, mb: 5 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line dataKey="avg_score" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}

    </Paper>
  );
}
