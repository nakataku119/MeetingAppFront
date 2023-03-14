import MeetingCardContainer from "@/components/organisms/MeetingCardContainer";
import MemberCardContainer from "@/components/organisms/MemberCardContainer";
import { Box, Button, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";

const MyPage: NextPage = () => {
  return (
    <Box sx={{ width: 1, height: "100vh", border: 1 }}>
      <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
        <Typography variant="h5" component="h1" color="text.secondary">
          今後のミーティング
        </Typography>
        <Button size="small" variant="outlined">
          新規ミーティングを設定
        </Button>
      </Box>
      <MeetingCardContainer />
      <Typography
        variant="h5"
        component="h1"
        color="text.secondary"
        sx={{ pb: 1, pt: 3 }}
      >
        チームメンバー
      </Typography>
      <MemberCardContainer />
    </Box>
  );
};

export default MyPage;
