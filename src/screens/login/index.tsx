import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signIn } from 'next-auth/client';
import { AppProvider } from 'next-auth/providers';
import styled from 'styled-components';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  margin: 20px;
  padding-bottom: 20px;
  text-align: center;
  border-radius: 8px 8px 6px 6px;
  background-color: ${({theme}) => theme.primaryLight};
  
  label {
    border-radius: 6px 6px 0 0;
    padding: 10px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.2rem;
    color: ${({theme}) => theme.primaryLight};
    background-color: ${({theme}) => theme.primaryHover};
  }
`;

const LoginButton = styled.button<ButtonProps>`
  margin: 20px;
  margin-bottom: 0;
  padding: 0;
  width: 260px;
  height: auto;
  display: flex;
  flex-direction: row;
  outline: none;
  border: 0px solid ${({theme}) => theme.primaryDark};
  border-radius: 4px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.primaryLight};
  background-color: ${({bg}) => bg};
  opacity: 1;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }
  .svg {
    display: inline-box;
    width: 15%;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    background-color: ${({bgIcon}) => bgIcon};
    padding: 10px;
    svg {
      height: 16px;
      width: auto;
      transform: translateY(2px);
    }
  }
  .label {
    display: inline-box;
    width: 85%;
    height: 40px;
    padding: 12px;
  }
`;

interface ButtonProps {
  bg: string;
  bgIcon: string;
}

export default function LoginScreen({providers}:{providers: Record<string, AppProvider>}){

  return (
    <StyledLogin>
      <label>Login</label>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          {
            provider.name === 'Facebook'
            ?
            <LoginButton 
              onClick={() => signIn(provider.id)}
              bgIcon="#3b5998"
              bg="#4267B2"
            >
              <div className="svg">
                <FontAwesomeIcon icon={faFacebook}/>
              </div>
              <div className="label">
                Entrar com o {provider.name}
              </div>
            </LoginButton>
            :
            <LoginButton
              onClick={() => signIn(provider.id)}
              bgIcon="#DB4437"
              bg="#EA4335"
            >
              <div className="svg">
                <FontAwesomeIcon icon={faGoogle}/>
              </div>
              <div className="label">
                Entrar com o {provider.name}
              </div>
            </LoginButton>
          }
        </div>
      ))}
    </StyledLogin>
  );
}
