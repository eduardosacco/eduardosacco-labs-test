import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MetamaskStateProvider } from 'use-metamask';
import Layout from '../components/Layout';
import createEmotionCache from '../src/createEmotionCache';

import { ColorModeProvider } from '../context/ColorModeContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MetamaskStateProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MetamaskStateProvider>
      </ColorModeProvider>
    </CacheProvider>
  );
}
