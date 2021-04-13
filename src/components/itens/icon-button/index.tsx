import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ToolTip from '../tooltip';

const StyledIconButton = styled.button<ButtonProps>`
  display: inline-block;
  margin-right: 5px;
  font-size: 18px;
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 0;
  cursor: pointer;
  background-color: ${({theme , color}) => color ? color : theme.buttonPrimary + '22'};
  -webkit-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.5); 
  box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.5);
  transition: background-color .3s;
  &:hover {
    background-color: ${({theme , color}) => color ? color : theme.buttonPrimary};
  }
  &:focus {
    transform: translate(1px, 1px);
    -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75); 
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
  }

  @media (max-width: ${({theme}) => theme.tablet}){
    margin: 5px;
  }
`;

interface ButtonProps {
  color?: string
}

export default function IconButton({
  children,
  id,
  tooltip,
  onClick,
}:{
  children: any,
  id: string,
  tooltip?: string,
  onClick: () => any
}){

  const [ positionX, setPositionX ] = useState('');
  const [ positionY, setPositionY ] = useState('');
  const [ label, setLabel ] = useState('');

  // Element position calcutator
  function getOffset( el ) {
    var px = 0;
    var py = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        px += el.offsetLeft - el.scrollLeft;
        py += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: py, left: px };
  }

  // Show tooltip on mouse over element
  useEffect(() => {
    var element = document.getElementById(id);
    element.onmouseover = function() {
      setLabel(tooltip);
      const ElemOffSet = getOffset(element);
      setPositionY((ElemOffSet.top - 22) + 'px');
      setPositionX((ElemOffSet.left) + 'px');
    }
    element.onmouseout = function() {
      setLabel('');
      setPositionX('0');
      setPositionY('0');
    }
  },[])

  return (
    <>
      <StyledIconButton id={id} onClick={onClick}>
        {children}
      </StyledIconButton>
      { tooltip && label !== ''
        &&
        <ToolTip 
          label={label}
          positionX={positionX}
          positionY={positionY}
        />
      }
    </>
  );
}
