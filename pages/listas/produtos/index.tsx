import { List } from "../../../src/components/layout/list";
import db from '../../../db.json';
import Produto from "../../../src/interface/produto";
import { getSession, useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import Unauthorized from "../../unauthorized";
import { Button } from "../../../src/components/itens/button";

export default function ListaProdutos({ produtos }){
  
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>

  return(
    <List>
      <h1>Lista de Produtos no Estoque</h1>
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Nome Produto</th>
            <th>Min</th>
            <th>Qtd</th>
          </tr>
        </thead>
        <tbody>
          { produtos.map(produto => (
            <tr>
              <td>{produto.categoria}</td>
              <td>{produto.nome}</td>
              <td>{produto.minimo}</td>
              <td>{produto.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="no-print" onClick={() => window.print()}>Imprimir</Button>
    </List>
  );
}

export async function getServerSideProps({req, res}) {
  const session = await getSession({req});

  function ordenar(produtos : Produto[]) {
    produtos.sort(function (a: Produto, b: Produto) {
      var c1 = a['categoria'].toLowerCase();
      var c2 = b['categoria'].toLowerCase();
    
      var n1 = a['nome'].toLowerCase();
      var n2 = b['nome'].toLowerCase();
    
      if (c1 < c2) return -1;
      if (c1 > c2) return 1;
      if (n1 < n2) return -1;
      if (n1 > n2) return 1;
      return 0;
    });
    return produtos;
  }
  
  if (session && session.user.email) {
    const listaProdutos = JSON.parse(JSON.stringify(db[session.user.email].produtos));
    const produtosEmEstoque = listaProdutos.filter(produto => produto.quantidade > 0);
    let produtos;
    if(produtosEmEstoque.length > 1) {
      produtos = ordenar(produtosEmEstoque);
    } else {
      produtos = produtosEmEstoque;
    }
    
    return {
      props: { produtos }
    }
  }

  return {
    props: {}
  }
}
