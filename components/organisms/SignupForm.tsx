import { Button, Divider, Paper, TextField, Typography } from "@mui/material";

export default function SignupForm() {
  return (
    <Paper
      elevation={3}
      component="form"
      sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
    >
      <Typography
        variant="h6"
        component="h1"
        sx={{ width: "100%", pb: 3, textAlign: "center" }}
      >
        ユーザー登録
      </Typography>
      <TextField
        required
        id="user-name"
        label="Name"
        variant="filled"
        sx={{ width: "100%", pb: 5 }}
      />
      <Button
        variant="outlined"
        onClick={() => {}}
        sx={{ width: "100%", padding: "10px" }}
      >
        登録
      </Button>
    </Paper>
  );
}
