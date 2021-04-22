import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {

  /*
   * Necessário para não quebrar os estilos, estilos do styled-components
   * dos elementos aninhados não renderizam, somente renderizam os estilos globais.
   * Para resolver isso temos que renderizar os estilos do lado do servidor e injetamos
   * eles no documento.
   */
  static async getInitialProps(ctx){
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  /*
   * Para inserir o cabeçalho em todas as páginas da aplicação sem ficar recarregando
   * as informações toda requisição de nova página. Usamos esta maneira para carregar
   * as fontes do google por exemplo.
   */
  render() {
    return (
      <Html>
        <Head>
          <title>Despensa</title>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
