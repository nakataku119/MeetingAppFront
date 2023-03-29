import LoginOrSingupButton from "@/components/organisms/LoginOrSignupButton";
import { Link } from "@mui/material";

export default function Home() {
  return (
    <>
      <Link href="/guest" sx={{ mb: 3 }}>
        ゲストログイン
      </Link>
      <LoginOrSingupButton />
    </>
  );
}
