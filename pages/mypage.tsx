import { axiosClient } from "@/axios/AxiosClientProvider";
import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import MeetingCardContainer from "@/components/organisms/MeetingCardContainer";
import MemberCardContainer from "@/components/organisms/MemberCardContainer";
import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

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
  users: User[];
  agendas: Agenda[];
};

type Agenda = {
  id: number;
  agenda: string;
  mtgId: number;
};

const MyPage: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosClient.get("http://localhost:3333/users/me");
      console.log(res.data.name);
    };
  });
  return (
    <Box sx={{ width: 1, height: "100vh" }}>
      <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
        <Typography variant="h5" component="h1" color="text.secondary">
          今後のミーティング
        </Typography>
        <Button size="small" variant="outlined">
          新規ミーティングを設定
        </Button>
      </Box>
      <MeetingCardContainer />
      <Box sx={{ display: "flex", p: 1 }}>
        <Typography
          variant="h5"
          component="h1"
          color="text.secondary"
          sx={{ pb: 1, pt: 3, pr: 1 }}
        >
          チームメンバー
        </Typography>
        <TeamSelectForm />
      </Box>
      <MemberCardContainer />
    </Box>
  );
};

export default MyPage;
