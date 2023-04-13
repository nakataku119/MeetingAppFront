export type User = {
  id: string;
  name: string;
  admin: boolean;
  teams?: Team[];
  mtgs?: Mtg[];
};

export type Team = {
  id: number;
  name: string;
  users: User[];
};

export type Mtg = {
  id: number;
  startTime: Date;
  endTime: Date;
  agendas: Agenda[];
  freeAgenda?: string;
  users: User[];
};

export type Agenda = {
  id: number;
  agenda: string;
  mtgId: number;
};

export type MeetingData = {
  id: number | null;
  startTime: Date | null;
  endTime: Date | null;
  freeAgenda?: string;
  members: Array<User>;
  newAgendas: { agenda: string }[];
  deletedAgendasId: number[];
};
