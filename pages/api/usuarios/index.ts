import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import db from '../../../db.json';
import fs from 'fs';


export default async (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const session = await getSession({req});
  if (session) {
    if (req.method === 'POST') {
      console.log(req.body);
      if(req.body.email === session.user.email){
        var novoDb = JSON.parse(JSON.stringify(db));
        const novoUsuario = novoDb[session.user.email] = {
          categorias : db["master@master"].categorias,
          produtos: db["master@master"].produtos,
        }
        fs.writeFileSync('/media/rodolfo/Repositorio/Programacao/linux/react-workspace/despensa/db.json', JSON.stringify(novoDb));
        res.status(201).json({email : session.user.email});
      } else {
        res.status(404).json({message : 'Erro com o email informado'});
      }
    } else {
      if (db[session.user.email]){
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
