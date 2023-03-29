import { Agenda, MeetingData, Mtg, Team, User } from "@/utils/types";
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
import { FormEvent, useState } from "react";

type Props = {
  team: Team;
  allUsers: Array<User>;
  open: boolean;
  onClickCancel: () => void;
  onClickSubmit: (joinedMembers: Array<User>) => void;
};

export default function TeamMembersDialog(props: Props) {
  const [joinedMembers, setJoinedMembers] = useState<Array<User>>(
    props.team.users
  );
  const [candidateUsers, setCandidateUsers] = useState<Array<User>>([]);

  const handleChangeText = (text: string) => {
    setCandidateUsers(
      props.allUsers
        .filter(
          (user) => !joinedMembers.map((member) => member.id).includes(user.id)
        )
        .filter((user) => user.name.includes(text))
    );
  };
  const handleSelectUser = (member: User) => {
    setCandidateUsers([]);
    setJoinedMembers([...joinedMembers, member]);
  };
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
          {`チーム名：${props.team.name}`}
        </Typography>
        <Box
          sx={{ border: 1, borderRadius: 2, height: 100, padding: 0.5, mb: 1 }}
        >
          <Typography component="h1" sx={{ width: "100%", fontSize: 3 }}>
            チームメンバー
          </Typography>
          {joinedMembers.map((user: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={user.name}
              sx={{ margin: 0.2 }}
              onDelete={() => {
                setJoinedMembers((prevValue) =>
                  prevValue.filter((member) => member.id != user.id)
                );
              }}
              size="small"
              key={index}
            />
          ))}
        </Box>
        <TextField
          id="user-name"
          label="追加メンバー"
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => handleChangeText(event.target.value)}
        />
        {candidateUsers.map((user: User, index: number) => (
          <MenuItem
            key={index}
            value={user.name}
            onClick={() => handleSelectUser(user)}
          >
            {user.name}
          </MenuItem>
        ))}
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", padding: "10px" }}
          onClick={() => props.onClickSubmit(joinedMembers)}
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
