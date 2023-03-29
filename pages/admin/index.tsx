import SideMenuList from "@/components/organisms/SideMenuList";
import UsersList from "@/components/organisms/UsersList";
import { Box } from "@mui/material";

export default function AdminHone() {
  const menus = ["ユーザー", "チーム", "ミーティング"];
  const handleClickMenu = (menu: string) => {
    console.log(menu);
  };

  return (
    <Box zIndex={1}>
      <SideMenuList menus={menus} onClick={handleClickMenu} />
      <UsersList />
    </Box>
  );
}
