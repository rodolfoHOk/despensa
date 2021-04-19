import { NextApiRequest, NextApiResponse } from "next";
import Produto from "../../../src/interface/produto";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../src/utils/mongodb";
import ProdutoComUsuario from "../../../src/interface/produto-usuario";
import { FilterQuery, FindOneOptions } from "mongodb";


export default async (req: NextApiRequest, res: NextApiResponse<Produto[]|{message: string}>) => {
  const session = await getSession({req});

  if (session && session.user.email) {
    const { client, db } = await connectToDatabase();
    if (client.isConnected) {
      
      if (req.method === 'POST') {
        let produto: Partial<ProdutoComUsuario> = {};
        produto.usuario = session.user.email;
        produto.nome = req.body.nome;
        produto.categoria = req.body.categoria;
        produto.minimo = parseFloat(req.body.minimo);
        produto.quantidade = parseFloat(req.body.quantidade);
        const produtoOk = (await db.collection('produtos')
          .insertOne( produto )).result.ok;
        if (produtoOk === 1) {
          res.status(201).json({message: 'Produto cadastrado com sucesso'});
        } else {
          res.status(500).json({message: 'Erro ao tentar cadastrar o produto'});
        }
      
      } else {
        const params = req.query;
        var filterQuery: FilterQuery<ProdutoComUsuario> = {};
        filterQuery.usuario = session.user.email;
        if (params.categoria) {
          filterQuery.categoria = new RegExp(params.categoria.toString(), 'i');
        }
        if (params.nome) {
          filterQuery.nome = new RegExp(`.*${params.nome}.*`, 'i');
        }
        const projection: FindOneOptions<ProdutoComUsuario> = { projection: { usuario : 0 }};
        const produtos: Produto[] = await db.collection('produtos')
          .find(filterQuery, projection).toArray();
        res.status(200).json(produtos);
      }
    
    } else {
      res.status(500).json({message : 'Ocorreu um erro, tente novamente mais tarde'});
    }
  } else {
    res.status(401).json({message: 'Não autorizado'});
  }
  res.end();
}
