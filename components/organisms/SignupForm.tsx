import { axiosClient } from "@/axios/AxiosClientProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name) {
      setError("名前を入力してください");
      return;
    }
    setDialogOpen(true);
  };
  const handleDialogCancel = async () => {
    setDialogOpen(false);
  };
  const handleDialogConfirm = async () => {
    await axiosClient
      .post("/users", { name: name })
      .then((res) => router.push("/mypage"))
      .catch((error) => console.log(error))
      .then(() => {
        setDialogOpen(false);
      });
  };
  return (
    <>
      <Paper
        elevation={3}
        component="form"
        sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
        onSubmit={handleSubmit}
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
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {error && <p>{error}</p>}
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
        >
          登録
        </Button>
      </Paper>

      <Dialog open={dialogOpen}>
        <DialogTitle>登録確認</DialogTitle>
        <DialogContent>
          <p>以下の内容で登録しますか？</p>
          <p>名前：{name}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel} color="secondary">
            キャンセル
          </Button>
          <Button onClick={handleDialogConfirm} color="primary">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
