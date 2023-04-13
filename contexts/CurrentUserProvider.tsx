import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/utils/types";
import { axiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
import { axiosErrorHandle } from "@/utils/axiosErrorHandle";
import { Button, Dialog } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const CurrentUserContext = createContext<UserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
});

const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { hasToken } = useContext(AxiosClientContext);
  const [error, setError] = useState<string>();
  const { logout } = useAuth0();
  useEffect(() => {
    if (hasToken) {
      fetchCurrentUser();
    }
  }, [hasToken]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axiosClient.get("/users/me");
      if (!res.data) {
        createUser();
      } else {
        setCurrentUser(res.data);
      }
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  const createUser = async () => {
    try {
      await axiosClient.post("/users", { name: "" });
      fetchCurrentUser();
    } catch (error) {
      axiosErrorHandle(error, setError);
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Dialog open={Boolean(error)}>
        {error}
        <Button onClick={() => logout()}>ログアウト</Button>
      </Dialog>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
