import { NextApiRequest, NextApiResponse } from "next";
import Categoria from "../../../src/interface/categoria";
import { getSession } from 'next-auth/client';
import { connectToDatabase } from "../../../src/utils/mongodb";
import mongo from 'mongodb';
import CategoriaComUsuario from "../../../src/interface/categoria-usuario";


export default async (req: NextApiRequest, res: NextApiResponse<Categoria|{message: string}>) => {
  const session = await getSession({req});

  if (session) {
    const { client, db } = await connectToDatabase();
    if (client.isConnected) {
      const { id } = req.query;
      const obj_id = new mongo.ObjectId(id.toString());

      if (req.method === 'PUT') {
        let categoria: CategoriaComUsuario = await db.collection('categorias')
          .findOne({ _id: obj_id });
        categoria.nome = req.body.nome;
        categoria.emoji = req.body.emoji;
        const categoriaOk = (await db.collection('categorias')
          .updateOne({ _id: obj_id }, { $set: {...categoria}})).result.ok;
        if (categoriaOk) {
          res.status(200).json({ message: 'Categoria atualizada com sucesso' });
        } else {
          res.status(500).json({ message: 'Ocorreu um erro ao tentar atualizar categoria' });
        }
      
      } else if (req.method === 'DELETE') {
        const deleteOk = (await db.collection('categorias')
          .deleteOne({ _id: obj_id })).result.ok;
        if (deleteOk) {
          res.status(200).json({ message: 'Categoria deletada com sucesso' });
        } else {
          res.status(500).json({ message: 'Ocorreu um erro ao tentar deletar a categoria' });
        }
      
      } else {
        const categoria: Categoria = await db.collection('categorias')
          .findOne({ _id: obj_id }, { projection : { usuario: 0 }});
        res.status(200).json(categoria);
      }
    
    } else {
      res.status(200).json({ message: 'Ocorreu um erro, tente novamente mais tarde' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado' });
  }
  res.end();
}
