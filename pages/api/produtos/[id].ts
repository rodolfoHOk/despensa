import { NextApiRequest, NextApiResponse } from "next";
import Produto from "../../../src/interface/produto";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../src/utils/mongodb";
import ProdutoComUsuario from "../../../src/interface/produto-usuario";
import mongo from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse<Produto|{message: string}>) => {
  const session = await getSession({req});
  
  if (session) {
    const { client, db } = await connectToDatabase();
    if (client.isConnected) {
      const { id } = req.query;
      const obj_id = new mongo.ObjectId(id.toString());
      
      if (req.method === 'PUT') {
        let produto: ProdutoComUsuario = await db.collection('produtos')
          .findOne({ _id : obj_id });
        produto.categoria = req.body.categoria;
        produto.nome = req.body.nome;
        produto.minimo = req.body.minimo;
        produto.quantidade = req.body.quantidade;
        const produtoOK = (await db.collection('produtos')
          .updateOne({ _id: obj_id }, { $set: {...produto}})).result.ok;
        if (produtoOK === 1) {
          res.status(200).json({ message: 'Produto atualizado com sucessso' });
        } else {
          res.status(500).json({ message: 'Erro ao tentar atualizar produto'});
        }
      
      } else if (req.method === 'PATCH') {
        const quantidadeOk = (await db.collection('produtos')
          .updateOne({ _id: obj_id }, { $set: { quantidade: req.body.quantidade }}))
          .result.ok;
        if (quantidadeOk === 1) {
          res.status(200).json({ message: 'Quantidade do produto atualizada com sucesso'});
        } else {
          res.status(500)
            .json({ message: 'Ocorreu um erro ao tentar atualizar a quantidade do produto'});
        }
      
      } else if (req.method === 'DELETE') {
        const deleteOk = (await db.collection('produtos')
          .deleteOne({ _id: obj_id })).result.ok;
        if (deleteOk === 1) {
          res.status(200).json({ message: 'Produto deletado com sucesso'});
        } else {
          res.status(500).json({ message: 'Ocorreu um erro ao tentar deletar o produto'});
        }
      
      } else {
        const produto: Produto = await db.collection('produtos')
          .findOne({ _id: obj_id }, { projection: { usuario: 0 }});
        res.status(200).json(produto);
      }

    } else {
      res.status(500).json({message: 'Ocorreu um erro, tente novamente mais tarde'});
    }
  } else {
    res.status(401).json({message: 'Não autorizado'});
  }
  res.end();
}
