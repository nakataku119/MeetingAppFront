import { axiosClient } from "@/axios/AxiosClientProvider";
import { User } from "@/utils/types";
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
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axiosClient.get("/users");
      setUsers(res.data);
    };
    getAllUsers();
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>名前</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell component="th" scope="row">
                <Button>削除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
