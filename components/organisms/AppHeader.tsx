import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppHeader() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ color: "#cff09e", backgroundColor: "#3b8686" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">LOGO</Link>
          </Typography>
          <Button color="inherit" onClick={() => loginWithRedirect()}>
            ログイン
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
