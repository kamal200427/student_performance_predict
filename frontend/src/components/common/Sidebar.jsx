// frontend/src/components/common/Sidebar.js
import { ListItemButton } from "@mui/material";
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

/**
 * Sidebar component
 * @param {string} role - "student" | "teacher"
 */
export default function Sidebar({ role }) {
  const navigate = useNavigate();

  // Student menu
  const studentMenu = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/student",
    },
    {
      text: " MyProfile",
      icon: <SchoolIcon />,
      path: "/student/dashboard/profile",
    },
  ];

  // Teacher menu
  const teacherMenu = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/teacher",
    },
    {
      text: "Profile",
      icon: <PeopleIcon />,
      path: "/teacher/dashboard/profile",
    },
  ];

  const menuItems = role === "teacher" ? teacherMenu : studentMenu;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Divider />

      <List>
  {menuItems.map((item) => (
    <ListItemButton
      key={item.text}
      onClick={() => navigate(item.path)}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItemButton>
  ))}
  </List>

    </Drawer>
  );
}
