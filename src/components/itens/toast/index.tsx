import styled from 'styled-components';

interface ToastProps {
  success: boolean
}

const SlyledToast = styled.div<ToastProps>`
  display: block;
  position: fixed;
  top: 20%;
  right: 10%;
  padding: 7px;
  padding-left: 14px;
  padding-right: 32px;
  z-index: 25;
  width: 300px;
  border: 2px solid ${({theme, success}) => success ?  theme.toastSuccess : theme.toastError};
  border-radius: 6px;
  text-align: center;
  background-color: ${({theme}) => theme.toastColor};
  -webkit-box-shadow: 5px 5px 20px -3px #000000; 
  box-shadow: 5px 5px 20px -3px #000000;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    color: ${({theme}) => theme.primaryLight};
  }

  button {
    position: fixed;
    top: calc(20% - 8px);
    right: calc(10% - 8px);
    background-color: ${({theme, success}) => success ?  theme.toastSuccess : theme.toastError};
    font-size: 16px;
    outline: none;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 16px;
    cursor: pointer;
    color: ${({theme}) => theme.primaryLight};
    transition: box-shadow .3s;
    &:hover {
      box-shadow: 0px 0px 5px 1px ${({theme}) => theme.primaryHover + '99'};
    }
  }
`;

export default function Toast({show, message, duration, success, hideFc}:
{show: boolean, message: string, duration: string, success: boolean, hideFc: () => any}) {
  clearTimeout(timeoutHandle);
  if(show){
    var timeoutHandle = setTimeout(() => {
        hideFc();
      },parseInt(duration)
    );
  }
  return (
    show
    &&
    <SlyledToast success={success}>
      <button onClick={hideFc}>x</button>
      <p>{message}</p>
    </SlyledToast>
  );
}
