import { AxiosClient } from "@/axios/AxiosClientProvider";
import { Team, User } from "@/utils/types";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TeamFormDialog from "./TeamFormDialog";
import { axiosErrorHandle } from "utils/axiosErrorHandle";

type Props = {
  allUsers: Array<User>;
};

export default function TeamsList(props: Props) {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [dialogOpenTeam, setDialogOpenTeam] = useState<Team | null>(null);
  const [openNewDialog, setOpenNewDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const axiosClient = new AxiosClient();

  useEffect(() => {
    axiosClient.fetchAllTeams(setTeams, setError);
  }, []);

  const handleDialogCancel = () => {
    setDialogOpenTeam(null);
    setOpenNewDialog(false);
  };

  const handleCreateTeam = async (joinedMembers: Array<User>, name: string) => {
    await axiosClient.createTeam(joinedMembers, name, setError);
    setOpenNewDialog(false);
    axiosClient.fetchAllTeams(setTeams, setError);
  };

  const handleUpdateTeam = async (
    joinedMembers: Array<User>,
    name: string,
    teamId?: number
  ) => {
    await axiosClient.updateTeam(joinedMembers, name, teamId!, setError);
    await axiosClient.fetchAllTeams(setTeams, setError);
    setDialogOpenTeam(null);
  };

  const handleDeleteTeam = async (team: Team) => {
    await axiosClient.deleteTeam(team, setError);
    axiosClient.fetchAllTeams(setTeams, setError);
  };

  return (
    <TableContainer component={Paper}>
      {error && <Alert severity="error">{error}</Alert>}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>チーム名</TableCell>
            <TableCell>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setOpenNewDialog(true)}
              >
                新規作成
              </Button>
              <TeamFormDialog
                team={null}
                allUsers={props.allUsers}
                open={openNewDialog}
                onClickCancel={handleDialogCancel}
                onClickSubmit={handleCreateTeam}
                buttonTitle={"登録"}
              />
            </TableCell>
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
                <TeamFormDialog
                  team={team}
                  allUsers={props.allUsers}
                  open={team.id === dialogOpenTeam?.id}
                  onClickCancel={handleDialogCancel}
                  onClickSubmit={handleUpdateTeam}
                  buttonTitle={"更新"}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Button onClick={() => handleDeleteTeam(team)}>削除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
