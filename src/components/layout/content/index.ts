import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 50px - 16px);
  padding: 16px;
  
  @media (max-width: ${({theme}) => theme.mobile}){
    padding: 0;
    min-height: auto;
  }
`;
