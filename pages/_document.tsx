import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/*
 * Necessário para não quebrar os estilos, estilos do styled-components
 * dos elementos aninhados não renderizam, somente renderizam os estilos globais.
 * Para desolver isso temos que renderizar os estilos do lado do servidor e injetamos
 * eles no documento.
 */
export default class MyDocument extends Document {
  
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
}
