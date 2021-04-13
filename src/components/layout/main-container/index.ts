import styled from 'styled-components';

export const MainContainer = styled.div`
  flex-grow: 1;
  min-height: calc(100vh - 50px);
      
  @media (max-width: ${({theme}) => theme.mobile}){
    min-height: auto;
  }
`;
