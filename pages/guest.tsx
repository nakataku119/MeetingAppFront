import { axiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import MeetingCard from "@/components/organisms/MeetingCard";
import MeetingFormDialog from "@/components/organisms/MeetingFormDialog";
import MemberCard from "@/components/organisms/MemberCard";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { getPlanedMeetings } from "@/utils/functions";
import { MeetingData, Mtg, Team, User } from "@/utils/types";
import { Box, Button, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";

const GuestPage: NextPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newMeetingMember, setNewMeetingMember] = useState<User | null>(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const fetchCurrentUser = async () => {
    const res = await axiosClient.get("/users/guest");
    setCurrentUser(res.data);
  };

  const handleCreateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      schedule: new Date(meetingData.schedule!),
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
    };
    await axiosClient
      .post("/mtgs", {
        data: reqData,
      })
      .catch((error) => {})
      .then(() => {
        setNewMeetingMember(null);
        setIsDialogOpen(false);
        fetchCurrentUser();
      });
  };
  const handleUpdateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      schedule: new Date(meetingData.schedule!),
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
    };
    await axiosClient.put(`/mtgs/${meetingData.id}`, {
      data: reqData,
    });
    // .then((res) => router.push("/mypage"))
    // .catch((error) => setError("登録できません。"))
    // .then(() => {
    //   setDialogOpen(false);
    // });
    await axiosClient.delete("/agendas", {
      data: {
        agendas: meetingData.deletedAgendasId,
      },
    });
    // .then((res) => router.push("/mypage"))
    // .catch((error) => setError("登録できません。"))
    // .then(() => {
    //   setDialogOpen(false);
    // });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const MeetingCardList = () => {
    const planedMeetings = getPlanedMeetings(currentUser!.mtgs);
    return (
      <Box sx={{ height: "40%", display: "flex" }}>
        {planedMeetings.map((meeting: Mtg, index: number) => {
          return (
            <MeetingCard
              meeting={meeting}
              key={index}
              onClickDialogSubmit={handleUpdateMeeting}
            />
          );
        })}
      </Box>
    );
  };

  const MemberCardList = () => {
    return (
      <Box sx={{ height: "50%", display: "flex", flexWrap: "wrap" }}>
        {selectedTeam?.users.map((item: User, index: number) => (
          <Box key={index} sx={{ pb: 1 }}>
            <MemberCard
              member={item}
              onClick={() => setNewMeetingMember(item)}
            />
            <MeetingFormDialog
              onClickSubmit={handleCreateMeeting}
              onClickCancel={() => setNewMeetingMember(null)}
              open={item == newMeetingMember}
              member={item}
              team={selectedTeam}
            />
          </Box>
        ))}
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
            onClick={() => setIsDialogOpen(true)}
          >
            新規ミーティングを設定
          </Button>
          <MeetingFormDialog
            open={isDialogOpen}
            onClickCancel={() => setIsDialogOpen(false)}
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
            onSelectTeam={(team: Team) => setSelectedTeam(team)}
          />
        </Box>
        <MemberCardList />
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
