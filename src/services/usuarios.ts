import apiClient from "./apiClient"


const url = '/usuarios'

export function postUsuario({email}:{email: string}) {
  return apiClient.post(url, { email: email });
}

export function getUsuario(){
  return apiClient.get(url);
}
