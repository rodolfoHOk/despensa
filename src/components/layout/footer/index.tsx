import styled from 'styled-components';

const FooterWarpper = styled.footer`
  width: 100%;
  height: 16px;
  display: block;
  margin-top: auto;
  text-align: center;
  font-size: 12px;
  background-color: #00000033;
  color: #333333;

  @media print {
    display: none;
  }
`;

export default function Footer(){
  return(
    <FooterWarpper>
      <span>Minha Despensa App - Copyright &#169; 2021 by HiOk-Tec</span>
    </FooterWarpper>
  );
}
