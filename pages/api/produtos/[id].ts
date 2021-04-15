import { NextApiRequest, NextApiResponse } from "next";
import Produto from "../../../src/screens/produto/produto";
import db from '../../../db.json';
import fs from 'fs';
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse<Produto | {}>) => {
  
  const session = await getSession({req});

  if (session) {
    var produtos = db["master@master"].produtos;
    const { id } = req.query;
    if (req.method === 'PUT') {
      produtos.some(produto => {
        if (produto.id.toString() === id) {
          produto.nome = req.body.nome;
          produto.categoria = req.body.categoria;
          produto.minimo = req.body.minimo;
          produto.quantidade = req.body.quantidade;
          return true;
        }
      });
      db["master@master"].produtos = produtos;
      fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
      res.status(200).json({});
    } else if (req.method === 'PATCH') {
      produtos.some(produto => {
        if (produto.id.toString() === id) {
          produto.quantidade = req.body.quantidade;
          return true;
        }
      });
      db["master@master"].produtos = produtos;
      fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
      res.status(200).json({});
    } else if (req.method === 'DELETE') {
      const index = produtos.findIndex(produto => produto.id.toString() === id);
      produtos.splice(index, 1);
      fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
      res.status(200).json({});
    } else {
      const produto = produtos.find(produto => produto.id.toString() === id);
      res.status(200).json(produto);
    }
  } else {
    res.status(401).json({});
  }
  res.end();
}
