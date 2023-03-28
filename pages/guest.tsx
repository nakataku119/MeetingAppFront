import { axiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import MeetingCard from "@/components/organisms/MeetingCard";
import MeetingCardContainer from "@/components/organisms/MeetingCardContainer";
import MeetingFormDialog from "@/components/organisms/MeetingFormDialog";
import MemberCardContainer from "@/components/organisms/MemberCardContainer";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { getPlanedMeetings } from "@/utils/functions";
import { MeetingData, Mtg, Team, User } from "@/utils/types";
import { Box, Button, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";

const GuestPage: NextPage = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState<boolean>(false);
  const handleSelectTeam = (team: Team) => {
    setTeamMembers(team.users);
  };
  const handleCreateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      schedule: new Date(meetingData.schedule!),
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
    };
    await axiosClient.post("/mtgs", {
      data: reqData,
    });
    // .then((res) => router.push("/mypage"))
    // .catch((error) => setError("登録できません。"))
    // .then(() => {});
  };
  const handleUpdateMeeting = (meetingDate: MeetingData) => {
    console.log(meetingDate.schedule);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosClient.get("/users/guest");
      setCurrentUser(res.data);
    };
    fetchCurrentUser();
  }, []);

  const MeetingCardList = () => {
    const planedMeetings = getPlanedMeetings(currentUser!.mtgs);
    return (
      <Box sx={{ height: "40%", display: "flex" }}>
        {planedMeetings.map((item: Mtg, index: number) => {
          return (
            <MeetingCard
              meeting={item}
              key={index}
              onClickDialogSubmit={handleUpdateMeeting}
            />
          );
        })}
      </Box>
    );
  };

  if (currentUser) {
    return (
      <Box sx={{ width: 1, height: "100vh" }}>
        <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
          <Typography variant="h5" component="h1" color="text.secondary">
            今後のミーティング
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setIsNewDialogOpen(true)}
          >
            新規ミーティングを設定
          </Button>
          <MeetingFormDialog
            open={isNewDialogOpen}
            onClickCancel={() => setIsNewDialogOpen(false)}
            onClickSubmit={handleCreateMeeting}
          />
        </Box>
        <MeetingCardList />
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

export default GuestPage;
