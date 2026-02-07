// frontend/src/components/student/AttendanceCard.js

 
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";

/**
 * AttendanceCard
 * Shows today's attendance and overall percentage in a visual way
 */
export default function AttendanceCard({
   prop,
  averageprop,value1,value2
}) {
   
  // color logic
  const getColor = (value) => {
    if (value >= 75) return "success";
    if (value <= 60) return "warning";
     
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {value1}
        </Typography>

        {/* Today */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {value1}
          </Typography>
          <Typography variant="h5" fontWeight={800}>
            {prop}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={prop}
            color={getColor(prop)}
            sx={{ height: 8, borderRadius: 5, mt: 1 }}
          />
        </Box>

        {/* Average */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            {value2}
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {averageprop}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={averageprop}
            color={getColor(averageprop)}
            sx={{ height: 6, borderRadius: 5, mt: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

AttendanceCard.propTypes = {
  attendanceToday: PropTypes.number,
  averageAttendance: PropTypes.number,
};
