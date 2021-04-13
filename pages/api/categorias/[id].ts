import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../db.json';
import Categoria from "../../../src/screens/categoria/categoria";
import fs from 'fs';


export default (request: NextApiRequest, response: NextApiResponse<Categoria | {}>) => {
  const { id } = request.query;
  var categorias = db["master@master"].categorias;
  if (request.method === 'PUT') {
    categorias.some((categoria) => {
      if (categoria.id.toString() === id) {
        categoria.nome = request.body.nome;
        categoria.emoji = request.body.emoji;
        return true;
      }
    });
    db["master@master"].categorias = categorias;
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(200).json({}); 
  } else if (request.method === 'DELETE'){
    const index = categorias.findIndex(categoria => categoria.id.toString() === id);
    categorias.splice(index, 1);
    db["master@master"].categorias = categorias;
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(200).json({});
  } else {
    const categoria = categorias.find(categoria => categoria.id.toString() === id);
    response.status(200).json(categoria);
  }
}
