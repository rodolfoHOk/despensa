import styled from 'styled-components';

const StyledBurgerButton = styled.button<BurgerProps>`
  position: absolute;
  top: 10px;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    position: relative;
    width: 30px;
    height: 4px;
    background: ${({theme, open}) => open ? theme.primaryLight + '99' : theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;

    :first-child {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({open}) => open ? '0' : '1'};
      transform: ${({open}) => open ? 'translateX(-50px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  
  @media print {
    display: none;
  }
`;

interface BurgerProps {
  open: boolean,
}

export default function BurgerButton({ open, setOpen }:
{ open: boolean, setOpen: (open : boolean) => any }){
  return(
    <StyledBurgerButton open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurgerButton>
  );
}
