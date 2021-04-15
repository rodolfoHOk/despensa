import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../db.json';
import Categoria from "../../../src/screens/categoria/categoria";
import fs from 'fs';
import { getSession } from 'next-auth/client';


export default async (req: NextApiRequest, res: NextApiResponse<Categoria | {}>) => {
  
  const session = await getSession({req});
  
  if (session) {
    const { id } = req.query;
    var categorias = JSON.parse(JSON.stringify(db["master@master"].categorias));
    if (req.method === 'PUT') {
      categorias.some((categoria) => {
        if (categoria.id.toString() === id) {
          categoria.nome = req.body.nome;
          categoria.emoji = req.body.emoji;
          return true;
        }
      });
      db["master@master"].categorias = categorias;
      fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
      res.status(200).json({});
    } else if (req.method === 'DELETE') {
      const produtos = db["master@master"].produtos;
      const categoria = categorias.find(categoria => categoria.id.toString() === id);
      const temProduto = produtos.findIndex(produto => produto.categoria === categoria.nome);
      if (temProduto > 0) {
        res.status(400).json({'message': 'Categoria possui produtos cadastrados.'});
      } else {
        const index = categorias.findIndex(categoria => categoria.id.toString() === id);
        categorias.splice(index, 1);
        db["master@master"].categorias = categorias;
        fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
        res.status(200).json({});
      }
    } else {
      const categoria = categorias.find(categoria => categoria.id.toString() === id);
      res.status(200).json(categoria);
    }
  } else {
    res.status(401).json({});
  }
  res.end();
}
