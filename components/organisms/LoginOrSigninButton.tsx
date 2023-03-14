import { Button, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function LoginOrSinginButton() {
  return (
    <Container
      sx={{ width: "500px", backgroundColor: "#E9EDC9", padding: "20px" }}
    >
      <Button variant="contained" sx={{ width: "100%" }}>
        ログイン
      </Button>
      <Divider>
        <Typography
          variant="body2"
          component="div"
          sx={{ flexGrow: 1, padding: "10px" }}
        >
          または
        </Typography>
      </Divider>
      <Button variant="outlined" sx={{ width: "100%" }}>
        新規登録
      </Button>
    </Container>
  );
}
