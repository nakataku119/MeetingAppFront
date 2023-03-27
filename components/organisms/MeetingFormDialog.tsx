import { axiosClient } from "@/axios/AxiosClientProvider";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { Agenda, Mtg, Team, User } from "@/utils/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, memo, useContext, useState } from "react";
import TeamSelectForm from "../molecules/TeamSelectForm";
import AgendaSelectFrom from "./AgendaSelectForm";

type Props = {
  meeting?: Mtg;
  open: boolean;
  onClickCancel: () => void;
};

export default function MeetingFormDialog(props: Props) {
  const [meeting, setMeeting] = useState<Mtg | null>(props.meeting || null);
  const [schedule, setSchedule] = useState<string>(
    String(props.meeting?.schedule).slice(0, 16) || ""
  );
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(
    props.meeting?.team || null
  );
  const [candidateMembers, setCandidateMembars] = useState<Array<User>>([]);
  const [checkedAgenda, setCheckedAgenda] = useState<Array<string>>(
    props.meeting?.agendas.map((agenda) => agenda.agenda) || []
  );
  const [error, setError] = useState<string | null>(null);
  const [invitedMembers, setInvitedMembers] = useState<Array<User>>(
    props.meeting?.users || []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const handleChangeAgendas = (agenda: string) => {
    if (!checkedAgenda.includes(agenda)) {
      setCheckedAgenda([...checkedAgenda, agenda]);
    } else {
      setCheckedAgenda(checkedAgenda.filter((item) => item === agenda));
    }
  };
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
      .post("/mtgs", {
        users: invitedMembers.map((member) => ({ id: member.id })),
        schedule: new Date(schedule),
        agendas: checkedAgenda.map((agenda) => ({ agenda: agenda })),
        team: selectedTeam!.id,
      })
      .then((res) => router.push("/mypage"))
      .catch((error) => setError("登録できません。"))
      .then(() => {
        setDialogOpen(false);
      });
  };
  return (
    <Dialog open={props.open}>
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
        <TextField
          type={"datetime-local"}
          sx={{ width: "100%" }}
          value={schedule}
          onChange={(event) => {
            setSchedule(event.target.value);
          }}
        />
        <TeamSelectForm
          belongedTeam={currentUser?.teams}
          onSelectTeam={handleSelectTeam}
        />
        {!selectedTeam && (
          <Alert variant="outlined" severity="info" sx={{ mb: 2 }}>
            チームを選択してください。
          </Alert>
        )}
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
          sx={{ width: "100%", pb: 1 }}
          disabled={!selectedTeam}
          onChange={(event) => handleChangeText(event.target.value)}
        />
        {candidateMembers?.map((user: User, index: number) => (
          <MenuItem
            key={index}
            value={user.name}
            onClick={() => handleSelectUser(user)}
          >
            {user.name}
          </MenuItem>
        ))}
        <AgendaSelectFrom
          onChange={handleChangeAgendas}
          disabled={!selectedTeam}
        />
        {error && <p>{error}</p>}
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={handleDialogConfirm}
        >
          登録
        </Button>
        <DialogActions>
          <Button onClick={props.onClickCancel}>Cancel</Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
