import db from "../../db.js";

export async function getAllPedidos(req, res){
    const pedidos = await db.query("SELECT * FROM pedido");
    res.json(pedidos.rows);
}

export async function createPedido(req, res){
    res.json(req.body);
}