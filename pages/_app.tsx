import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globals';
import Head from 'next/head';
import { theme } from '../src/theme';
import Layout from '../src/components/layout';
import { AppProps } from 'next/app';

/* Obs: O componente Head adiciona a tag head na página html este é útil para
 * carregarmos as fontes (do texto) externas ao nosso aplicativo. Para após isso
 * conseguimos carregá-las no GlobalStyle que é onde estão nossos estilos css global.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Despensa</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet"/>
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp
