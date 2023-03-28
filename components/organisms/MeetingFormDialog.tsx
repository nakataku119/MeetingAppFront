import { axiosClient } from "@/axios/AxiosClientProvider";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { Agenda, MeetingData, Mtg, Team, User } from "@/utils/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, memo, useContext, useEffect, useState } from "react";
import TeamSelectForm from "../molecules/TeamSelectForm";
import AgendaSelectFrom from "./AgendaSelectForm";

type Props = {
  meeting?: Mtg;
  open: boolean;
  onClickCancel: () => void;
  onClickSubmit: (meetingData: MeetingData) => void;
};

export default function MeetingFormDialog(props: Props) {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const [meetingData, setMeetingData] = useState<MeetingData>({
    id: props.meeting?.id || null,
    schedule: props.meeting?.schedule || null,
    team: props.meeting?.team || null,
    members: props.meeting?.users || [currentUser],
    newAgendas: [],
    deletedAgendasId: [],
  } as MeetingData);
  const [checkedAgenda, setCheckedAgenda] = useState<Array<string>>(
    props.meeting?.agendas.map((agenda) => agenda.agenda) || []
  );
  const initialAgendaTitles =
    props.meeting?.agendas.map((agenda) => agenda.agenda) || [];
  const filterNewAgendas = (agendas: Array<string>) => {
    return agendas
      .filter((agenda) => !initialAgendaTitles.includes(agenda))
      .map((agenda) => ({ agenda: agenda }));
  };
  const filterDeletedAgendasId = (agendas: Array<string>) => {
    return props.meeting?.agendas
      .filter((agenda) => !agendas.includes(agenda.agenda))
      .map((agenda) => agenda.id);
  };
  // ユーザーの入力に対する予測変換
  const [candidateMembers, setCandidateMembars] = useState<Array<User>>([]);
  const [error, setError] = useState<string | null>(null);
  const handleSelectTeam = (team: Team) => {
    setMeetingData(Object.assign({}, meetingData, { team: team }));
  };
  const handleChangeText = (name: string) => {
    if (meetingData.team) {
      setCandidateMembars(
        meetingData.team.users.filter((membar) => membar.name.includes(name))
      );
    }
  };
  const handleSelectUser = (user: User) => {
    if (!meetingData.members.includes(user)) {
      setCandidateMembars([]);
      setMeetingData(
        Object.assign({}, meetingData, {
          members: [...meetingData.members, user],
        })
      );
    }
  };
  const handleChangeAgendas = (agenda: string) => {
    setCheckedAgenda(
      checkedAgenda.includes(agenda)
        ? checkedAgenda.filter((item) => item !== agenda)
        : [...checkedAgenda, agenda]
    );
  };
  useEffect(() => {
    setMeetingData(
      Object.assign({}, meetingData, {
        newAgendas: filterNewAgendas(checkedAgenda),
        deletedAgendasId: filterDeletedAgendasId(checkedAgenda),
      })
    );
  }, [checkedAgenda]);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
          value={
            meetingData.schedule
              ? new Date(meetingData.schedule).toISOString().slice(0, 16)
              : ""
          }
          onChange={(event) => {
            setMeetingData(
              Object.assign({}, meetingData, {
                schedule: new Date(event.target.value)
                  .toISOString()
                  .slice(0, 16),
              })
            );
          }}
        />
        <TeamSelectForm
          belongedTeam={currentUser?.teams}
          onSelectTeam={handleSelectTeam}
          initialValue={props.meeting?.team}
        />
        {!meetingData.team && (
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
          {meetingData.members.map((user: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={user.name}
              sx={{ margin: 0.2 }}
              onDelete={() => {
                setMeetingData(
                  Object.assign({}, meetingData, {
                    members: meetingData.members.filter(
                      (member) => member.id != user.id
                    ),
                  })
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
          disabled={!meetingData.team}
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
          disabled={!meetingData.team}
          checkedAgendas={checkedAgenda}
        />
        {error && <p>{error}</p>}
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={() => props.onClickSubmit(meetingData)}
        >
          登録
        </Button>
        <Button
          onClick={() => props.onClickCancel()}
          variant="outlined"
          color="error"
          sx={{ width: "100%", padding: "10px", mt: 1 }}
        >
          Cancel
        </Button>
      </Paper>
    </Dialog>
  );
}
