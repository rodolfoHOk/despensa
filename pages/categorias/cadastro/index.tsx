import { useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import CategoriaFormScreen from "../../../src/screens/categoria";
import Unauthorized from "../../unauthorized";


export default function CadastroCategoria(){
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>
  
  return(
    <CategoriaFormScreen />
  );
}
