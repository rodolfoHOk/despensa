import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card } from "../../../src/components/itens/card";
import { Form } from "../../../src/components/itens/form";
import FormField from "../../../src/components/itens/form-field";
import { Button } from "../../../src/components/itens/button";
import { Table } from "../../../src/components/itens/table";
import { MiniInput } from "../../../src/components/itens/mini-input";
import IconButton from "../../../src/components/itens/icon-button";
import Dialog from "../../../src/components/itens/dialog";
import Toast from "../../../src/components/itens/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Produto from "../../../src/screens/produto/produto";
import ToastStates from "../../../src/components/itens/toast/toast";
import Categoria from "../../../src/screens/categoria/categoria";
import { deleteProduto, getAllProdutos, getProdutos, patchProduto } from "../../../src/services/produtos";


export default function ConsultaProdutos({categorias}:{categorias: Categoria[]}) {

  const router = useRouter();

  // Campos Consulta
  const [ produtos, setProdutos ] = useState<Produto[]>([]);
  const [ consultar, setConsultar ] = useState({
    nome: '',
    categoria: ''
  });
  
  // Campos Tabela
  const [ showTable, setShowTable ] = useState(false);
  const [ selectedProduto, setSelectedProduto ] = useState({
    index: 0,
    id: 0,
    novaQtd: 0,
  });
  const [ showDeleteDialog, setShowDeleteDialog ] = useState(false);
    
  // Atributo e Função do Toast
  const [ toastState , setToastState ] = useState<ToastStates>({
    show: false,
    message: "",
    duration: 0,
    success: false,
  });
  
  function toast(message: string, duration: number, success: boolean){
    setToastState({show: true, message: message, duration: duration, success: success});
  }
    
  // Função Consulta
  function buscar(event: React.FormEvent){
    event.preventDefault();
    setShowTable(false);
    if ( consultar.nome === '' && consultar.categoria === ''){
      getAllProdutos()
        .then(response => {
          if(response.status === 200) {
            if (response.data.length === 0) {
              toast('Nenhum resultado encontrado', 3000, false);
            } else {
              setProdutos(response.data);
              setShowTable(true);
            }
          }
        }).catch(error => {
          toast('Erro ao tentar buscar por produtos', 3000, false);
      });
    } else {
      getProdutos(consultar)
        .then(response => {
          if(response.status === 200) {
            if (response.data.length === 0) {
              toast('Nenhum resultado encontrado', 3000, false);
            } else {
              setProdutos(response.data);
              setShowTable(true);
            }
          }
        }).catch(error => {
          toast('Erro ao tentar buscar por produtos', 3000, false);
      });
    }
  }
  
  // Funções Tabela
  function changeQuantidade(event, index, id){
    const valor = event.target.value;
    if (valor < 0) {
      toast('Quantidade não pode ser menor que zero.', 3000, false);
    } else if ( valor > 999) {
      toast('Quantidade não pode ser maior de 999.', 3000, false);
    } else {
      setSelectedProduto({index: index, id: id, novaQtd: parseFloat(valor)});
    }
  }

  function updateQuantidade(id: number){
    if(id === selectedProduto.id) {
      patchProduto(selectedProduto.id, selectedProduto.novaQtd)
        .then(response => {
          if (response.status === 200) {
            let novoProdutos = produtos;
            novoProdutos[selectedProduto.index].quantidade = selectedProduto.novaQtd;
            setProdutos(novoProdutos);
            toast('Quantidade atualizada com sucesso', 2000, true);
          }
        }).catch(error => {
          toast('Erro ao tentar atualizar a quantidade', 3000, false);
      });
    } else {
      toast('Erro: digite a nova quantidade novamente', 3000, false);
    }
  }

  function removerProduto() {
    deleteProduto(selectedProduto.id)
      .then(response => {
        toast("Produto deletado com sucesso.", 2000, true);
        let novoProdutos = produtos;
        novoProdutos.splice(selectedProduto.index, 1);
        setProdutos(novoProdutos);
        setShowDeleteDialog(false);
      }).catch(error => {
        toast("Erro ao tentar deletar o produto.", 3000, false);
    });
  }
   
  return (
    <>
      {/* Consulta */}
      <Card>
        <Card.Title>Consulta de Produtos</Card.Title>
        <Card.Content>
          <Form onSubmit={(event) => buscar(event)}>
            <Form.Row>
              <FormField
                label="Categoria"
                type="list"
                name="categoria"
                value={consultar.categoria}
                onChange={(event) => setConsultar({nome: consultar.nome, categoria: event.target.value})}
                suggestions={categorias}
                width="50%"
              />
              <FormField
                label="Nome do Produto"
                type="text"
                name="nome"
                value={consultar.nome}
                onChange={(event) => setConsultar({nome: event.target.value, categoria: consultar.categoria})}
                width="50%"
              />
            </Form.Row>
            <Form.Row>
              <Button type="submit" color="primary">
                <FontAwesomeIcon icon={faSearch}/>
                {' '}
                Consultar
              </Button>
            </Form.Row>
          </Form>
        </Card.Content>
      </Card>

      {/* Tabela */}
      {
      showTable
      &&
      <Card>
        <Card.Title>Resultado da busca</Card.Title>
        <Card.Content0padding>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Mín.</th>
                <th>Qtd</th>
                <th>Nova Qtd</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              { 
              produtos.map((produto, index) => (
                <tr id={`id_${index}`} key={`key_${index}`}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.categoria}</td>
                  <td>{produto.minimo}</td>
                  <td>{produto.quantidade}</td>
                  <td>
                    <MiniInput
                      type="number"
                      min="0"
                      max="999"
                      onChange={(event) => changeQuantidade(event, index, produto.id)}
                    />
                    <IconButton
                      id={`qtd-edit_${index}`}
                      tooltip="atualizar"
                      onClick={() => updateQuantidade(produto.id)}>
                      ✔️
                    </IconButton>
                  </td>
                  <td>
                    <IconButton 
                      id={`edit_${index}`}
                      tooltip="editar"
                      onClick={() => router.push(`/produtos/cadastro/${produto.id}`)}>
                      ✏️
                    </IconButton>
                    <IconButton 
                      id={`delete_${index}`}
                      tooltip="deletar"
                      onClick={() => {
                      setSelectedProduto({index: index, id: produto.id, novaQtd: 0});
                      setShowDeleteDialog(true);
                    }}>
                      🗑️
                    </IconButton>
                  </td>
                </tr>
              ))
              }
              <tr></tr>
            </tbody>
          </Table>
        </Card.Content0padding>
      </Card>
      }

      {/* Dialog */}
      <Dialog
        show={showDeleteDialog}
        title="Confirma a exclusão"
        message={`Você confirma a deleção do produto com o id: ${selectedProduto.id}?`}
        onConfirm={() => removerProduto()}
        onCancel={() => setShowDeleteDialog(false)}
      />
      
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

import db from '../../../db.json';
export async function getServerSideProps(context){
  
  const categorias = db["master@master"].categorias;
  // const nomesCategorias = list.map(item => item['nome']);

  return {
    props: { categorias }
  }
}