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

export function getProdutoPorId(id: number) {
  return apiClient.get(`${url}/${id}`);
}

export function putProduto(id: number, produto: Produto) {
  return apiClient.put(`${url}/${id}`, produto);
}

export function deleteProduto(id: number) {
  return apiClient.delete(`${url}/${id}`);
}

export function patchProduto(id: number, quantidade: number) {
  return apiClient.patch(`${url}/${id}`, {quantidade: quantidade});
}
