import { ReactChildren, useState } from 'react';
import Header from './header';
import BurgerButton from './burger';
import { Main } from './main';
import { LeftContainer } from './left-container';
import SideNav from './sidenav';
import { MainContainer } from './main-container';
import { Content } from './content';
import Footer from './footer';

export default function Layout({children}:{children: ReactChildren}){
  
  const [ openNav, setOpenNav ] = useState(false);

  return (
    <>
      <Header/>
      <BurgerButton open={openNav} setOpen={setOpenNav}/>
      <Main>
        <LeftContainer open={openNav}>
          <SideNav open={openNav}/>
        </LeftContainer>
        <MainContainer>
          <Content>
            {children}
          </Content>
          <Footer/>
        </MainContainer>
      </Main>
    </>
  );
}
