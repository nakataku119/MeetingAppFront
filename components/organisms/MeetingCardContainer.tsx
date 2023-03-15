import { Box } from "@mui/material";
import MeetingCard from "./MeetingCard";

type User = {
  name: string;
  teams: Team[];
  mtgs: Mtg[];
};

type Team = {
  id: number;
  name: string;
  users: User[];
};

type Mtg = {
  id: number;
  schedule: Date;
  agendas: Agenda[];
  users: User[];
};

type Agenda = {
  id: number;
  agenda: string;
  mtgId: number;
};

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
