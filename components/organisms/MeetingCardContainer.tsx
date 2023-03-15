import { Mtg } from "@/utils/types";
import { Box } from "@mui/material";
import MeetingCard from "./MeetingCard";

export default function MeetingCardContainer(props: { joinedMtgs: Mtg[] }) {
  const { joinedMtgs } = props;
  return (
    <Box sx={{ height: "40%", display: "flex" }}>
      {joinedMtgs.map((item: Mtg) => (
        <MeetingCard meeting={item} />
      ))}
    </Box>
  );
}
