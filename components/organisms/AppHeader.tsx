import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";

export default function AppHeader() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { currentUser } = React.useContext(CurrentUserContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ color: "#cff09e", backgroundColor: "#3b8686" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">LOGO LOGO</Link>
          </Typography>
          {isAuthenticated ? (
            <>
              <p>name: {currentUser?.name}</p>
              <Button color="inherit" onClick={() => logout()} sx={{ pl: 5 }}>
                ログアウト
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => loginWithRedirect()}>
              ログイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
