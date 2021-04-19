import { getSession, useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import Unauthorized from "../../unauthorized";
import ProdutoFormScreen from "../../../src/screens/produto";
import Categoria from "../../../src/interface/categoria";
import { connectToDatabase } from "../../../src/utils/mongodb";


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
    const { client, db } = await connectToDatabase();
    var categorias: Categoria[];
    if (client.isConnected ) {
      categorias = JSON.parse(JSON.stringify(await db.collection('categorias')
        .find({usuario : session.user.email},{projection: {usuario: 0}})
        .toArray()));
      return { props: {categorias} }
    }
  }

  return {
    props: {}
  }
}
