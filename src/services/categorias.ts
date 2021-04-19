import Categoria from "../interface/categoria";
import apiClient from "./apiClient";


const url = '/categorias';

export function getAllCategorias(){
  return apiClient.get(url);
}

export function getCategorias({nome}:{nome: string}){
  return apiClient.get(url, {
    params: {
      nome: nome
    }
  });
}

export function postCategoria(categoria: Categoria){
  return apiClient.post(url, categoria);
}

export function getCategoriaById(_id: string){
  return apiClient.get(`${url}/${_id}`);
}

export function putCategoria(_id: string, categoria: Categoria){
  return apiClient.put(`${url}/${_id}`, categoria);
}

export function deleteCategoria(_id: string) {
  return apiClient.delete(`${url}/${_id}`);
}
