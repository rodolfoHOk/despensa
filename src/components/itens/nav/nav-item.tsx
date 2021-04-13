import styled from 'styled-components';

const StyledNavItem = styled.li`
  display: list-item;

  a {
    display: block;
    padding: 16px 16px;
    border-bottom: 1px solid ${({theme}) => theme.primaryLight};
    text-align: left;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.1rem;
    color: ${({theme}) => theme.primaryDark};
    transition: color 0.3s linear;

    @media (max-width: ${({theme}) => theme.mobile}){
      padding: 16px calc(200px - 100px);
    }

    &:hover {
      cursor: pointer;
      background: linear-gradient(90deg,${({theme}) => theme.primaryHover + '33'},${({theme}) => theme.primaryHover + '11'} 50%,transparent);
      color: ${({theme}) => theme.primaryHover};
    }

    span {
      float: right;
    }

    svg {
      float: right;
      width: 16px;
      height: 16px;
      transform: translateY(2px);
    }
  }

  .active {
    border-left: 3px solid ${({theme}) => theme.primaryHover};
    border-right: 3px solid ${({theme}) => theme.primaryHover};
    background: linear-gradient(90deg,${({theme}) => theme.primaryHover + '33'},${({theme}) => theme.primaryHover + '11'} 50%,transparent);
    color: ${({theme}) => theme.primaryHover};
  }
`;

export default function NavItem({children, className, onClick}:
{ children: any , className?: string, onClick: () => any }){
  return(
    <StyledNavItem>
      <a onClick={onClick} className={className}>
        { children }
      </a>
    </StyledNavItem>
  );
}
