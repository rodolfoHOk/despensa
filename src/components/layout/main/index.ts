import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: row;

  @media (max-width: ${({theme}) => theme.mobile}){
    flex-direction: column;
  }
`;
