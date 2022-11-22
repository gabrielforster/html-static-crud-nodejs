import db from "../../db.js";

export async function createProduto(req, res) {
  const { nome, tipo, quantidade, valor } = req.body;

  try {
		const produtoData = { nome, tipo, quantidade, valor };
		const [rows] = await  db.query("select * from produto")
		produtoData.id = rows.length + 1
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
		res.json(rows)
	} catch (error) {
		console.error(error)
	}
}