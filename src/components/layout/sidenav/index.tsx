import { useState } from 'react';
import { StyledSideNav } from './styles';
import { NavHeader } from '../../itens/nav/nav-header';
import NavItem from '../../itens/nav/nav-item';
import NavSubMenu from '../../itens/nav/nav-submenu';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

export default function SideNav({open}){

  const [ showCategorias, setShowCategorias ] = useState(false);
  const [ showProdutos, setShowProdutos ] = useState(false);

  const router = useRouter();

  return(
    <StyledSideNav open={open} >
      <ul>
        <NavHeader>Bem-vindo</NavHeader>
        <NavItem onClick={() => router.push('/')}>
          🏠 Home
        </NavItem>
        <NavHeader>Sistema</NavHeader>
        <NavSubMenu label="📦 Produtos" open={showProdutos} onClick={() => setShowProdutos(!showProdutos)}>
          <NavItem onClick={() => router.push("/produtos/consulta")}>
            🔎 Consulta <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </NavItem>
          <NavItem onClick={() => router.push("/produtos/cadastro")}>
            🗃 Cadastro <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </NavItem>
        </NavSubMenu>
        <NavSubMenu label="🗂️ Categorias" open={showCategorias} onClick={() => setShowCategorias(!showCategorias)}>
          <NavItem onClick={() => router.push("/categorias/consulta")}>
            🔎 Consulta <FontAwesomeIcon icon={faLongArrowAltRight}/>
          </NavItem>
          <NavItem onClick={() => router.push("/categorias/cadastro")}>
            🗃 Cadastro <FontAwesomeIcon icon={faLongArrowAltRight}/> 
          </NavItem>
        </NavSubMenu>
      </ul>
    </StyledSideNav>
  );
}
