import styled from 'styled-components';

export const MiniInput = styled.input`
  display: inline-block;
  margin-right: 5px;
  width: 50px;
  height: 32px;
  text-align: center;
  font-size: 18px;
  outline: 1px;
  border: 0;
  border-radius: 2px;
  background: ${({theme}) => theme.primaryLight};
  color: ${({theme}) => theme.primaryDark};
  transition: box-shadow .3s;
  &:focus {
    -webkit-box-shadow: 0px 0px 2px 2px ${({theme}) => theme.primaryHover + '66'}; 
    box-shadow: 0px 0px 2px 2px ${({theme}) => theme.primaryHover + '66'};
  }

  @media (max-width: ${({theme}) => theme.tablet}) {
    margin: 5px;
  }
`;
