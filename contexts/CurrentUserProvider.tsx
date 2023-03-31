import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/utils/types";
import { axiosClient, AxiosClientContext } from "@/axios/AxiosClientProvider";
import { useRouter } from "next/router";
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
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosClient.get("/users/me");
      setCurrentUser(res.data);
    };
    if (hasToken) {
      fetchCurrentUser();
    }
  }, [hasToken]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
