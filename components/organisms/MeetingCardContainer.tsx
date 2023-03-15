import { Mtg } from "@/utils/types";
import { Box } from "@mui/material";
import MeetingCard from "./MeetingCard";

export default function MeetingCardContainer(props: { joinedMtgs: Mtg[] }) {
  const { joinedMtgs } = props;
  if (joinedMtgs.length > 0) {
    return (
      <Box sx={{ height: "40%", display: "flex" }}>
        {joinedMtgs.map((item: Mtg, index: number) => (
          <MeetingCard meeting={item} key={index} />
        ))}
      </Box>
    );
  } else {
    return (
      <Box sx={{ height: "40%", display: "flex" }}>
        ミーティングの予定はありません。
      </Box>
    );
  }
}
