import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import db from '../../../db.json';
import Produto from "../../../src/interface/produto";

export default async (req: NextApiRequest, res: NextApiResponse<Produto[]>) => {
  const session = await getSession({req});
  if (session) {
    const produtos = JSON.parse(JSON.stringify(db[session.user.email].produtos));
    let produtosEmFalta = produtos.filter(produto => produto.quantidade < produto.minimo);
    let produtosEmFaltaOrdenado: Produto[];
    if(produtosEmFalta.length > 1) {
      produtosEmFaltaOrdenado = ordenar(produtosEmFalta);
    } else {
      produtosEmFaltaOrdenado = produtosEmFalta;
    }
    res.status(200).json(produtosEmFaltaOrdenado);
  } else {
    res.status(401).json([]);
  }
  res.end();
}

function ordenar(produtos : Produto[]): Produto[] {
  produtos.sort((a,b) => sortFunc(a,b));
  return produtos;
}

function sortFunc(a: Produto, b: Produto) {
  var c1 = a['categoria'].toLowerCase();
  var c2 = b['categoria'].toLowerCase();

  var n1 = a['nome'].toLowerCase();
  var n2 = b['nome'].toLowerCase();

  if (c1 < c2) return -1;
  if (c1 > c2) return 1;
  if (n1 < n2) return -1;
  if (n1 > n2) return 1;
  return 0;
}
