import { axiosClient } from "@/axios/AxiosClientProvider";
import { Team, User } from "@/utils/types";
import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TeamMembersDialog from "./TeamMembersDialog";

type Props = {
  allUsers: Array<User>;
};

export default function TeamsList(props: Props) {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [dialogOpenTeam, setDialogOpenTeam] = useState<Team | null>(null);

  const handleDialogCancel = () => {
    setDialogOpenTeam(null);
  };
  const handleDialogSubmit = async (
    joinedMembers: Array<User>,
    teamId: number
  ) => {
    const reqData = {
      members: joinedMembers.map((member) => ({ id: member.id })),
    };
    await axiosClient.put(`/teams/${teamId}`, {
      data: reqData,
    });
  };

  useEffect(() => {
    const getAllTeams = async () => {
      const res = await axiosClient.get("/teams");
      setTeams(res.data);
    };
    getAllTeams();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>チーム名</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow
              key={team.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {team.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {team.name}
              </TableCell>
              <TableCell component="th" scope="row">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setDialogOpenTeam(team)}
                >
                  メンバー
                </Button>
                <TeamMembersDialog
                  team={team}
                  allUsers={props.allUsers}
                  open={team.id === dialogOpenTeam?.id}
                  onClickCancel={handleDialogCancel}
                  onClickSubmit={handleDialogSubmit}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
