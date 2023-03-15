import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip, Paper } from "@mui/material";
import { Agenda, Mtg, User } from "@/utils/types";
import dateFormatter from "@/utils/functions";

export default function MeetingCard(props: { meeting: Mtg }) {
  const { meeting } = props;
  return (
    <Paper
      elevation={3}
      sx={{ width: "30%", minWidth: 275, height: "100%", mr: 1 }}
    >
      <CardContent sx={{ height: "90%" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          ミーティング予定
        </Typography>
        <Typography variant="h6" component="div">
          {dateFormatter(meeting.schedule)}
        </Typography>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          参加メンバー
        </Typography>
        <Box sx={{ border: 1, borderRadius: 2, height: "30%", padding: 0.5 }}>
          {meeting.users.map((item: User) => (
            <Chip
              avatar={<Avatar>F</Avatar>}
              label={item.name}
              sx={{ margin: 0.2 }}
              onDelete={() => {}}
              size="small"
            />
          ))}
        </Box>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          トピック
        </Typography>
        <Box sx={{ height: "30%" }}>
          {meeting.agendas.map((item: Agenda) => (
            <li>{item.agenda}</li>
          ))}
        </Box>
      </CardContent>
      <Box sx={{ textAlign: "center" }}>
        <Button size="small" variant="outlined">
          詳細・編集
        </Button>
      </Box>
    </Paper>
  );
}
