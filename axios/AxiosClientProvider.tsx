import axios, { AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

export function AxiosClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      axiosClient.interceptors.request.use((config: any) => {
        config.headers = {
          Authorization: "Bearer " + accessToken,
        };
        return config;
      });
    };
    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
