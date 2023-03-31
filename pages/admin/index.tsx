import { axiosClient } from "@/axios/AxiosClientProvider";
import SideMenuList from "@/components/organisms/SideMenuList";
import TeamsList from "@/components/organisms/TeamsList";
import UsersList from "@/components/organisms/UsersList";
import { User } from "@/utils/types";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const SwitchMenu = (props: { menu: string }) => {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axiosClient.get("/users");
      setUsers(res.data);
    };
    getAllUsers();
  }, []);

  switch (props.menu) {
    case "ユーザー":
      return <UsersList users={users} />;
    case "チーム":
      return <TeamsList allUsers={users} />;
    case "ミーティング":
      return <>必要か検討</>;
    default:
      return <></>;
  }
};

export default function AdminHone() {
  const menus = ["ユーザー", "チーム", "ミーティング"];
  const [displayedMenu, setDisplayedMenu] = useState<string>("チーム");
  const handleClickMenu = (menu: string) => {
    setDisplayedMenu(menu);
  };

  return (
    <Box zIndex={1}>
      <SideMenuList menus={menus} onClick={handleClickMenu} />
      <SwitchMenu menu={displayedMenu} />
    </Box>
  );
}