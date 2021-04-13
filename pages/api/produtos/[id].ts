import { NextApiRequest, NextApiResponse } from "next";
import Produto from "../../../src/screens/produto/produto";
import db from '../../../db.json';
import fs from 'fs';

export default (request: NextApiRequest, response: NextApiResponse<Produto | {}>) => {
  var produtos = db["master@master"].produtos;
  const { id } = request.query;
  if (request.method === 'PUT') {
    produtos.some(produto => {
      if (produto.id.toString() === id) {
        produto.nome = request.body.nome;
        produto.categoria = request.body.categoria;
        produto.minimo = request.body.minimo;
        produto.quantidade = request.body.quantidade;
        return true;
      }
    });
    db["master@master"].produtos = produtos;
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(200).json({});
  } else if (request.method === 'PATCH') {
    produtos.some(produto => {
      if (produto.id.toString() === id) {
        produto.quantidade = request.body.quantidade;
        return true;
      }
    });
    db["master@master"].produtos = produtos;
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(200).json({});
  } else if (request.method === 'DELETE') {
    const index = produtos.findIndex(produto => produto.id.toString() === id);
    produtos.splice(index, 1);
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(200).json({});
  } else {
    const produto = produtos.find(produto => produto.id.toString() === id);
    response.status(200).json(produto);
  }
}
