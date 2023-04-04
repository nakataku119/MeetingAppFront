import * as React from "react";
import Typography from "@mui/material/Typography";
import { BottomNavigation, Container } from "@mui/material";

export default function AppFooter() {
  return (
    <BottomNavigation
      sx={{
        flexGrow: 1,
        color: "#cff09e",
        backgroundColor: "#3b8686",
        padding: "10px",
      }}
    >
      <Typography
        variant="inherit"
        component="div"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        footer
      </Typography>
    </BottomNavigation>
  );
}
