// frontend/src/components/teacher/StudentTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

export default function StudentTable({
  students = [],
  selectedStudents = [],
  onToggleStudent,
}) {
  const getPerformanceColor = (level) => {
    switch (level) {
      case "Excellent":
        return "success";
      case "Good":
        return "primary";
      case "Average":
        return "warning";
      case "Poor":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Student Performance Overview
      </Typography>

      {students.length === 0 ? (
        <Typography color="text.secondary">
          No student data available.
        </Typography>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Student ID</strong></TableCell>
                <TableCell><strong>Student Name</strong></TableCell>
                <TableCell><strong>Last Score</strong></TableCell>
                <TableCell><strong>Performance</strong></TableCell>
                <TableCell><strong>Attendance (%)</strong></TableCell>
                <TableCell><strong>Last Updated</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((s) => (
                <TableRow
                  key={s.student_id}
                  hover
                  selected={selectedStudents.includes(s.student_id)}
                  onClick={() => onToggleStudent(s.student_id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{s.student_id}</TableCell>
                  <TableCell>{s.student_name}</TableCell>
                  <TableCell>{s.score}</TableCell>
                  <TableCell>
                    <Chip
                      label={s.performance}
                      color={getPerformanceColor(s.performance)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{s.attendance ?? "—"}</TableCell>
                  <TableCell>{s.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
