import { Box } from "@mui/material";
import MemberCard from "./MemberCard";

export default function MemberCardContainer() {
  return (
    <Box sx={{ height: "50%", border: 1, display: "flex" }}>
      <MemberCard />
      <MemberCard />
      <MemberCard />
    </Box>
  );
}
