import styled from 'styled-components';

export const NavHeader = styled.li`
  padding: 8px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.05rem;
  color: ${({theme}) => theme.primaryDark};

  @media (max-width: ${({theme}) => theme.mobile}){
    text-align: center;
  }
`;
