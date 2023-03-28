export type User = {
  id: string;
  name: string;
  teams: Team[];
  mtgs: Mtg[];
};

export type Team = {
  id: number;
  name: string;
  users: User[];
};

export type Mtg = {
  id: number;
  schedule: Date;
  team: Team;
  agendas: Agenda[];
  users: User[];
};

export type Agenda = {
  id: number;
  agenda: string;
  mtgId: number;
};

export type MeetingData = {
  schedule: Date | null;
  team: Team | null;
  members: Array<User>;
  newAgendas: { agenda: string }[];
  deletedAgendasId: number[];
};
