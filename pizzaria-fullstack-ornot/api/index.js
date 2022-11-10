import { Router } from "express";

import saboresRoute from "./sabores/sabores.route.js";
import clientesRoute from "./cliente/cliente.route.js";
const router = Router();

router.use("/sabores", saboresRoute);
router.use("/cliente", clientesRoute);

export default router;