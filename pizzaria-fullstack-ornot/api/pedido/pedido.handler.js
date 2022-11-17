import db from "../../db.js";

export async function getAllPedidos(req, res) {
  const pedidos = await db.query("SELECT * FROM pedido");
  res.json(pedidos.rows);
}

export async function createPedido(req, res) {
  const [produtos] = await db.query("SELECT * FROM produto");

  const {
    cliente,
    "tamanho-pizza": tamanho,
    sabor1,
    sabor2,
    sabor3,
    sabor4,
    "tipo-retirada": retirada,
  } = req.body;

  const [pedidos] = await db.query("SELECT * FROM pedido");
  const [pizzas] = await db.query("SELECT * FROM pizza");

  const idPedido = pedidos.length + 1;
  const idPizza = pizzas.length + 1;

  const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const pedidoData = {
    id: idPedido,
    id_cliente: cliente,
    data_hora: formattedDate,
    retirada_entrega: retirada,
  };

  const pizzaData = {
    id: idPizza,
    tamanho,
    sabor1,
    sabor2,
    sabor3,
    sabor4,
  };

  const produtosPedido = produtos.filter((produto) => req.body[produto.nome]);

	const precoProdutos = produtosPedido.reduce((acc, produto) => {
		return acc + produto.valor
	}, 0)
	console.log(precoProdutos)

	const produtosPedidoData = produtosPedido.map((produto) => {
    return {
			id: new Date().getTime(),			
      id_pedido: idPedido,
      id_produto: produto.id,
    };
  });

	const pizzaPedidoData = {
		id: new Date().getTime(),
		id_pedido: idPedido,
		id_pizza: idPizza
	}

	//TODO SUM ALL VALUES TO GET THE VALOR_TOTAL
	return 

  try {

  } catch (error) {
    console.log(error);
  }

  res.redirect("/fazer-pedido");
}
