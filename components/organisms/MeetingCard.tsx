import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip, Paper } from "@mui/material";

export default function MeetingCard() {
  return (
    <Paper
      elevation={3}
      sx={{ width: "33%", minWidth: 275, height: "40%", margin: 3 }}
    >
      <CardContent sx={{ height: "90%" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          ミーティング予定
        </Typography>
        <Typography variant="h6" component="div">
          2022/11/11 13:00 - 15:00
        </Typography>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          参加メンバー
        </Typography>
        <Box sx={{ border: 1, borderRadius: 2, height: "30%", padding: 0.5 }}>
          <Chip
            avatar={<Avatar>F</Avatar>}
            label="member 1"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            avatar={<Avatar>F</Avatar>}
            label="member 2"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            avatar={<Avatar>F</Avatar>}
            label="member 3"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            avatar={<Avatar>F</Avatar>}
            label="member 4"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            avatar={<Avatar>F</Avatar>}
            label="member 4"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            avatar={<Avatar>F</Avatar>}
            label="member 4"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
        </Box>
        <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
          トピック
        </Typography>
        <Box sx={{ border: 1, borderRadius: 2, height: "30%", padding: 0.5 }}>
          <Chip
            label="memfdasfasdfasdfdasfdsafdsafasfdsafasdfasdfasdber 1"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            label="member 2"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            label="member 3"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
          <Chip
            label="member 4"
            sx={{ margin: 0.2 }}
            onDelete={() => {}}
            size="small"
          />
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
