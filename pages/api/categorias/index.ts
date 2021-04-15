import { NextApiRequest, NextApiResponse } from "next";
import Categoria from "../../../src/screens/categoria/categoria";
import db from '../../../db.json';
import fs from 'fs';
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse<Categoria[]>) => {
  
  const session = await getSession({req});

  if (session) {
    const categorias = db["master@master"].categorias;
    if (req.method === 'POST') {
      const listaIds = categorias.map(categoria => categoria['id']);
      const proximoId = Math.max(...listaIds) + 1;
      let categoria = req.body;
      categoria.id = proximoId;
      db["master@master"].categorias.push(categoria);
      fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(db));
      res.status(201).json(categoria);
    } else {
      const params = req.query;
      if (JSON.stringify(params) === JSON.stringify({})) {
        res.status(200).json(categorias);
      } else {
        var listaFiltrada = categorias.filter(categoria => categoria.nome.toLowerCase().includes(params.nome.toString().toLowerCase()));
        res.status(200).json(listaFiltrada);
      }
    }
  } else {
    res.status(401).json([]);
  }
  res.end();
}
