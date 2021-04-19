import { NextApiRequest, NextApiResponse } from "next";
import Categoria from "../../../src/interface/categoria";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../src/utils/mongodb";
import CategoriaComUsuario from "../../../src/interface/categoria-usuario";
import { FilterQuery, FindOneOptions } from "mongodb";


export default async (req: NextApiRequest, res: NextApiResponse<Categoria[]|{message: string}>) => {
  const session = await getSession({req});

  if (session && session.user.email) {
    const { client, db } = await connectToDatabase();
    if (client.isConnected) {
      
      if (req.method === 'POST') {
        let categoria: Partial<CategoriaComUsuario> = {};
        categoria.usuario = session.user.email;
        categoria.nome = req.body.nome;
        categoria.emoji = req.body.emoji;
        const categoriaOk = (await db.collection('categorias')
          .insertOne( categoria )).result.ok;
        if (categoriaOk) {
          res.status(201).json({ message: 'Categoria cadastrada com sucesso' });
        } else {
          res.status(500).json({ message: 'Ocorreu um erro ao tentar cadastrar categoria' });
        }

      } else {
        var filterQuery: FilterQuery<CategoriaComUsuario> = {};
        filterQuery.usuario = session.user.email;
        const params = req.query;
        if (params.nome) {
          filterQuery.nome = new RegExp(`.*${params.nome}.*`, 'i');
        }
        const projection: FindOneOptions<CategoriaComUsuario> = { projection: { usuario: 0 }};
        const categorias: Categoria[] = await db.collection('categorias')
          .find(filterQuery, projection).toArray();
        res.status(200).json(categorias);
      }

    } else {
      res.status(500).json({ message: 'Ocorreu um erro, tente novamente mais tarde' });
    }
  } else {
    res.status(401).json({message: 'Não autorizado'});
  }
  res.end();
}
