import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../src/utils/mongodb";


export default async (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const session = await getSession({req});
  if (session && session.user.email) {
    const { client, db } = await connectToDatabase();
    if (req.method === 'POST') {
      const usuario = await db.collection("usuarios")
        .find({usuario: session.user.email}).toArray();
      if (usuario.length === 1) {
        res.status(200).json({isUsuario : true});
      } else {
        if (req.body.email === session.user.email) {
          if (client.isConnected ) {
            var categorias = await db.collection('categorias')
              .find({ usuario: "master@master"},{projection: { _id: 0 }})
              .toArray();
            categorias.forEach(categoria => categoria.usuario = session.user.email);
            const categoriasOk = (await db.collection('categorias').insertMany(categorias)).result.ok;
            var produtos = await db.collection('produtos')
              .find({ usuario : "master@master"}, {projection: { _id: 0 }})
              .toArray();
            produtos.forEach(produto => produto.usuario = session.user.email);
            const produtosOk = (await db.collection('produtos').insertMany(produtos)).result.ok;
            if (categoriasOk === 1 && produtosOk === 1) {
              const usuarioOk = (await db.collection('usuarios').insertOne({"usuario": session.user.email})).result.ok
              if (usuarioOk === 1) {
                res.status(201).json({email: session.user.email});
              } else {
                res.status(500).json({message : 'ocorreu um erro, se persistir contate o administrador'});
              }
            } else {
              res.status(500).json({message : 'ocorreu um erro, tente novamente'});
            }
          } else {
            res.status(500).json({message : 'ocorreu um erro, tente novamente mais tarde'});
          }
        } else {
          res.status(404).json({message : 'Erro com o email informado'});
        }
      }
    } else {
      const usuario = await db.collection("usuarios")
        .find({usuario: session.user.email}).toArray();
      if (usuario.length === 1) {
        res.status(200).json({isUsuario : true});
      } else {
        res.status(200).json({isUsuario : false});
      }
    }
  } else {
    res.status(401).json({});
  }
  res.end();
}
