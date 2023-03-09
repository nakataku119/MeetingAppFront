import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect } from "react";

const HomePage: NextPage = () => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently({});
      console.log(accessToken);
    };
    getToken();
  }, []);

  const checkAPI = async () => {
    console.log("click");
    const accessToken = await getAccessTokenSilently({});
    axios.get("http://localhost:3333/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div>
      <h2>ログイン状態</h2>
      {isAuthenticated ? (
        <>
          <p>ログイン中です</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <p>ログアウトしています</p>
      )}
      <button onClick={() => checkAPI()}>api test</button>
    </div>
  );
};

export default HomePage;
