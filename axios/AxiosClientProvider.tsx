import axios, { AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://meetingapp-server.tkynkhr.com",
  // baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export class AxiosClient {
  async getAllUsers() {
    try {
      const res = await axiosClient.get("/users");
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}

interface AxiosClientContextProps {
  hasToken: boolean;
}

export const AxiosClientContext = createContext<AxiosClientContextProps>({
  hasToken: false,
});

export function AxiosClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [hasToken, setHasToken] = useState(false);
  // 認証済みの場合にアクセストークンを取得
  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    };
    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);
  // アクセストークンを取得後にリクエストヘッダーに設定
  useEffect(() => {
    if (accessToken) {
      axiosClient.interceptors.request.use((config: any) => {
        config.headers = {
          Authorization: "Bearer " + accessToken,
        };
        return config;
      });
      setHasToken(true);
    }
  }, [accessToken]);

  return (
    <AxiosClientContext.Provider value={{ hasToken }}>
      {children}
    </AxiosClientContext.Provider>
  );
}
