import {
  Avatar,
  Box,
  Button,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";

export default function MemberCard() {
  return (
    <Paper
      elevation={3}
      sx={{ width: "30%", minWidth: 275, height: "45%", mr: 1 }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          <Avatar sx={{ mr: 3 }}>R</Avatar>
          <Typography
            sx={{ fontSize: 20, ml: 2, height: "100%", margin: "auto 0" }}
            color="text.secondary"
          >
            Member Member
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Next Meeting
        </Typography>
        <Typography variant="body1" component="div">
          2022/11/11 13:00 - 15:00
        </Typography>
        <Typography sx={{ mt: 1, fontSize: 14 }} color="text.secondary">
          Last Meeting
        </Typography>
        <Typography variant="body1" component="div">
          2022/11/11 13:00 - 15:00
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "center" }}>
        <Button size="small" variant="outlined">
          新規ミーティングを設定
        </Button>
      </Box>
    </Paper>
  );
}
