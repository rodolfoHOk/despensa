import Produto from "../interface/produto";
import apiClient from "./apiClient";

const url = '/produtos'

export function getAllProdutos(){
  return apiClient.get(url);
}

export function getProdutos({nome, categoria}:{nome: string, categoria: string}){
  return apiClient.get(url, {
    params: {
      nome: nome,
      categoria: categoria
    }
  });
}

export function postProduto(produto: Produto) {
  return apiClient.post(url, produto);
}

export function getProdutoPorId(_id: string) {
  return apiClient.get(`${url}/${_id}`);
}

export function putProduto(_id: string, produto: Produto) {
  return apiClient.put(`${url}/${_id}`, produto);
}

export function deleteProduto(_id: string) {
  return apiClient.delete(`${url}/${_id}`);
}

export function patchProduto(_id: string, quantidade: number) {
  return apiClient.patch(`${url}/${_id}`, {quantidade: quantidade});
}
