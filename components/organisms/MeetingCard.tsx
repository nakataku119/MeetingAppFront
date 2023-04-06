import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip, Paper } from "@mui/material";
import { Agenda, Mtg, User } from "@/utils/types";
import { dateFormatter } from "@/utils/functions";

type Props = {
  meeting: Mtg;
  onClickEdit: () => void;
  onClickDelete: () => void;
};

export default function MeetingCard(props: Props) {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "95%",
        mr: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ height: "90%" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          ミーティング予定
        </Typography>
        <Typography variant="h6" component="div">
          {dateFormatter(props.meeting.schedule)}
        </Typography>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          参加メンバー
        </Typography>
        <Box sx={{ border: 1, borderRadius: 2, padding: 0.5 }}>
          {props.meeting.users.map((item: User, index: number) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={item.name}
              sx={{ margin: 0.2 }}
              onDelete={() => {}}
              size="small"
              key={index}
            />
          ))}
        </Box>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          トピック
        </Typography>
        <Box sx={{ height: "30%" }}>
          {props.meeting.agendas.map((item: Agenda, index: number) => (
            <li key={index}>{item.agenda}</li>
          ))}
          {props.meeting.freeAgenda && <li>{props.meeting.freeAgenda}</li>}
        </Box>
      </CardContent>
      <Box sx={{ textAlign: "center" }}>
        <Button size="small" variant="outlined" onClick={props.onClickEdit}>
          詳細・編集
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={props.onClickDelete}
          sx={{ ml: 1 }}
        >
          削除
        </Button>
      </Box>
    </Paper>
  );
}
