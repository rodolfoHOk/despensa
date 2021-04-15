import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../../src/components/itens/loading";
import ProdutoFormScreen from "../../../src/screens/produto";
import Produto from "../../../src/screens/produto/produto";
import Categoria from "../../../src/screens/categoria/categoria";
import { getProdutoPorId } from "../../../src/services/produtos";
import db from '../../../db.json';
import { useSession } from "next-auth/client";
import Unauthorized from "../../unauthorized";


export default function AtualizarProduto({categorias}:{categorias: Categoria[]}) {
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>
  
  const router = useRouter();

  const [ loadingData , setLoadingData ] = useState(true);
  const [ produtoToUpdate, setProdutoToUpdate ] = useState<Produto>({
    id: 0,
    nome: '',
    categoria: '',
    minimo: 0,
    quantidade: 0
  });

  useEffect(() => {
    const { id } = router.query;
    getProdutoPorId(parseInt(id[0]))
      .then(response => {
        if(response.status === 200){
          setProdutoToUpdate(response.data);
          setLoadingData(false);
        }
      }).catch(error => {
        console.log(error);
      })
  },[]);

  return (
    loadingData
    ?
    <Loading/>
    :
    <ProdutoFormScreen produtoToUpdate={produtoToUpdate} categorias={categorias} />
  );
}


export async function getServerSideProps(context) {
  const categorias = db["master@master"].categorias;
  return { props: {categorias} }
}
