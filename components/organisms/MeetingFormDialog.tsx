import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { MeetingData, Mtg, Team, User } from "@/utils/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useContext, useEffect, useState } from "react";
import TeamSelectForm from "../molecules/TeamSelectForm";
import AgendaSelectFrom from "./AgendaSelectForm";
import moment, { min } from "moment";
import "moment-timezone";
import { AxiosClient } from "@/axios/AxiosClientProvider";

type Props = {
  meeting?: Mtg;
  member?: User;
  open: boolean;
  errors: string[];
  onClickCancel: () => void;
  onClickSubmit: (meetingData: MeetingData) => void;
};

export default function MeetingFormDialog(props: Props) {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState<string>();
  const [candidateMembers, setCandidateMembars] = useState<Array<User>>([]);
  const [meetingData, setMeetingData] = useState<MeetingData>({
    id: props.meeting?.id || null,
    startTime: props.meeting?.startTime || null,
    endTime: props.meeting?.endTime || null,
    members:
      props.meeting?.users ||
      (props.member ? [currentUser, props.member] : [currentUser]),
    freeAgenda: props.meeting?.freeAgenda,
    newAgendas: [],
    deletedAgendasId: [],
  } as MeetingData);
  const [checkedAgenda, setCheckedAgenda] = useState<Array<string>>(
    props.meeting?.agendas.map((agenda) => agenda.agenda) || []
  );
  const initialAgendaTitles =
    props.meeting?.agendas.map((agenda) => agenda.agenda) || [];

  const customAxios = new AxiosClient();

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
  const handleChangeText = (name: string) => {
    const allUsers =
      currentUser?.teams?.find((team) => team.name === "全社")?.users || [];
    setCandidateMembars(
      allUsers.filter((member) => member.name.includes(name))
    );
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
  const handleChangeFreeAgenda = (text: string) => {
    setMeetingData(
      Object.assign({}, meetingData, {
        freeAgenda: text,
      })
    );
  };
  const resetState = () => {
    setCheckedAgenda(
      props.meeting?.agendas.map((agenda) => agenda.agenda) || []
    );
    setMeetingData({
      id: props.meeting?.id || null,
      startTime: props.meeting?.startTime || null,
      endTime: props.meeting?.endTime || null,
      members:
        props.meeting?.users ||
        (props.member ? [currentUser!, props.member] : [currentUser!]),
      newAgendas: [],
      deletedAgendasId: [],
    });
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
  const handleSelectTeam = (team: Team) => {
    setMeetingData(
      Object.assign({}, meetingData, { members: [...team.users, currentUser] })
    );
    console.log(team);
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
        {error && <Alert severity="error">{error}</Alert>}
        <label>開始時間</label>
        <TextField
          type={"datetime-local"}
          sx={{ width: "100%" }}
          value={
            meetingData.startTime
              ? moment
                  .tz(new Date(meetingData.startTime), "Asia/Tokyo")
                  .format("YYYY-MM-DDTHH:mm")
              : ""
          }
          onChange={(event) => {
            setMeetingData(
              Object.assign({}, meetingData, {
                startTime: moment
                  .tz(new Date(event.target.value), "Asia/Tokyo")
                  .format("YYYY-MM-DDTHH:mm"),
              })
            );
          }}
        />
        <label>終了時間</label>
        <TextField
          type={"datetime-local"}
          sx={{ width: "100%" }}
          value={
            meetingData.endTime
              ? moment
                  .tz(new Date(meetingData.endTime), "Asia/Tokyo")
                  .format("YYYY-MM-DDTHH:mm")
              : ""
          }
          onChange={(event) => {
            setMeetingData(
              Object.assign({}, meetingData, {
                endTime: moment
                  .tz(new Date(event.target.value), "Asia/Tokyo")
                  .format("YYYY-MM-DDTHH:mm"),
              })
            );
          }}
          inputProps={{ min: meetingData.startTime }}
        />
        <Box
          sx={{ border: 1, borderRadius: 2, height: 100, padding: 0.5, mb: 1 }}
        >
          <Typography component="h1" sx={{ width: "100%", fontSize: 3 }}>
            招待メンバー
          </Typography>
          {meetingData.members.map((user: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={user?.name}
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
        <Typography
          component="h1"
          sx={{ width: "100%", fontSize: 14, textAlign: "center" }}
        >
          メンバーまたはチームを追加してください。
        </Typography>
        <TextField
          id="user-name"
          label="Name"
          variant="filled"
          sx={{ width: "100%", pb: 0 }}
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
        <TeamSelectForm
          belongedTeam={currentUser?.teams}
          onSelectTeam={handleSelectTeam}
        />
        <AgendaSelectFrom
          onChange={handleChangeAgendas}
          checkedAgendas={checkedAgenda}
        />
        <TextField
          id="other-agenda"
          label="その他"
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => handleChangeFreeAgenda(event.target.value)}
          multiline
          maxRows={4}
          value={meetingData.freeAgenda}
        />
        {props.errors.length != 0 &&
          props.errors.map((error, index) => (
            <p key={index}>{`・ ${error}`}</p>
          ))}
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={() => {
            if (meetingData.endTime! <= meetingData.startTime!) {
              return setError("終了時間が不正です。");
            }
            resetState();
            props.onClickSubmit(meetingData);
          }}
          disabled={!meetingData.startTime || !meetingData.endTime}
        >
          登録
        </Button>
        <Button
          onClick={() => {
            resetState();
            props.onClickCancel();
          }}
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
