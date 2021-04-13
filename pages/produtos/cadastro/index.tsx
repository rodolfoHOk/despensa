import ProdutoFormScreen from "../../../src/screens/produto";
import Categoria from "../../../src/screens/categoria/categoria";


export default function CadastroProdutos({categorias}:{categorias: Categoria[]}) {

  return (
    <ProdutoFormScreen categorias={categorias}/>
  );
}

import db from '../../../db.json';
export async function getServerSideProps(context) {
  
  const categorias = db["master@master"].categorias;

  return { props: {categorias} }
}
