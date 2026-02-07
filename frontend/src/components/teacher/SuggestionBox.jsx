// frontend/src/components/teacher/SuggestionBox.jsx
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Stack,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {sentSuggestionapi} from "../../api/teacher";

export default function SuggestionBox({
  selectedStudents = [],
  lowPerformingStudents = [],
}) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const sendSuggestion = async () => {
    if (!message || selectedStudents.length === 0) return;

    setSending(true);
    try {
      const res=sentSuggestionapi({
        teacher_id: user?.id,
        student_ids: selectedStudents,
        message:message});
        console.log(res.message);
        alert("Massage sent successfully")
      setMessage("");

    } catch (err) {
      alert("Failed to send suggestion");
    } finally {
      setSending(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
        Send Suggestions to Students
      </Typography>

      <List dense sx={{ maxHeight: 180, overflowY: "auto", mb: 2 }}>
        {lowPerformingStudents.map((s) => (
          <ListItem key={s.student_id}>
            <ListItemText
              primary={s.student_id}
              secondary={`Score: ${s.score} | ${s.performance}`}
            />
            <Checkbox checked={selectedStudents.includes(s.student_id)} disabled />
          </ListItem>
        ))}
      </List>

      <TextField
        label="Suggestion / Advice"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={sendSuggestion}
          disabled={sending || selectedStudents.length === 0 || !message}
        >
          {sending ? "Sending..." : "Send to Selected Students"}
        </Button>
      </Stack>
    </Paper>
  );
}
