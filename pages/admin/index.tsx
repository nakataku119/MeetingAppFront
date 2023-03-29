import SideMenuList from "@/components/organisms/SideMenuList";

export default function AdminHone() {
  const menus = ["ユーザー", "チーム", "ミーティング"];
  const handleClickMenu = (menu: string) => {
    console.log(menu);
  };

  return <SideMenuList menus={menus} onClick={handleClickMenu} />;
}
