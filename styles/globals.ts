import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html,
  body {
    min-height: 100vh;
  }

  body {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.primaryDark};
    color: ${({theme}) => theme.primaryLight};
    font-family: 'Lato', sans-serif;
  }

  #__next {
    display: flex;
    flex-direction: column;
    width:100%;
  }
`;

/* 
 * Obs: o next cria por padrão uma div com o id="__next" na página html após o body
 * então alguns estilos designados no body não são aplicados nossas as páginas.
 * por isso temos que adicionar aos estilos globais o seletor #__next.
 */
