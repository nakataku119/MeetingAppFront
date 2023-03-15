import { User } from "@/utils/types";
import { Box } from "@mui/material";
import MemberCard from "./MemberCard";

type Prop = {
  members: User[];
};

export default function MemberCardContainer(props: Prop) {
  const { members } = props;
  return (
    <Box sx={{ height: "50%", display: "flex", flexWrap: "wrap" }}>
      {members.map((item: User, index: number) => (
        <MemberCard key={index} member={item} />
      ))}
    </Box>
  );
}
