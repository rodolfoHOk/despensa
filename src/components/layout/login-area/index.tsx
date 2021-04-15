import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledLoginArea = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10;
  
  div {
    display: flex;
    flex-direction: column;
    border: 1px solid ${({theme}) => theme.primaryHover + '77'};
    border-radius: 5px;
    background-color: ${({theme}) => theme.primaryHover + '55'};
  }

  button {
    display: flex;
    flex-direction: row;
    height: 40px;
    width: auto;
    font-size: 15px;
    font-weight: normal;
    outline: none;
    border: 0px solid ${({theme}) => theme.primaryHover};
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({theme}) => theme.primaryDark + '11'};
    color: ${({theme}) => theme.primaryLight};
    transition: background-color .3s;
    &:hover {
      background-color: ${({theme}) => theme.primaryDark + '55'};
    }
    svg {
      margin: 0 5px 0 0;
      width: 16px;
      height: 16px;
    }
    img {
      margin: 0;
      margin-top: 3px;
      margin-right: 3px;
      width: 32px;
      height: 32px;
      border-radius: 20px;
    }
    span {
      display: flex;
      flex-direction: row;
      margin: 5px;
      margin-top: 10px;
    }
  }
  
`;

export default function LoginArea({
  sign,
  user,
  onClickLogin,
  onClickLogout
}:{
  sign: boolean,
  user: any,
  onClickLogin: () => any,
  onClickLogout: () => any
}){
  
  const [ showInfo, setShowInfo ] = useState(false);

  var nome;
  var imagem;

  if (user) {
    const { name, image } = user;
    nome = name;
    imagem = image;
  }

  useEffect(() => {
    if (!sign) {
      setShowInfo(false);
    }
  });

  return (
    <StyledLoginArea>
      {
        !sign
        ?
        <button onClick={onClickLogin}>
          <span>
            <FontAwesomeIcon icon={faSignInAlt}/>
            Login
          </span>
        </button>
        :
        <>
          <button onClick={() => setShowInfo(!showInfo)}>
            <img src={imagem} width="40" height="40"/>
            <span>
              {nome}
            </span>
          </button>
          {
            showInfo
            &&
            <div>
              <button onClick={onClickLogout}>
                <span>
                  <FontAwesomeIcon icon={faSignOutAlt}/>
                  Logout
                </span>
              </button>
            </div>
          }
        </>
      }
    </StyledLoginArea>
  );
}
