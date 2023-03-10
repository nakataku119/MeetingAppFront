import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { NextPage } from "next";
import React, { useEffect } from "react";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

const HomePage: NextPage = () => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  // Auth0の認証後にAxiosのリクエストヘッダーにtokenを設定
  useEffect(() => {
    const setTokenToAxios = async () => {
      const accessToken = await getAccessTokenSilently({});
      // confitのタイプ要確認
      axiosClient.interceptors.request.use((config: any) => {
        config.headers = {
          Authorization: "Bearer " + accessToken,
        };
        return config;
      });
    };
    setTokenToAxios();
  }, []);
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
        <p>ログアウトしています</p>
      )}
      <button onClick={() => checkAPIGet()}>api test get</button>
      <button onClick={() => checkAPIPost()}>api test post</button>
    </div>
  );
};

export default HomePage;
