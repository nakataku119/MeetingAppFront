import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

type Props = {
  menus: Array<string>;
  onClick: (menu: string) => void;
};

export default function SideMenuList(props: Props) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        zIndex: 1,
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {props.menus.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => props.onClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
