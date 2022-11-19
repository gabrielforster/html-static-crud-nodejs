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

  const produtosPedido = produtos.filter((produto) => req.body[produto.nome]);

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

	const produtosPedidoData = produtosPedido.map((produto) => {
    return {
			id: new Date().getTime() / Math.random(),			
      id_pedido: idPedido,
      id_produto: produto.id,
    };
  });

	const pizzaPedidoData = {
		id: new Date().getTime() / Math.random(),
		id_pedido: idPedido,
		id_pizza: idPizza
	}

	//TODO SUM ALL VALUES TO GET THE VALOR_TOTAL

	const precoProdutos = produtosPedido.reduce((acc, produto) => {
		return acc + produto.valor
	}, 0)

  async function getPrecoSabor(saborId = undefined){
    if(!saborId) return 0
    const [sabor] = await db.query("SELECT * FROM sabores WHERE id = ?", [saborId])
    return Number(sabor[0].valor)
  } 

  const precoPizza = async () => {
    const precos = [await getPrecoSabor(sabor1), await getPrecoSabor(sabor2), await getPrecoSabor(sabor3), await getPrecoSabor(sabor4)]
    return precos.reduce((acc, preco) => acc + preco, 0)
  }

  const splited = precoProdutos.split('.')
  const finalPrecoProduto = splited.reduce((acc, p) => acc + Number(p), 0)

  const valorTotal = finalPrecoProduto + (await precoPizza())

  pedidoData.valor_total = valorTotal

  try {

    await db.query("INSERT INTO pedido SET ?", [pedidoData]);
    await db.query("INSERT INTO pizza SET ?", [pizzaData]);
    await db.query("INSERT INTO pizza_pedido SET ?", [pizzaPedidoData]);
    await produtosPedidoData.forEach(async data => {
      await db.query("INSERT INTO produto_pedido SET ?", [data]);
    })

  } catch (error) {
    console.error(error);
  }

  res.redirect("/fazer-pedido");
}
