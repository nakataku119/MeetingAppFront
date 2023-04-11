import { axiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import LoginButtonDialog from "@/components/organisms/LoginButtonDialog";
import MeetingCard from "@/components/organisms/MeetingCard";
import MeetingFormDialog from "@/components/organisms/MeetingFormDialog";
import MemberCard from "@/components/organisms/MemberCard";
import SignupFormDialog from "@/components/organisms/SignupFormDialog";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { axiosErrorHandle } from "@/utils/axiosErrorHandle";
import { getPlanedMeetings } from "@/utils/functions";
import { MeetingData, Mtg, Team, User } from "@/utils/types";
import { Alert, Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";

const MyPage: NextPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editedMeeting, setEditedMeeting] = useState<Mtg | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newMeetingMember, setNewMeetingMember] = useState<User | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { hasToken } = useContext(AxiosClientContext);

  const fetchCurrentUser = async () => {
    try {
      const res = await axiosClient.get("/users/me");
      setCurrentUser(res.data);
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  const handleSignupUser = async (name: string) => {
    const reqDate = {
      name: name,
    };
    try {
      await axiosClient.put("/users", reqDate);
      fetchCurrentUser();
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  const handleCreateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      startTime: meetingData.startTime ? new Date(meetingData.startTime) : null,
      endTime: meetingData.endTime ? new Date(meetingData.endTime) : null,
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
      freeAgenda: meetingData.freeAgenda,
    };
    if (!reqData.startTime || !reqData.endTime || !reqData.teamId) {
      return setError("スケジュールとチーム選択は必須です。");
    }
    try {
      await axiosClient.post("/mtgs", {
        data: reqData,
      });
      setNewMeetingMember(null);
      setIsDialogOpen(false);
      fetchCurrentUser();
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  const handleUpdateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      startTime: new Date(meetingData.startTime!),
      endTime: new Date(meetingData.endTime!),
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
      freeAgenda: meetingData.freeAgenda,
    };
    if (!reqData.startTime || !reqData.endTime || !reqData.teamId) {
      return setError("スケジュールとチーム選択は必須です。");
    }
    try {
      await axiosClient.delete("/agendas", {
        data: {
          agendas: meetingData.deletedAgendasId,
        },
      });
      await axiosClient.put(`/mtgs/${meetingData.id}`, {
        data: reqData,
      });
      setNewMeetingMember(null);
      setIsDialogOpen(false);
      fetchCurrentUser();
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  const handleDeleteMeeting = async (id: number) => {
    try {
      await axiosClient.delete(`/mtgs/${id}`);
      fetchCurrentUser();
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  const MeetingCardList = () => {
    const planedMeetings = getPlanedMeetings(currentUser!.mtgs);
    if (planedMeetings.length == 0) {
      return (
        <Box
          sx={{
            minHeight: 600,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography variant="h5" component="h1" color="text.secondary">
            予定がありません。
          </Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", minHeight: 600 }}>
        {planedMeetings.map((meeting: Mtg, index: number) => {
          return (
            <Box key={index} sx={{ width: 300, height: 500 }}>
              <MeetingCard
                meeting={meeting}
                onClickEdit={() => {
                  setEditedMeeting(meeting);
                }}
                onClickDelete={() => handleDeleteMeeting(meeting.id)}
              />
              <MeetingFormDialog
                onClickSubmit={handleUpdateMeeting}
                onClickCancel={() => {
                  setEditedMeeting(null);
                  setErrors([]);
                }}
                open={meeting == editedMeeting}
                meeting={meeting}
                errors={errors}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  const MemberCardList = () => {
    if (!selectedTeam) {
      return (
        <Box
          sx={{
            minHeight: 600,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography variant="h5" component="h1" color="text.secondary">
            チームを選択してください。
          </Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {selectedTeam?.users.map((item: User, index: number) => (
          <Box key={index} sx={{ pb: 1, width: 300, height: 250 }}>
            <MemberCard
              member={item}
              onClick={() => setNewMeetingMember(item)}
            />
            <MeetingFormDialog
              onClickSubmit={handleCreateMeeting}
              onClickCancel={() => {
                setNewMeetingMember(null);
                setErrors([]);
              }}
              open={item == newMeetingMember}
              member={item}
              team={selectedTeam}
              errors={errors}
            />
          </Box>
        ))}
      </Box>
    );
  };

  if (currentUser) {
    return (
      <Box sx={{ width: 1 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <SignupFormDialog
          open={!currentUser.name}
          onClickConfirm={handleSignupUser}
        />
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
            onClickCancel={() => {
              setIsDialogOpen(false);
              setErrors([]);
            }}
            onClickSubmit={handleCreateMeeting}
            errors={errors}
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
        {!hasToken ? <LoginButtonDialog /> : <p>waiting...</p>}
      </Box>
    );
  }
};

export default MyPage;
