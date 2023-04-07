import LoginOrSingupButton from "@/components/organisms/LoginOrSignupButton";
import { CurrentUserContext } from "@/contexts/CurrentUserProvider";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Home() {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  if (currentUser) {
    router.push("/mypage");
    return null;
  }

  return (
    <>
      <LoginOrSingupButton />
    </>
  );
}
