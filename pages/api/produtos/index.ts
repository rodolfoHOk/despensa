import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../db.json';
import Produto from "../../../src/screens/produto/produto";
import fs from 'fs';

export default (request: NextApiRequest, response: NextApiResponse<Produto[]>) => {
  const produtos = db["master@master"].produtos;
  if (request.method === 'POST') {
    const listaIds = produtos.map(produto => produto['id']);
    const proximoId = Math.max(...listaIds) + 1;
    let produto = request.body;
    produto.id = proximoId;
    produto.minimo = parseFloat(produto.minimo);
    produto.quantidade = parseFloat(produto.quantidade);
    db["master@master"].produtos.push(produto);
    fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
    response.status(201).json(produto);
  } else {
    const params = request.query;
    if (JSON.stringify(params) === JSON.stringify({})) {
      response.status(200).json(produtos);
    } else {
      var listaFiltrada = [];
      if (params.categoria) {
        listaFiltrada = produtos.filter(produto => produto.categoria === params.categoria);
        if (params.nome) {
          listaFiltrada = listaFiltrada.filter(produto => produto.nome.toLowerCase().includes(params.nome.toString().toLowerCase()));
        }
      } else if (params.nome) {
        listaFiltrada = produtos.filter(produto => produto.nome.toLowerCase().includes(params.nome.toString().toLowerCase()));
      }
      response.status(200).json(listaFiltrada);
    }
  }
}
