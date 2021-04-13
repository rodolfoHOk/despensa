import styled from 'styled-components';

export const Card: any = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 460px;
  width: 100%;
  margin: 10px;
  border-radius: 10px 10px 8px 8px;
  background-color: ${({theme}) => theme.primaryLight};  
  -webkit-box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.7); 
  box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.7);

  @media (max-width: ${({theme}) => theme.mobile}){
    border-radius: 0;
  }
`;

Card.Title = styled.h1`
  margin: 0;
  padding: 14px 28px;
  border-radius: 8px 8px 0 0;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.1rem;
  background-color: ${({theme}) => theme.primaryHover};

  @media (max-width: ${({theme}) => theme.mobile}){
    border-radius: 0;
  }
`;

Card.Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
`;

Card.Content0padding = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 8px;
  border-top: 2px solid ${({theme}) => theme.primaryLight};
  border-bottom: 8px solid ${({theme}) => theme.primaryLight};
  text-align: left;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: ${({theme}) => theme.mobile}){
    border-radius: 0;
  }
`;
