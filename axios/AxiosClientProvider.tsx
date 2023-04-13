import axios, { AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { axiosErrorHandle } from "@/utils/axiosErrorHandle";
import { MeetingData, User, Team } from "@/utils/types";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://meetingapp-server.tkynkhr.com",
  // baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export class AxiosClient {
  async fetchAllUsers(
    setUsers: (value: any) => void,
    setError: (value: any) => void
  ) {
    axiosClient
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((error) => axiosErrorHandle(error, setError));
  }

  async fetchCurrentUser(
    setState: (value: any) => void,
    setError: (value: any) => void
  ) {
    try {
      const res = await axiosClient.get("/users/me");
      if (!res.data) {
        this.createUser(setState, setError);
      } else {
        setState(res.data);
      }
    } catch (error) {
      console.error(error);
      axiosErrorHandle(error, setError);
    }
  }

  async createUser(
    setState: (value: any) => void,
    setError: (value: any) => void
  ) {
    await axiosClient.post("/users", { name: "" });
    this.fetchCurrentUser(setState, setError);
  }

  async updateUser(name: string, setError: (value: any) => void) {
    await axiosClient
      .put("/users", { name: name })
      .catch((error) => axiosErrorHandle(error, setError));
  }

  async deleteUser(userId: string, setError: (value: any) => void) {
    try {
      return await axiosClient.delete(`/admin/users/${userId}`);
    } catch (error) {
      return axiosErrorHandle(error, setError);
    }
  }

  async createMeeting(data: MeetingData, setError: (value: any) => void) {
    const reqData = {
      startTime: data.startTime ? new Date(data.startTime) : null,
      endTime: data.endTime ? new Date(data.endTime) : null,
      users: data.members.map((member) => ({ id: member.id })),
      agendas: data.newAgendas,
      freeAgenda: data.freeAgenda,
    };
    if (!reqData.startTime || !reqData.endTime) {
      return setError("スケジュールとチーム選択は必須です。");
    }
    await axiosClient
      .post("/mtgs", {
        data: reqData,
      })
      .catch((error) => axiosErrorHandle(error, setError));
  }

  async updateMeeting(data: MeetingData, setError: (value: any) => void) {
    const reqData = {
      startTime: new Date(data.startTime!),
      endTime: new Date(data.endTime!),
      users: data.members.map((member) => ({ id: member.id })),
      agendas: data.newAgendas,
      freeAgenda: data.freeAgenda,
    };
    if (!reqData.startTime || !reqData.endTime) {
      return setError("スケジュールとチーム選択は必須です。");
    }
    try {
      await axiosClient.delete("/agendas", {
        data: {
          agendas: data.deletedAgendasId,
        },
      });
      await axiosClient.put(`/mtgs/${data.id}`, {
        data: reqData,
      });
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  }

  deleteMeeting(id: number, setError: (value: any) => void) {
    axiosClient
      .delete(`/mtgs/${id}`)
      .catch((error) => axiosErrorHandle(error, setError));
  }

  fetchAllTeams(
    setTeams: (value: any) => void,
    setError: (value: any) => void
  ) {
    axiosClient
      .get("/admin/teams")
      .then((res) => setTeams(res.data))
      .catch((error) => axiosErrorHandle(error, setError));
  }

  createTeam(
    joinedMembers: Array<User>,
    name: string,
    setError: (value: any) => void
  ) {
    const reqData = {
      name: name,
      members: joinedMembers.map((member) => ({ id: member.id })),
    };
    if (!reqData.name) {
      return;
    }
    axiosClient
      .post("/admin/teams", {
        data: reqData,
      })
      .catch((error) => axiosErrorHandle(error, setError));
  }

  updateTeam(
    joinedMembers: Array<User>,
    name: string,
    teamId: number,
    setError: (value: any) => void
  ) {
    const reqData = {
      name: name,
      members: joinedMembers.map((member) => ({ id: member.id })),
    };
    return axiosClient
      .put(`/admin/teams/${teamId!}`, {
        data: reqData,
      })
      .catch((error) => axiosErrorHandle(error, setError));
  }

  async deleteTeam(team: Team, setError: (value: any) => void) {
    try {
      return await axiosClient.delete(`/admin/teams/${team.id}`);
    } catch (error) {
      return axiosErrorHandle(error, setError);
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
