import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../src/components/itens/loading";
import CategoriaFormScreen from "../../../src/screens/categoria";
import Categoria from "../../../src/screens/categoria/categoria";
import { getCategoriaById } from "../../../src/services/categorias";


export default function AtualizarCategoria(){

  const router = useRouter();

  const [ loading, setLoading ] = useState(true);

  const [ categoria, setCategoria ] = useState<Categoria>({
    id: 0,
    nome: '',
    emoji: ''
  });

  useEffect(() => {
    const { id } = router.query;
    if (id.length === 1){
      getCategoriaById(parseInt(id[0]))
        .then(response => {
          if (response.status === 200) {
            setCategoria(response.data);
            setLoading(false);
          }
        }).catch(error => {
          console.log(error);
      });
    }
  },[]);

  return(
    loading
    ?
    <Loading/>
    :
    <CategoriaFormScreen categoriaToUpdate={categoria} />
  );
}
