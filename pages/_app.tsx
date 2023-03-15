import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { AxiosClientProvider } from "@/axios/AxiosClientProvider";
import AppHeader from "@/components/organisms/AppHeader";
import AppFooter from "@/components/organisms/AppFooter";
import styles from "@/styles/Home.module.css";
import CurrentUserProvider from "@/contexts/CurrentUserProvider";

export default function App({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/home`;
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!,
      }}
    >
      <AxiosClientProvider>
        <CurrentUserProvider>
          <>
            <AppHeader />
            <main className={styles.main}>
              <Component {...pageProps} />
            </main>
            <AppFooter />
          </>
        </CurrentUserProvider>
      </AxiosClientProvider>
    </Auth0Provider>
  );
}
