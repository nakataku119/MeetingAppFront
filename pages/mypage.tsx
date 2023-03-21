import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import MeetingCardContainer from "@/components/organisms/MeetingCardContainer";
import MemberCardContainer from "@/components/organisms/MemberCardContainer";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { getPlanedMeetings } from "@/utils/functions";
import { Team, User } from "@/utils/types";
import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useState } from "react";

const MyPage: NextPage = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const { currentUser } = useContext(CurrentUserContext);

  const handleSelectTeam = (team: Team) => {
    setTeamMembers(team.users);
  };

  if (currentUser) {
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
        <MeetingCardContainer
          joinedMtgs={getPlanedMeetings(currentUser.mtgs)}
        />
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
            belongedTeam={currentUser.teams}
            onSelectTeam={handleSelectTeam}
          />
        </Box>
        <MemberCardContainer members={teamMembers} />
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: 1, height: "100vh" }}>
        <p>waiting...</p>
      </Box>
    );
  }
};

export default MyPage;
