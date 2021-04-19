import { List } from "../../../src/components/layout/list";
import db from '../../../db.json';
import Produto from "../../../src/interface/produto";
import { getSession, useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import Unauthorized from "../../unauthorized";
import { Button } from "../../../src/components/itens/button";
import { connectToDatabase } from "../../../src/utils/mongodb";

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
            <tr id={`id_${produto._id}`} key={`key_${produto._id}`}>
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

  if (session && session.user.email) {
    const { client, db } = await connectToDatabase();
    if (client.isConnected) {
      const produtosEmEstoque: Produto[] = await db.collection('produtos')
        .find(
          { usuario: session.user.email, quantidade: {$gt : 0}},
          { projection: { usuario : 0 }})
        .sort({ categoria: 1, nome: 1})
        .toArray();
      const produtos: Produto[] = JSON.parse(JSON.stringify(produtosEmEstoque));
      return {
        props: { produtos }
      }
    }
  }

  return {
    props: {}
  }
}
