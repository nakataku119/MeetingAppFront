import MeetingCardContainer from "@/components/organisms/MeetingCardContainer";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";

const MyPage: NextPage = () => {
  return (
    <Box sx={{ width: 1, height: "100vh", border: 1 }}>
      <Typography
        variant="h5"
        component="h1"
        color="text.secondary"
        sx={{ pb: 1 }}
      >
        今後のミーティング
      </Typography>
      <MeetingCardContainer />
      <Typography
        variant="h5"
        component="h1"
        color="text.secondary"
        sx={{ pb: 1, pt: 3 }}
      >
        チームメンバー
      </Typography>
    </Box>
  );
};

export default MyPage;
