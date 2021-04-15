import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../src/components/itens/loading";
import CategoriaFormScreen from "../../../src/screens/categoria";
import Categoria from "../../../src/screens/categoria/categoria";
import { getCategoriaById } from "../../../src/services/categorias";
import Unauthorized from "../../unauthorized";


export default function AtualizarCategoria(){
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>

  const router = useRouter();

  const [ loadingData, setLoadingData ] = useState(true);

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
            setLoadingData(false);
          }
        }).catch(error => {
          console.log(error);
      });
    }
  },[]);

  return(
    loadingData
    ?
    <Loading/>
    :
    <CategoriaFormScreen categoriaToUpdate={categoria} />
  );
}
