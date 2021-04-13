import styled from 'styled-components';

export const StyledSideNav = styled.nav<SideNavProps>`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
  background: ${({theme}) => theme.primaryLight};
  transition: transform 0.3s;
  transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
  overflow: auto;

  @media (max-width: ${({theme}) => theme.mobile}){
    min-height: auto;
    width: calc(100vw - 15px);
    transition: transform 0.3s;
    transform: ${({open}) => open ? 'translateY(0)' : 'translateY(-100%)'};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

interface SideNavProps {
  open: boolean,
}
