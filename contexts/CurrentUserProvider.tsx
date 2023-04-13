import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/utils/types";
import { AxiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
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
  const axiosClient = new AxiosClient();

  useEffect(() => {
    if (hasToken) {
      axiosClient.fetchCurrentUser(setCurrentUser, setError);
    }
  }, [hasToken]);

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
