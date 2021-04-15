import { useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import Unauthorized from "../../unauthorized";
import ProdutoFormScreen from "../../../src/screens/produto";
import Categoria from "../../../src/screens/categoria/categoria";
import db from '../../../db.json';


export default function CadastroProdutos({categorias}:{categorias: Categoria[]}) {
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>

  return (
    <ProdutoFormScreen categorias={categorias}/>
  );
}

export async function getServerSideProps(context) {
  const categorias = JSON.parse(JSON.stringify(db["master@master"].categorias));
  return { props: {categorias} }
}
