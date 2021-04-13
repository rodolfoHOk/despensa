import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../../src/components/itens/loading";
import ProdutoFormScreen from "../../../src/screens/produto";
import Produto from "../../../src/screens/produto/produto";
import Categoria from "../../../src/screens/categoria/categoria";
import { getProdutoPorId } from "../../../src/services/produtos";


export default function AtualizarProduto({categorias}:{categorias: Categoria[]}) {
  
  const router = useRouter();

  const [ loading , setLoading ] = useState(true);

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
          setLoading(false);
        }
      }).catch(error => {
        console.log(error);
      })
  },[]);

  return (
    loading
    ?
    <Loading/>
    :
    <ProdutoFormScreen produtoToUpdate={produtoToUpdate} categorias={categorias} />
  );
}

import db from '../../../db.json';
export async function getServerSideProps(context) {
  
  const categorias = db["master@master"].categorias;

  return { props: {categorias} }
}
