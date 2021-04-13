import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "../../../src/components/itens/button";
import { Card } from "../../../src/components/itens/card";
import { Form } from "../../../src/components/itens/form";
import FormField from "../../../src/components/itens/form-field";
import Toast from "../../../src/components/itens/toast";
import Produto from "./produto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSync, faArrowLeft, faBroom } from '@fortawesome/free-solid-svg-icons';
import ToastStates from "../../components/itens/toast/toast";
import Categoria from "../categoria/categoria";
import { postProduto, putProduto } from "../../services/produtos";

export default function ProdutoFormScreen({produtoToUpdate, categorias}:
  {produtoToUpdate?: Produto, categorias: Categoria[]}){

  const router = useRouter();

  // Campos Formulário
  const [ produto, setProduto ] = useState<Produto>({
    id: 0,
    nome: '',
    categoria: '',
    minimo: 0,
    quantidade: 0,
  });
  const [ isUpdate , setIsUpdate ] = useState(false);
  
  useEffect(() => {
    if(produtoToUpdate){
      setProduto({
        id: produtoToUpdate.id,
        nome: produtoToUpdate.nome,
        categoria: produtoToUpdate.categoria,
        minimo: produtoToUpdate.minimo,
        quantidade: produtoToUpdate.quantidade,
      });
      setIsUpdate(true);
    }
  },[]);
  
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

  // Funções Formulário
  function salvar(event) {
    event.preventDefault();
    const isValid = formIsValid();
    if (isValid.valid) {
      if(isUpdate) {
        putProduto(produto.id, produto)
          .then(response => {
            if (response.status === 200) {
              toast("Produto atualizado com successo.", 3000, true);
            }
          }).catch(error => {
            toast("Erro ao tentar atualizar o produto.", 3000, false);
        });
      } else {
        postProduto(produto)
          .then(response => {
            if (response.status === 201) {
              toast("Produto cadastrado com successo.", 3000, true)
            }
          }).catch(error => {
            toast("Erro ao tentar cadastrado o produto.", 3000, false)
        });
      }
    } else {
      toast(isValid.message, 3000, false);
    }
  }

  function limpar(event) {
    event.preventDefault();
    setProduto({
      id: 0,
      nome: '',
      categoria: '',
      minimo: 0,
      quantidade: 0,
    });
    event.target.blur();
  }

  // Validação formulário
  interface Valid {
    valid: boolean;
    message: string;
  };

  function formIsValid(): Valid {
    if (produto.categoria.length === 0){
      return { valid: false, message: 'Campo categoria é obrigatório!'};
    }
    const nomesCategorias = categorias.map(categoria => categoria['nome']);
    if (!nomesCategorias.includes(produto.categoria)){
      return { valid: false, message: 'Categoria inválida!'};
    }
    if (produto.nome.length === 0){
      return { valid: false, message: 'Campo nome do produto é obrigatório!'};
    }
    if (produto.nome.length < 3){
      return { valid: false, message: 'Nome do produto muito curto!'};
    }
    if (produto.minimo < 0){
      return { valid: false, message: 'Minimo não pode ser menor que zero!'};
    }
    if (produto.quantidade < 0){
      return { valid: false, message: 'Quantidade não pode ser menor que zero!'};
    }
    return { valid: true, message: ''};
  }
  
  return (
    <>
      <Card>
        <Card.Title>{isUpdate? 'Atualização de Produto' : 'Cadastro de Produto'}</Card.Title>
        <Card.Content>
          <Form onSubmit={(event) => salvar(event)}>
            { isUpdate
              &&
              <Form.Row>
                <FormField
                  label="Id"
                  type="number"
                  name="id"
                  value={produto.id}
                  onChange={null}
                  disabled={true}
                />
              </Form.Row>
            }
            <Form.Row>
              <FormField 
                label="Categoria *"
                type="text"
                name="categoria"
                value={produto.categoria}
                onChange={(event) => setProduto({...produto, categoria: event.target.value})}
                suggestions={categorias}
                width="50%"
              />
              <FormField
                label="Nome do Produto *"
                type="text"
                name="nome"
                value={produto.nome}
                onChange={(event) => setProduto({...produto, nome: event.target.value})}
                width="50%"
              />
            </Form.Row>
            <Form.Row>
              <FormField 
                label="Mínimo de Estoque *"
                type="number"
                name="minimo"
                value={produto.minimo}
                onChange={(event) => setProduto({...produto, minimo: event.target.value})}
                width="50%"
              />
              <FormField
                label="Quantidade *"
                type="number"
                name="quantidade"
                value={produto.quantidade}
                onChange={(event) => setProduto({...produto, quantidade: event.target.value})}
                width="50%"
              />
            </Form.Row>
            { isUpdate
              ?
              <Form.Row>
                <Button type="submit" color="success">
                  <FontAwesomeIcon icon={faSync} size="1x" />
                  Atualizar
                </Button>
                <Button type="button" onClick={() => router.push('/produtos/consulta') } color="warn">
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
                <Button type="button" onClick={(event) => limpar(event)} color="warn">
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
