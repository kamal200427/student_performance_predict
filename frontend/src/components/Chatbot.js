// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { Box, Paper, IconButton, TextField, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function Chatbot({ studentId, apiBase = "http://localhost:5000" }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi — I'm your tutor assistant. Ask me anything about your studies!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [botAvatar, setBotAvatar] = useState(null);
  const listRef = useRef();

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // fetch avatar from backend /health
    (async () => {
      try {
        const res = await axios.get(`${apiBase}/health`);
        setBotAvatar(res.data?.bot_avatar || null);
      } catch {
        // ignore
      }
    })();
  }, [apiBase]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${apiBase}/api/chat`, { message: userMsg.text, student_id: studentId });
      const botText = (res.data && (res.data.reply || res.data.response)) || "Sorry, I couldn't generate a reply.";
      setMessages((m) => [...m, { id: Date.now()+1, from: "bot", text: botText }]);
    } catch (err) {
      // network or server error
      const errMsg = err?.response?.data?.reply || "Error: failed to reach server.";
      setMessages((m) => [...m, { id: Date.now()+1, from: "bot", text: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Tutor Chat</Typography>
      <Box sx={{ maxHeight: 360, overflowY: "auto", mb: 1 }}>
        <List>
          {messages.map((m) => (
            <ListItem key={m.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={m.from === "bot" ? botAvatar || "/mnt/data/950f54f9-3774-48b8-b476-6f101956ee6f.png" : undefined}>
                  {m.from === "user" ? "Y" : ""}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={m.from === "bot" ? "Tutor" : "You"} secondary={m.text} />
            </ListItem>
          ))}
          <div ref={listRef} />
        </List>
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Ask a question or paste a problem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          multiline
          maxRows={4}
          size="small"
        />
        <IconButton color="primary" onClick={send} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
}
