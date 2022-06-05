import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import HeaderMenu from "../components/headerMenu";
import createEmotionCache from "../utility/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <div>
        <header>
          <HeaderMenu />
        </header>
        <Component {...pageProps} />
      </div>
    </CacheProvider>
  );
}

export default MyApp;
