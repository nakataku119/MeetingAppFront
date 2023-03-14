import { Box } from "@mui/material";
import MeetingCard from "./MeetingCard";

export default function MeetingCardContainer() {
  return (
    <Box sx={{ height: "40%", border: 1, display: "flex" }}>
      <MeetingCard />
      <MeetingCard />
      <MeetingCard />
    </Box>
  );
}
