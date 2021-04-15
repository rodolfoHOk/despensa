import styled from 'styled-components';
import Link from 'next/link';

const StyledUnauthorized = styled.div`
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

export default function UnauthorizedScreen(){

  return(
    <StyledUnauthorized>
      <h1>🔐401</h1>
      <h2>Acesso não autorizado</h2>
      <Link href='/auth/signin'>
        <a>Fazer o Login</a>
      </Link>
    </StyledUnauthorized>
  );
}
