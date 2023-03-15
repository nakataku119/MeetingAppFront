import { createContext, useEffect, useState } from "react";
import { User } from "@/utils/types";

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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
