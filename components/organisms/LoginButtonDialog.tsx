import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dialog, Paper, Typography } from "@mui/material";

export default function LoginButtonDialog() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Dialog open>
      <Paper
        elevation={3}
        sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, padding: "10px", textAlign: "center" }}
        >
          ログインが必要です
        </Typography>
        <Button
          variant="contained"
          onClick={() => loginWithRedirect()}
          sx={{ width: "100%", padding: "10px" }}
        >
          ログイン
        </Button>
      </Paper>
    </Dialog>
  );
}
