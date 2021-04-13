import { NextApiRequest, NextApiResponse } from "next";
import Categoria from "../../../src/screens/categoria/categoria";
import db from '../../../db.json';
import fs from 'fs';

export default (request: NextApiRequest, response: NextApiResponse<Categoria[]>) => {
  const categorias = db["master@master"].categorias;
  if (request.method === 'POST') {
    const listaIds = categorias.map(categoria => categoria['id']);
    const proximoId = Math.max(...listaIds) + 1;
    let categoria = request.body;
    categoria.id = proximoId;
    db["master@master"].categorias.push(categoria);
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(201).json(categoria);
  } else {
    const params = request.query;
    if (JSON.stringify(params) === JSON.stringify({})) {
      response.status(200).json(categorias);
    } else {
      var listaFiltrada = categorias.filter(categoria => categoria.nome.toLowerCase().includes(params.nome.toString().toLowerCase()));
      response.status(200).json(listaFiltrada);
    }
  }
}
