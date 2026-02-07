import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Typography, Stack } from "@mui/material";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Card sx={{ p: 4, borderRadius: 3, minWidth: 320 }}>
        <Typography variant="h5" fontWeight={800} textAlign="center" mb={3}>
          Choose Your Role
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate("/login?role=student")}
          >
            Student Login
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/login?role=teacher")}
          >
            Teacher Login
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
