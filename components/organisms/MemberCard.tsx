import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import {
  getLastMeetingSchedule,
  getNextMeetingSchedule,
} from "@/utils/functions";
import { User } from "@/utils/types";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { useContext } from "react";

type Prop = {
  member: User;
  onClick: () => void;
};

export default function MemberCard(props: Prop) {
  const { member } = props;
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Paper
      elevation={3}
      sx={{ height: "95%", mr: 1, display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ height: "90%" }}>
        <Box
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          <Avatar sx={{ mr: 3 }}>R</Avatar>
          <Typography
            sx={{ fontSize: 20, ml: 2, height: "100%", margin: "auto 0" }}
            color="text.secondary"
          >
            {member.name}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Next Meeting
        </Typography>
        {/* 簡単に */}
        <Typography variant="body1" component="div">
          {getNextMeetingSchedule(currentUser!, member)}
        </Typography>
        <Typography sx={{ mt: 1, fontSize: 14 }} color="text.secondary">
          Last Meeting
        </Typography>
        <Typography variant="body1" component="div">
          {getLastMeetingSchedule(currentUser!, member)}
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "center", p: 1 }}>
        <Button size="small" variant="outlined" onClick={props.onClick}>
          新規ミーティングを設定
        </Button>
      </Box>
    </Paper>
  );
}
