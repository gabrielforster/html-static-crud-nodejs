import db from "../../db.js";

export async function createProduto(req, res) {
  const { nome, tipo, quantidade, valor } = req.body;

  try {
		const produtoData = { nome, tipo, quantidade, valor };
		produtoData.id = new Date().getTime() / 10000
		await db.query('INSERT INTO produto SET ?', produtoData, (err, result) => {
			if (err) throw err;
		});
		
    res.redirect("/cadastrar-produto");
  } catch (error) {
		console.error(error)
	}
}

export async function getAllProducts(req, res) {
	try {
		const [rows] = await db.query("SELECT * FROM produto");
		res.json(rows);
	} catch (error) {
		console.error(error)
	}
}

export async function getOne(req, res){
	try {
		const [rows] = await db.query("SELECT * FROM produto WHERE id = ?", [req.params.id])
		res.json(rows[0])
	} catch (error) {
		console.error(error)
	}
}

export async function editProduct(req, res){
	const { id, nome, quantidade, valor } = req.body;
	try {
		await db.query("UPDATE produto SET nome = ?, quantidade = ?, valor = ? WHERE id = ?", [nome, quantidade, valor, id])
		res.redirect("/produtos");
	} catch (error) {
		console.error(error)
	}
}

export async function deleteProduct(req, res){
	const { id } = req.params;
	try {
		// force delete the produto with the given id
		await db.query("DELETE FROM produto WHERE id = ?", [id])
		res.status(200).json({ message: "Produto deletado com sucesso!" })
	} catch (error) {
		console.error(error)
	}
}
