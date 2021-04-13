import Categoria from "../screens/categoria/categoria";
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

export function getCategoriaById(id: number){
  return apiClient.get(`${url}/${id}`);
}

export function putCategoria(id: number, categoria: Categoria){
  return apiClient.put(`${url}/${id}`, categoria);
}

export function deleteCategoria(id: number) {
  return apiClient.delete(`${url}/${id}`);
}
