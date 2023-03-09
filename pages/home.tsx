import { useAuth0 } from "@auth0/auth0-react";
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
    </div>
  );
};

export default HomePage;
