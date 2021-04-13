import styled from 'styled-components';

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  margin: 5px;
  margin-left: 0;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  border: 0px solid ${({theme}) => theme.primaryLight};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({theme , color}) => color === 'success' ? theme.buttonSuccess : color === 'warn' ? theme.buttonWarn : color === 'danger' ? theme.buttonDanger : theme.buttonPrimary };
  color: ${({theme}) => theme.primaryLight};
  -webkit-box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.75); 
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.75);
  transition: opacity .3s;
  &:hover {
    opacity: .7;
  }
  &:focus {
    transform: translate(1px, 1px);
    -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75); 
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  }
  svg {
    margin-right: 5px;
    width: auto;
    height: 16px;
    transform: translateY(2px);
  }
`;

interface ButtonProps {
  color?: string
}
