import { useAuth0 } from "@auth0/auth0-react";
import { Button, Divider, Paper, Typography } from "@mui/material";

export default function LoginOrSingupButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Paper
      elevation={3}
      sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
    >
      <Button
        variant="contained"
        onClick={() => loginWithRedirect()}
        sx={{ width: "100%", padding: "10px" }}
      >
        ログイン
      </Button>
      <Divider>
        <Typography
          variant="body2"
          component="div"
          sx={{ flexGrow: 1, padding: "10px" }}
        >
          または
        </Typography>
      </Divider>
      <Button
        variant="outlined"
        onClick={() =>
          loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })
        }
        sx={{ width: "100%", padding: "10px" }}
      >
        新規登録
      </Button>
    </Paper>
  );
}
