import { axiosClient } from "@/axios/AxiosClientProvider";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { Team, User } from "@/utils/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useRouter } from "next/router";
import { FormEvent, memo, useContext, useState } from "react";
import TeamSelectForm from "../molecules/TeamSelectForm";

export default function SignupForm() {
  const [schedule, setSchedule] = useState<Date>();
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [candidateMembers, setCandidateMembars] = useState<Array<User>>([]);
  const [error, setError] = useState<string | null>(null);
  const [invitedMembers, setInvitedMembers] = useState<Array<User>>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setDialogOpen(true);
  };
  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
  };
  const handleSelectUser = (user: User) => {
    if (!invitedMembers.includes(user)) {
      setInvitedMembers([...invitedMembers, user]);
      setCandidateMembars([]);
    }
  };
  const handleChangeText = (name: string) => {
    if (selectedTeam) {
      setCandidateMembars(
        selectedTeam.users.filter((membar) => membar.name.includes(name))
      );
    }
  };
  const handleDialogCancel = async () => {
    setDialogOpen(false);
  };
  const handleDialogConfirm = async () => {
    await axiosClient
      .post("/mtgs", { users: invitedMembers, schedule: schedule })
      .then((res) => router.push("/mypage"))
      .catch((error) => setError("登録できません。"))
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
          ミーティングの作成
        </Typography>
        <DateTimePicker
          sx={{ width: "100%" }}
          value={schedule}
          onChange={(event) => setSchedule(event!)}
        />
        <TeamSelectForm
          belongedTeam={currentUser?.teams}
          onSelectTeam={handleSelectTeam}
        />
        <Box
          sx={{ border: 1, borderRadius: 2, height: 100, padding: 0.5, mb: 1 }}
        >
          <Typography component="h1" sx={{ width: "100%", fontSize: 3 }}>
            招待メンバー
          </Typography>

          {invitedMembers.map((user: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={user.name}
              sx={{ margin: 0.2 }}
              onDelete={() => {
                setInvitedMembers(
                  invitedMembers.filter((member) => member.id != user.id)
                );
              }}
              size="small"
              key={index}
            />
          ))}
        </Box>
        <TextField
          id="user-name"
          label="Name"
          variant="filled"
          sx={{ width: "100%" }}
          disabled={!selectedTeam}
          onChange={(event) => handleChangeText(event.target.value)}
        />
        {!selectedTeam && (
          <Alert variant="outlined" severity="info" sx={{ mb: 2 }}>
            チームを選択してください。
          </Alert>
        )}
        {candidateMembers?.map((user: User, index: number) => (
          <MenuItem
            key={index}
            value={user.name}
            onClick={() => handleSelectUser(user)}
          >
            {user.name}
          </MenuItem>
        ))}
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
