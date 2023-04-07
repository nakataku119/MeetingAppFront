import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { axiosClient } from "@/axios/AxiosClientProvider";

export default function AppHeader() {
  const { loginWithRedirect, logout } = useAuth0();
  const { currentUser } = React.useContext(CurrentUserContext);

  const handleClickLogout = async () => {
    try {
      await axiosClient.post("/logout");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ color: "#cff09e", backgroundColor: "#3b8686", zIndex: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">LOGO LOGO</Link>
          </Typography>
          {currentUser ? (
            <>
              <p>name: {currentUser.name}</p>
              <Button
                color="inherit"
                onClick={handleClickLogout}
                sx={{ pl: 5 }}
              >
                ログアウト
              </Button>
              {currentUser.admin && (
                <Button color="inherit">
                  <Link href={"/admin"}>管理者画面へ</Link>
                </Button>
              )}
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
