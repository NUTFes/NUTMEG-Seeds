import '@assets/main.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import router from 'next/router';
import { ManagedUIContext } from '@components/ui/context';
import Layout from '@components/layout/Layout';
import { RecoilRoot } from 'recoil';
import AuthProvider from 'src/context/AuthProvider';
import { useAuth } from 'src/context/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head>
        <title>NUTMEG Seeds</title>
        <meta name='NUTMEG Seeds' content='ja' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap'
        />
        <link href='https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap' rel='stylesheet'></link>
      </Head>
      <RecoilRoot>
        <AuthProvider>
          <ManagedUIContext>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ManagedUIContext>
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
