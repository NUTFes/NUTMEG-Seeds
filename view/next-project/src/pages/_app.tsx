import '@assets/main.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NUTMEG Seeds</title>
        <meta name='NUTMEG Seeds' content='ja' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
