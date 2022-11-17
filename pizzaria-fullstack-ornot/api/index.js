import { Router } from "express";

import saboresRoute from "./sabores/sabores.route.js";
import clientesRoute from "./cliente/cliente.route.js";
import produtosRoute from "./produto/produto.route.js";
import pedidosRoute from "./pedido/pedido.route.js";

const router = Router();

router.use("/sabores", saboresRoute);
router.use("/cliente", clientesRoute);
router.use("/produto", produtosRoute);
router.use("/pedido", pedidosRoute);

export default router;