import axios, { AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

let accessToken = "";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export function AxiosClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  useEffect(() => {
    const getToken = () => {
      axiosClient.interceptors.request.use(async (config: any) => {
        if (!accessToken) {
          accessToken = await getAccessTokenSilently();
        }
        config.headers = {
          Authorization: "Bearer " + accessToken,
        };
        return config;
      });
    };
    if (isAuthenticated) {
      console.log("axiosclient");
      getToken();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
