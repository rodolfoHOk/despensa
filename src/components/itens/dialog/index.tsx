import styled from 'styled-components';
import { Button } from '../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const StyledDialog = styled.div`
  display: block;
  position: fixed;
  top: calc(50vh - 150px);
  left: calc(50vw - 180px);
  z-index: 20;
  width: 360px;
  border-radius: 10px 10px 8px 8px;
  background-color: ${({theme}) => theme.primaryLight};
  -webkit-box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.80); 
  box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.80);

  h1 {
    margin: 0;
    padding: 14px 28px;
    border-radius: 8px 8px 0 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.05rem;
    background-color: ${({theme}) => theme.primaryHover};
  }

  div {
    padding: 14px 28px;
    text-align: left;
    p {
      margin: 0;
      padding: 5px;
      font-size: 16px;
      font-weight: bold;
      color: ${({theme}) => theme.primaryDark};
    }
  }

  #actions {
    padding: 14px 28px;
    background-color: ${({theme}) => theme.primaryDark + '33'};
  }

  span {
    display: inline-block;
    width: 58px;
  }

  button {
    margin: 0;
  }

  .close-button {
    position: fixed;
    top: calc(50vh - 150px);
    left: calc(50vw + 180px - 32px);
    background-color: ${({theme}) => theme.primaryHover};
    font-size: 16px;
    outline: none;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    color: ${({theme}) => theme.primaryLight};
    transition: box-shadow .3s;
    &:hover {
      box-shadow: 0px 0px 3px 0px ${({theme}) => theme.primaryLight + '99'};
    }
  }
`;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  background-color: #000000cc;
`;

export default function Dialog({ show, title, message, onConfirm, onCancel }:
{
  show: boolean,
  title: string,
  message: string,
  onConfirm: () => any,
  onCancel: () => any
}){
  return(
    show
    &&
    <BackGround>
      <StyledDialog>
        <h1>{title}</h1>
        <button className="close-button" onClick={onCancel}>x</button>
        <div id="div-message">
          <p>{message}</p>
        </div>
        <div id="actions">
          <Button color="danger" onClick={onConfirm}>
            <FontAwesomeIcon icon={faCheck}/>
            Confirmar
          </Button>
          <span></span>
          <Button color="warn" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes}/>
            Cancelar
          </Button>
        </div>
      </StyledDialog>
    </BackGround>
  );
}
