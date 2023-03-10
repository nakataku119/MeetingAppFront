import { axiosClient } from "@/axios/AxiosClientProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import React from "react";

const HomePage: NextPage = () => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  // 確認用 Request
  const checkAPIGet = () => {
    console.log("click");
    axiosClient.get("/users");
  };
  const checkAPIPost = () => {
    axiosClient.post("/users", { name: "test test test" });
  };

  return (
    <div>
      <h2>ログイン状態</h2>
      {isAuthenticated ? (
        <>
          <p>ログイン中です</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <p>ログアウト中です</p>
      )}
      <button onClick={() => checkAPIGet()}>api test get</button>
      <button onClick={() => checkAPIPost()}>api test post</button>
    </div>
  );
};

export default HomePage;
