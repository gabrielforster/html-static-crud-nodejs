import db from "../../db.js";

export async function getAllPedidos(req, res) {
  const [sabores] = await db.query("SELECT * FROM sabores")
  const [pedidos] = await db.query("SELECT * FROM pedido");
  const [pizza_pedido] = await db.query("SELECT * FROM pizza_pedido")
  const [pizzas] = await db.query("SELECT * FROM pizza")
  const [produtos] = await db.query("SELECT * FROM produto")
  const [produtos_pedido] = await db.query("SELECT * FROM produto_pedido")
  const [clientes] = await db.query("SELECT * FROM cliente")
  const [enderecos] = await db.query("SELECT * FROM endereco")
  
  function getSabor(id = null) {
    if (id) {
      return sabores.find(pizza => pizza.id === id).nome
    }
    return null
  }

  //format pedidos so it has correponded pizza(with the sabores name), and produtos name
  const pedidosFormatted = pedidos.map(pedido => {
    const pizza_pedidoFiltered = pizza_pedido
    .filter(pizza_pedido_item => pizza_pedido_item.id_pedido === pedido.id)
    .map(pizza_pedido_item => {
      const pizza = pizzas.find(pizza => pizza.id === pizza_pedido_item.id_pizza)
      
      return {
        tamanho: pizza.tamanho,
        sabor1: getSabor(pizza.sabor1),
        sabor2: getSabor(pizza.sabor2),
        sabor3: getSabor(pizza.sabor3),
        sabor4: getSabor(pizza.sabor4),
      }
    })
    
    const produtos_pedidoFiltered = produtos_pedido.filter(produto_pedido => produto_pedido.id_pedido === pedido.id)
    .map(produto_pedido => {
      const produto = produtos.find(produto => produto.id === produto_pedido.id_produto)

      return produto.nome
    })
    
    const cliente = {...clientes.find(cliente => cliente.id = pedido.id_cliente)}

    return {
      ...pedido,
      cliente:{
        ...cliente,
        endereco: enderecos.find(endereco => endereco.id_endereco === cliente.id_endereco)
      },
      pizzas: pizza_pedidoFiltered,
      produtos: produtos_pedidoFiltered
    }
  })
  res.json(pedidosFormatted);
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
