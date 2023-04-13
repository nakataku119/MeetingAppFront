import { AxiosClient } from "@/axios/AxiosClientProvider";
import SideMenuList from "@/components/organisms/SideMenuList";
import TeamsList from "@/components/organisms/TeamsList";
import UsersList from "@/components/organisms/UsersList";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { axiosErrorHandle } from "@/utils/axiosErrorHandle";
import { User } from "@/utils/types";
import { Alert, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const SwitchMenu = (props: { menu: string }) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState<string>();
  const axiosClient = new AxiosClient();

  useEffect(() => {
    axiosClient.fetchAllUsers(setUsers, setError);
  }, []);

  const handleDelteUser = async (userId: string) => {
    await axiosClient.deleteUser(userId, setError);
    axiosClient.fetchAllUsers(setUsers, setError);
  };

  switch (props.menu) {
    case "ユーザー":
      return (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          <UsersList users={users} onClickDelete={handleDelteUser} />
        </>
      );
    case "チーム":
      return <TeamsList allUsers={users} />;
    case "ミーティング":
      return <>必要か検討</>;
    default:
      return <></>;
  }
};

export default function AdminHome() {
  const menus = ["ユーザー", "チーム", "ミーティング"];
  const [displayedMenu, setDisplayedMenu] = useState<string>("ユーザー");
  const { currentUser } = useContext(CurrentUserContext);
  const handleClickMenu = (menu: string) => {
    setDisplayedMenu(menu);
  };

  if (!currentUser?.admin) {
    return <>アクセス権限がありません。</>;
  }

  return (
    <Box zIndex={1}>
      <SideMenuList menus={menus} onClick={handleClickMenu} />
      <SwitchMenu menu={displayedMenu} />
    </Box>
  );
}
