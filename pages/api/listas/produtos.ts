import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import db from '../../../db.json';
import Produto from "../../../src/screens/produto/produto";

export default async (req: NextApiRequest, res: NextApiResponse<Produto[]>) => {
  const session = await getSession({req});
  if (session) {
    const produtos = JSON.parse(JSON.stringify(db["master@master"].produtos));
    const produtosEmEstoque = produtos.filter(produto => produto.quantidade > 0);
    let produtosEmEstoqueOrdenado: Produto[];
    if(produtosEmEstoque.length > 1) {
      produtosEmEstoqueOrdenado = ordenar(produtosEmEstoque);
    } else {
      produtosEmEstoqueOrdenado = produtosEmEstoque;
    }
    res.status(200).json(produtosEmEstoqueOrdenado);
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
