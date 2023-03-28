import { axiosClient } from "@/axios/AxiosClientProvider";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { Agenda, Mtg, Team, User } from "@/utils/types";
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
};

type MeetingData = {
  schedule: Date | null;
  team: Team | null;
  members: Array<User>;
  newAgendas: { agenda: string }[];
  deletedAgendasId: number[];
};

export default function MeetingFormDialog(props: Props) {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const [meetingData, setMeetingData] = useState<MeetingData>({
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
  const handleDialogConfirm = async () => {
    await axiosClient
      .post("/#", {
        data: meetingData,
      })
      .then((res) => router.push("/mypage"))
      .catch((error) => setError("登録できません。"))
      .then(() => {});
  };
  const handleEditConfirm = async () => {
    // const meetingAgendaTitles = props.meeting!.agendas.map(
    //   (item) => item.agenda
    // );
    // const newAgendaTitle = checkedAgenda.filter(
    //   (agenda) => !meetingAgendaTitles.includes(agenda)
    // );
    // const deletedAgendas = props.meeting?.agendas.filter(
    //   (agenda) => !checkedAgenda.includes(agenda.agenda)
    // );
    // // await axiosClient
    //   .put(`/mtgs/${props.meeting?.id}`, {
    //     users: invitedMembers.map((member) => ({ id: member.id })),
    //     schedule: new Date(schedule),
    //     agendas: newAgendaTitle.map((agenda) => ({ agenda: agenda })),
    //     team: selectedTeam!.id,
    //   })
    //   .then((res) => router.push("/mypage"))
    //   .catch((error) => setError("登録できません。"))
    //   .then(() => {
    //     setDialogOpen(false);
    //   });
    // await axiosClient
    //   .delete("/agendas", {
    //     data: {
    //       agendas: deletedAgendas?.map((agenda) => agenda.id),
    //     },
    //   })
    //   .then((res) => router.push("/mypage"))
    //   .catch((error) => setError("登録できません。"))
    //   .then(() => {
    //     setDialogOpen(false);
    //   });
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
                schedule: new Date(event.target.value),
              })
            );
          }}
        />
        <TeamSelectForm
          belongedTeam={currentUser?.teams}
          onSelectTeam={handleSelectTeam}
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
          onClick={handleDialogConfirm}
        >
          登録
        </Button>
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={handleEditConfirm}
        >
          更新
        </Button>
        <DialogActions>
          <Button onClick={props.onClickCancel}>Cancel</Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
