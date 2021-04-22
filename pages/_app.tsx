import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globals';
import { theme } from '../src/theme';
import Layout from '../src/components/layout';
import { AppProps } from 'next/app';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
