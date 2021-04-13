import styled from 'styled-components';

const HeaderWarpper = styled.header`
  width: 100%;
  height: 50px;
  z-index: 5;
  background-color: ${({theme}) => theme.primaryHover};

  h1 {
    margin-top: 12px;
    margin-left: 80px;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 0.15rem;
  }
`;

export default function Header(){
  return(
    <HeaderWarpper>
      <h1>Minha Despensa</h1>
    </HeaderWarpper>
  );
}
