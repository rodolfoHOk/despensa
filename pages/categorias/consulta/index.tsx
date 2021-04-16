import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "../../../src/components/itens/button";
import { Card } from "../../../src/components/itens/card";
import { Form } from "../../../src/components/itens/form";
import FormField from "../../../src/components/itens/form-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table } from "../../../src/components/itens/table";
import Categoria from "../../../src/interface/categoria";
import IconButton from "../../../src/components/itens/icon-button";
import Dialog from "../../../src/components/itens/dialog";
import Toast from "../../../src/components/itens/toast";
import ToastStates from "../../../src/components/itens/toast/toast";
import { getAllCategorias, getCategorias, deleteCategoria } from "../../../src/services/categorias";
import { useSession } from "next-auth/client";
import Loading from "../../../src/components/itens/loading";
import Unauthorized from "../../unauthorized";


export default function ConsultaCategorias(){
  const [ session, loading ] = useSession();

  if (loading) return <Loading/>

  if (!loading && !session) return <Unauthorized/>

  const router = useRouter();

  // Formulário Consulta
  const [ dadosConsulta, setDadosConsulta ] = useState({
    nome: ''
  });
  const [ resultados, setResultados ] = useState<Categoria[]>([]);

  function consultar(event: React.FormEvent){
    event.preventDefault();
    setShowTable(false);
    if (dadosConsulta.nome === '') {
      getAllCategorias()
        .then(response => {
          if (response.data.length === 0) {
            toast('Nenhum resultado encontrado', 3000, false);
            setResultados([]);
          } else {
            setResultados(response.data);
            setShowTable(true);
          }
        }).catch(error => {
          toast('Erro ao tentar buscar categorias', 3000, false);
      });
    } else {
      getCategorias(dadosConsulta)
        .then(response => {
          if (response.data.length === 0) {
            toast('Nenhum resultado encontrado', 3000, false);
            setResultados([]);
          } else {
            setResultados(response.data);
            setShowTable(true);
          }
        }).catch(error => {
          toast('Erro ao tentar buscar categorias', 3000, false);
      });
    }
  }

  function limpar(event) {
    event.preventDefault();
    setDadosConsulta({
      nome: ''
    });
    event.target.blur();
  }  

  // Tabela Resultado
  const [ showTable, setShowTable ] = useState(false);
  const [ resultadoSelecionado, setResultadoSelecionado ] = useState<Categoria>({
    id: 0,
    nome: '',
    emoji: ''
  });
  const [ deleteIndex, setDeleteIndex ] = useState(0);

  function removeCategoria(){
    deleteCategoria(resultadoSelecionado.id)
      .then(response => {
        if (response.status === 200) {
          resultados.splice(deleteIndex, 1);
          toast('Categoria deletada com sucesso', 3000, true);
          setShowDialog(false);
        }
      }).catch (error => {
        if (error.response.status === 400) {
          toast(error.response.data.message, 3000, false);
        }else {
          toast("Erro ao tentar deletar categoria", 3000, false);
        }
    });
  }

  // Dialog
  const [ showDialog, setShowDialog ] = useState(false);

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

  return(
    <>
      {/* Consulta */}
      <Card>
        <Card.Title>Consulta de Categorias</Card.Title>
        <Card.Content>
          <Form onSubmit={(event) => consultar(event)}>
            <Form.Row>
              <FormField
                label="Nome da Categoria"
                type="text"
                name="nome"
                value={dadosConsulta.nome}
                onChange={(event) => setDadosConsulta({nome: event.target.value})}
              />
            </Form.Row>
            <Form.Row>
              <Button>
                <FontAwesomeIcon icon={faSearch} />
                Consultar
              </Button>
              <Button type="button" onClick={(event) => limpar(event)} color="warn">
                <FontAwesomeIcon icon={faBroom} />
                Limpar
              </Button>
            </Form.Row>
          </Form>
        </Card.Content>
      </Card>
      {/* Resultado da consulta */}
      {
        showTable
        &&
        <Card>
          <Card.Title>Resultado da Consulta</Card.Title>
          <Card.Content0padding>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Emoji</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                { resultados.map((resultado, index) => (
                  <tr id={`id_${index}`} key={`key_${index}`}>
                    <td>{resultado.id}</td>
                    <td>{resultado.emoji}</td>
                    <td>{resultado.nome}</td>
                    <td>
                      <IconButton
                        id={`edit_${index}`}
                        tooltip="editar"
                        onClick={() => router.push(`/categorias/cadastro/${resultado.id}`)}
                      >
                        ✏️
                      </IconButton>
                      <IconButton
                        id={`delete_${index}`}
                        tooltip="deletar"
                        onClick={() => {
                          setResultadoSelecionado({id: resultado.id, nome: resultado.nome, emoji: resultado.emoji});
                          setDeleteIndex(index);
                          setShowDialog(true);
                        }}
                      >
                        🗑️
                      </IconButton>
                    </td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Card.Content0padding>
        </Card>
      }
      {/* Dialog */}
      <Dialog
        show={showDialog}
        title="Confirma a exclusão"
        message={`Você confirma a exclusão da categoria de id: ${resultadoSelecionado.id}`}
        onConfirm={() => removeCategoria()}
        onCancel={() => setShowDialog(false)}
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
