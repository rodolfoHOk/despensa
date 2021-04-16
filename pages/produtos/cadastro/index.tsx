import { getSession, useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import Unauthorized from "../../unauthorized";
import ProdutoFormScreen from "../../../src/screens/produto";
import Categoria from "../../../src/interface/categoria";
import db from '../../../db.json';


export default function CadastroProdutos({categorias}:{categorias: Categoria[]}) {
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>

  return (
    <ProdutoFormScreen categorias={categorias}/>
  );
}


export async function getServerSideProps({req, res}) {
  const session = await getSession({req});

  if(session && session.user.email) {
    const categorias = JSON.parse(JSON.stringify(db[session.user.email].categorias));
    return { props: {categorias} }
  }

  return {
    props: {}
  }
}
