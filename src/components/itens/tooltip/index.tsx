import React from 'react';
import styled from 'styled-components';

const StyledToolTip = styled.div<ToolTipProps>`
  position: absolute;
  top: ${({positionY}) => positionY};
  left: ${({positionX}) => positionX};
  z-index: 30;
  display: block;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  text-align: center;
  background-color: ${({theme}) => theme.primaryLight + 'cc'};
  color: ${({theme}) => theme.primaryDark};
  label {
    margin: 0 3px 3px 3px;
    font-size: 12px;
    font-weight: normal;
  }
`;

interface ToolTipProps {
  positionX: string,
  positionY: string,
}

export default function ToolTip({
  label,
  positionX,
  positionY,
}:{
  label: string,
  positionX: string,
  positionY: string,
}) {

  return(
    <StyledToolTip positionX={positionX} positionY={positionY}>
      <label>
        {label}
      </label>
    </StyledToolTip>
  );
}
