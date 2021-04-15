import styled from 'styled-components';

export const LeftContainer = styled.div<LeftContainerProps>`
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  ${({open}) => open ? 'width: 15rem' : 'width: 0'};

  @media (max-width: ${({theme}) => theme.mobile}){
    transition: height 0.3s;
    ${({open}) => open ? 'height: auto' : 'height: 0'};
  }

  @media print {
    display: none;
  }
`;

interface LeftContainerProps {
  open: boolean,
}
