import styled from 'styled-components';
import Link from 'next/link';

const StyledNotFound = styled.div`
  display: block;
  text-align: center;
  justify-content: center;
  h1 {
    font-size: 72px;
  }
  h2 { 
    font-size: 28px;
    letter-spacing: 0.1rem;
  }
  a {
    text-decoration: none;
    font-size: 16px;
    color: ${({theme}) => theme.primaryHover};
  }
`;

export default function NotFoundComponent(){

  return(
    <StyledNotFound>
      <h1>4😥4</h1>
      <h2>Página não encontrada</h2>
      <Link href='/'>
        <a>Voltar para Home</a>
      </Link>
    </StyledNotFound>
  );
}
