import SideMenuList from "@/components/organisms/SideMenuList";
import TeamsList from "@/components/organisms/TeamsList";
import UsersList from "@/components/organisms/UsersList";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const SwitchMenu = (props: { menu: string }) => {
  switch (props.menu) {
    case "ユーザー":
      return <UsersList />;
    case "チーム":
      return <TeamsList />;
    case "ミーティング":
      return <></>;
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
  //   const handleClickButton = () => {
  //     switch (displayedMenu) {
  //       case "ユーザー":
  //         loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
  //         break;
  //       case "チーム":
  //         return <></>;
  //       case "ミーティング":
  //         return <></>;
  //       default:
  //         return <></>;
  //     }
  //   };

  return (
    <Box zIndex={1}>
      <SideMenuList menus={menus} onClick={handleClickMenu} />
      {/* <Button
        size="small"
        variant="outlined"
        onClick={handleClickButton}
        sx={{ mb: 2 }}
      >
        {`${displayedMenu}作成`}
      </Button> */}
      <SwitchMenu menu={displayedMenu} />
    </Box>
  );
}
