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

type Props = {
  users: Array<User>;
  onClickDelete: () => void;
};

export default function UsersList(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>名前</TableCell>
            <TableCell>
              {/* Auth0の管理画面へのリンク */}
              <Button
                size="small"
                variant="outlined"
                component="a"
                href="https://google.com"
                target="_blank"
              >
                新規作成
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user) => (
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
                <Button onClick={props.onClickDelete}>削除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
