import { Team, User } from "@/utils/types";
import {
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
  team?: Team | null;
  allUsers: Array<User>;
  open: boolean;
  buttonTitle: string;
  onClickCancel: () => void;
  onClickSubmit: (
    joinedMembers: Array<User>,
    teamName: string,
    teamId?: number
  ) => void;
};

export default function TeamFormDialog(props: Props) {
  const [joinedMembers, setJoinedMembers] = useState<Array<User>>(
    props.team?.users || []
  );
  const [candidateUsers, setCandidateUsers] = useState<Array<User>>([]);
  const [teamName, setTeamName] = useState<string>(props.team?.name || "");

  const handleChangeMemberText = (text: string) => {
    setCandidateUsers(
      props.allUsers
        .filter(
          (user) => !joinedMembers.map((member) => member.id).includes(user.id)
        )
        .filter((user) => user.name.includes(text))
    );
  };
  const handleChangeTeamText = (text: string) => {
    setTeamName(text);
  };
  const handleSelectUser = (member: User) => {
    setCandidateUsers([]);
    setJoinedMembers([...joinedMembers, member]);
  };
  const resetState = () => {
    setJoinedMembers(props.team?.users || []);
    setCandidateUsers([]);
    setTeamName(props.team?.name || "");
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
        <TextField
          id="team-name"
          label="チーム名"
          value={teamName}
          variant="filled"
          sx={{ width: "100%", pb: 1 }}
          onChange={(event) => handleChangeTeamText(event.target.value)}
          required
        />
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
          onChange={(event) => handleChangeMemberText(event.target.value)}
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
          onClick={() => {
            resetState();
            props.onClickSubmit(joinedMembers, teamName, props.team?.id);
          }}
          disabled={!teamName}
        >
          {props.buttonTitle}
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
