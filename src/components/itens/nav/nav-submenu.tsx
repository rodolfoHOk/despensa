import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import NavItem from './nav-item';

const StyledNavSubMenu = styled.div`
  display: block;
  background: linear-gradient(90deg,${({theme}) => theme.primaryHover + '33'},${({theme}) => theme.primaryHover + '11'} 50%,transparent);
  
  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
`;

export default function NavSubMenu({children, label, open, onClick}:
{
  children: any,
  label: string,
  open: boolean,
  onClick: () => any
}){
  
  let className: string = '';
  if (open) {
    className = 'active';
  }

  return(
    <>
      <NavItem className={className} onClick={onClick}>
        { label } {open ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
      </NavItem>
      { 
      open
      &&
      <StyledNavSubMenu>
        <ul>
          { children }
        </ul>
      </StyledNavSubMenu>
      }
    </>
  );
}