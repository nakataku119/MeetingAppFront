import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
};
type Props = {
  user: User;
};

const Sample = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<User>(props.user);

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await axios.get("http://localhost:3333/users/me");
      setCurrentUser(res.data);
      console.log(res.data.name);
    };
    getCurrentUser();
  }, []);
  return (
    <>
      <div>samplepage</div>
      <p>{currentUser?.name}</p>
    </>
  );
};

export default Sample;
