import { useSession, signIn, signOut } from 'next-auth/client';
import { useState } from 'react';
import Header from './header';
import BurgerButton from './burger';
import { Main } from './main';
import { LeftContainer } from './left-container';
import SideNav from './sidenav';
import { MainContainer } from './main-container';
import { Content } from './content';
import Footer from './footer';
import LoginArea from './login-area';

export default function Layout({children}){
  
  const [ openNav, setOpenNav ] = useState(false);
  
  const [ session, loading ] = useSession();

  return (
    <>
      <Header/>
      <BurgerButton open={openNav} setOpen={setOpenNav}/>
      <LoginArea 
        sign={session !== null && session !== undefined}
        user={session ? session.user : null}
        onClickLogin={signIn}
        onClickLogout={signOut}
      />
      <Main>
        <LeftContainer open={openNav}>
          <SideNav open={openNav} sign={session !== null && session !== undefined}/>
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
