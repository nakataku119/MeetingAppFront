import { axiosClient } from "@/axios/AxiosClientProvider";
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
import { AxiosError } from "axios";

type Props = {
  allUsers: Array<User>;
  onClickDelete: (teamId: number) => void;
};

export default function TeamsList(props: Props) {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [dialogOpenTeam, setDialogOpenTeam] = useState<Team | null>(null);
  const [openNewDialog, setOpenNewDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchAllTeams();
  }, []);

  const fetchAllTeams = async () => {
    try {
      const res = await axiosClient.get("/admin/teams");
      setTeams(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log((axiosError.response.data as { error: string }).error);
        setError(
          `エラーが発生しました。画面を更新してください。 ${
            (axiosError.response.data as { error: string }).error
          }`
        );
      } else {
        console.log("サーバーエラーが発生しました。");
        setError("サーバーエラーが発生しました。");
      }
    }
  };
  const handleDialogCancel = () => {
    setDialogOpenTeam(null);
    setOpenNewDialog(false);
  };
  const handleCreateTeam = async (joinedMembers: Array<User>, name: string) => {
    const reqData = {
      name: name,
      members: joinedMembers.map((member) => ({ id: member.id })),
    };
    if (!reqData.name) {
      return;
    }
    await axiosClient
      .post("/admin/teams", {
        data: reqData,
      })
      .then(() => {
        setOpenNewDialog(false);
        fetchAllTeams();
      })
      .catch((error) => {
        console.log("チーム登録時のエラー発生");
      });
  };
  const handleUpdateTeam = async (
    joinedMembers: Array<User>,
    name: string,
    teamId?: number
  ) => {
    const reqData = {
      name: name,
      members: joinedMembers.map((member) => ({ id: member.id })),
    };
    await axiosClient
      .put(`/admin/teams/${teamId!}`, {
        data: reqData,
      })
      .catch((error) => {})
      .then(() => {
        setDialogOpenTeam(null);
        fetchAllTeams();
      });
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
                <Button
                  onClick={() => {
                    props.onClickDelete(team.id);
                  }}
                >
                  削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
