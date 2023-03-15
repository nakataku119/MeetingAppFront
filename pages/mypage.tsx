import { axiosClient } from "@/axios/AxiosClientProvider";
import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import MeetingCardContainer from "@/components/organisms/MeetingCardContainer";
import MemberCardContainer from "@/components/organisms/MemberCardContainer";
import { Team, User } from "@/utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const MyPage: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [teamMembers, setTeamMembers] = useState<User[]>();
  const { isAuthenticated } = useAuth0();

  const handleSelectTeam = (team: Team) => {
    setTeamMembers(team.users);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosClient.get("http://localhost:3333/users/me");
      setCurrentUser(res.data);
    };
    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, [isAuthenticated]);
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
      {currentUser?.mtgs ? (
        <MeetingCardContainer joinedMtgs={currentUser?.mtgs} />
      ) : (
        <p>予定はありません。</p>
      )}
      <Box sx={{ display: "flex", p: 1 }}>
        <Typography
          variant="h5"
          component="h1"
          color="text.secondary"
          sx={{ pb: 1, pt: 3, pr: 1 }}
        >
          チームメンバー
        </Typography>
        <TeamSelectForm
          belongedTeam={currentUser?.teams}
          onSelectTeam={handleSelectTeam}
        />
      </Box>
      <MemberCardContainer members={teamMembers} />
    </Box>
  );
};

export default MyPage;
