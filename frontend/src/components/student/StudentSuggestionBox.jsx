import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {studentSuggestion} from "../../api/student"
 

/**
 * StudentSuggestionBox
 * - Displays suggestions sent by teachers
 * - Visible only to the logged-in student
 */
export default function StudentSuggestionBox() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
useEffect(() => {
    if (!user?.id) return;
  const loadProgress = async () => {
        try {
          const res = await studentSuggestion(user.id);
          console.log(res);
          // setProgress(data);
          setSuggestions(res)
          setLoading(false)
        } catch (err) {
          setError(err.message);
        }
         
      };
  
      loadProgress();
    }, [user?.id]);

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
          Teacher Suggestions
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Personalized feedback to improve your performance
        </Typography>

        {loading && <CircularProgress size={24} />}

        {!loading && suggestions.length === 0 && (
          <Typography color="text.secondary">
            No suggestions yet. Keep working hard!
          </Typography>
        )}

        {!loading && suggestions.length > 0 && (
          <List>
            {suggestions.map((s, idx) => (
              <React.Fragment key={s.id}>
                <ListItem alignItems="flex-start">
                  <div>
                    <Typography
                      variant="caption"
                      sx={{ mt: 0.5 }}
                    >
                      Suggestion From {s.teacher_name} Sir
                    </Typography>
                    <Typography>{s.message}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {s.created_at}
                    </Typography>
                  </div>
                </ListItem>
                {idx < suggestions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
