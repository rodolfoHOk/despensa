import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/itens/button";
import { Card } from "../../components/itens/card";
import { Form } from "../../components/itens/form";
import FormField from "../../components/itens/form-field";
import Toast from "../../components/itens/toast";
import ToastStates from "../../components/itens/toast/toast";
import Categoria from "../../interface/categoria";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBroom, faSave, faSync } from "@fortawesome/free-solid-svg-icons";
import { postCategoria, putCategoria } from "../../services/categorias";


export default function CategoriaFormScreen({categoriaToUpdate}:{categoriaToUpdate?: Categoria}){

  const router = useRouter();

  // Formulario
  const [ isUpdate, setIsUpdate ] = useState(false);

  const [ categoria, setCategoria ] = useState<Categoria>({
    _id: '',
    nome: '',
    emoji: '',
  });

  function salvar(event: FormEvent) {
    event.preventDefault();
    const isValid = formIsValid();
    if(isValid.valid) {
      if(isUpdate) {
        putCategoria(categoria._id, categoria)
          .then(response => {
            if (response.status === 200) {
              toast("Categoria atualizada com sucesso", 3000, true);
            }
          }).catch(error => {
            toast("Erro ao tentar atualizar categoria", 3000, false);
          })
      } else {
        postCategoria(categoria)
          .then(response => {
            if (response.status === 201) {
              toast("Categoria cadastrada com sucesso", 3000, true);
            }
          }).catch (error => {
            toast("Erro ao tentar cadastrar categoria", 3000, false);
          });
      }
    }
    else {
      toast(isValid.message, 3000, false);
    }
  }

  function limpar(event) {
    event.preventDefault();
    setCategoria({
      _id: '',
      nome: '',
      emoji: ''
    })
    event.target.blur();
  }

  // Validacao Formulario
  interface Valid {
    valid: boolean;
    message: string;
  }
  function formIsValid(): Valid{
    if(categoria.nome.length === 0) {
      return {valid: false, message: 'Campo nome da categoria é obrigatório'};
    }
    if(categoria.nome.length < 2) {
      return {valid: false, message: 'Nome da categoria muito curto'};
    }
    if(categoria.emoji.length > 0 && !isEmoji(categoria.emoji)){
      console.log(categoria.emoji.toString());
      return {valid: false, message: 'Emoji inválido'};
    }
    return {valid: true, message: ''};
  }

  function isEmoji(str) {
    var ranges = [
      '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])'
    ];
    if (str.match(ranges.join('|'))) {
      return true;
    } else {
      return false;
    }
  }

  // Toast
  const [ toastState , setToastState ] = useState<ToastStates>({
    show: false,
    message: "",
    duration: 0,
    success: false,
  });
  
  function toast(message: string, duration: number, success: boolean){
    setToastState({show: true, message: message, duration: duration, success: success});
  }

  useEffect(() => {
    if (categoriaToUpdate) {
      setCategoria({
        _id: categoriaToUpdate._id,
        nome: categoriaToUpdate.nome,
        emoji: categoriaToUpdate.emoji
      });
      setIsUpdate(true);
    } 
  },[])

  return(
    <>
      {/* Formulário */}
      <Card>
        <Card.Title>{isUpdate ? "Atualizar Categoria" : "Cadastro de Categorias"}</Card.Title>
        <Card.Content>
          <Form onSubmit={(event) => salvar(event)}>
            {
              isUpdate
              &&
              <Form.Row>
                <FormField 
                  label="ID"
                  name="id"
                  type="text"
                  value={categoria._id}
                  onChange={null}
                  disabled={true}
                />
              </Form.Row>
            }
            <Form.Row>
              <FormField
                label="Emoji"
                type="text"
                name="emoji"
                value={categoria.emoji}
                onChange={(event) => setCategoria({...categoria, emoji: event.target.value})}
                width="25%"
              />
              <FormField
                label="Nome da Categoria *"
                type="text"
                name="nome"
                value={categoria.nome}
                onChange={(event) => setCategoria({...categoria, nome: event.target.value})}
                width="75%"
              />
            </Form.Row>
            {
              isUpdate
              ?
              <Form.Row>
                <Button type="submit" color="success">
                  <FontAwesomeIcon icon={faSync} />
                  Atualizar
                </Button>
                <Button type="button" color="warn" onClick={() => router.push('/categorias/consulta')}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Voltar
                </Button>
              </Form.Row>
              :
              <Form.Row>
                <Button type="submit" color="success">
                  <FontAwesomeIcon icon={faSave} />
                  Cadastrar
                </Button>
                <Button type="button" color="warn" onClick={(event) => limpar(event)}>
                  <FontAwesomeIcon icon={faBroom} />
                  Limpar
                </Button>
              </Form.Row>
            }
          </Form>
        </Card.Content>
      </Card>
      {/* Toast */}
      <Toast 
        show={toastState.show} 
        message={toastState.message}
        duration={toastState.duration.toString()}
        success={toastState.success}
        hideFc={() => setToastState({show: false, message: '', duration:0, success:false})}
      />
    </>
  );
}
