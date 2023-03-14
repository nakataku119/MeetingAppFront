import { axiosClient } from "@/axios/AxiosClientProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container } from "@mui/material";
import { NextPage } from "next";
import React from "react";

const MyPage: NextPage = () => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  return (
    <Box sx={{ width: 1, height: "100vh", border: 1 }}>
      <p>mypage</p>
    </Box>
  );
};

export default MyPage;
