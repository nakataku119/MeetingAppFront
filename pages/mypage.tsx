import { axiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
import TeamSelectForm from "@/components/molecules/TeamSelectForm";
import LoginButtonDialog from "@/components/organisms/LoginButtonDialog";
import MeetingCard from "@/components/organisms/MeetingCard";
import MeetingFormDialog from "@/components/organisms/MeetingFormDialog";
import MemberCard from "@/components/organisms/MemberCard";
import SignupFormDialog from "@/components/organisms/SignupFormDialog";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { getPlanedMeetings } from "@/utils/functions";
import { MeetingData, Mtg, Team, User } from "@/utils/types";
import { Box, Button, Container, Dialog, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";

const MyPage: NextPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editedMeeting, setEditedMeeting] = useState<Mtg | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newMeetingMember, setNewMeetingMember] = useState<User | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { hasToken } = useContext(AxiosClientContext);

  const fetchCurrentUser = async () => {
    const res = await axiosClient.get("/users/me");
    setCurrentUser(res.data);
  };

  const handleCreateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      schedule: meetingData.schedule ? new Date(meetingData.schedule) : null,
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
    };
    setErrors([]);
    await axiosClient
      .post("/mtgs", {
        data: reqData,
      })
      .then(() => {
        setNewMeetingMember(null);
        setIsDialogOpen(false);
        fetchCurrentUser();
      })
      .catch((error) => {
        if (!reqData.schedule) {
          setErrors((preValue) => [...preValue, "スケジュールは必須です。"]);
        }
        if (!reqData.teamId) {
          setErrors((preValue) => [...preValue, "チームを選択してください。"]);
        }
      });
  };

  const handleUpdateMeeting = async (meetingData: MeetingData) => {
    const reqData = {
      schedule: new Date(meetingData.schedule!),
      teamId: meetingData.team?.id,
      users: meetingData.members.map((member) => ({ id: member.id })),
      agendas: meetingData.newAgendas,
    };

    await axiosClient
      .delete("/agendas", {
        data: {
          agendas: meetingData.deletedAgendasId,
        },
      })
      .catch((error) =>
        setErrors((preValue) => [...preValue, "エラーが発生しました。"])
      );

    await axiosClient
      .put(`/mtgs/${meetingData.id}`, {
        data: reqData,
      })
      .then(() => {
        setNewMeetingMember(null);
        setIsDialogOpen(false);
        fetchCurrentUser();
      })
      .catch((error) => {
        if (!reqData.schedule) {
          setErrors((preValue) => [...preValue, "スケジュールは必須です。"]);
        }
        if (!reqData.teamId) {
          setErrors((preValue) => [...preValue, "チームを選択してください。"]);
        }
      });
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
                onClick={() => {
                  setEditedMeeting(meeting);
                }}
              />
              <MeetingFormDialog
                onClickSubmit={handleUpdateMeeting}
                onClickCancel={() => {
                  setEditedMeeting(null);
                }}
                open={meeting == editedMeeting}
                meeting={meeting}
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
      <Box sx={{ width: 1 }}>
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
