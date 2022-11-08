import { Router } from "express";

import saboresRoute from "./sabores/sabores.route.js";

const router = Router();

router.use("/sabores", saboresRoute);

export default router;