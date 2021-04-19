import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../../src/components/itens/loading";
import ProdutoFormScreen from "../../../src/screens/produto";
import Produto from "../../../src/interface/produto";
import Categoria from "../../../src/interface/categoria";
import { getProdutoPorId } from "../../../src/services/produtos";
import { getSession, useSession } from "next-auth/client";
import Unauthorized from "../../unauthorized";
import { connectToDatabase } from "../../../src/utils/mongodb";


export default function AtualizarProduto({categorias}:{categorias: Categoria[]}) {
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>
  
  const router = useRouter();

  const [ loadingData , setLoadingData ] = useState(true);
  const [ produtoToUpdate, setProdutoToUpdate ] = useState<Produto>({
    _id: '',
    nome: '',
    categoria: '',
    minimo: 0,
    quantidade: 0
  });

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getProdutoPorId(id.toString())
        .then(response => {
          if(response.status === 200){
            setProdutoToUpdate(response.data);
            setLoadingData(false);
          }
        }).catch(error => {
          console.log(error);
      });
    }
  },[]);

  return (
    loadingData
    ?
    <Loading/>
    :
    <ProdutoFormScreen produtoToUpdate={produtoToUpdate} categorias={categorias} />
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
