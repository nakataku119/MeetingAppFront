import { Box } from "@mui/material";
import MemberCard from "./MemberCard";

export default function MemberCardContainer() {
  return (
    <Box sx={{ height: "50%", display: "flex", flexWrap: "wrap" }}>
      <MemberCard />
      <MemberCard />
      <MemberCard />
      <MemberCard />
      <MemberCard />
      <MemberCard />
    </Box>
  );
}
