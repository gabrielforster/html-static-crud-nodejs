import { Router } from 'express';
const router = Router();

import * as pedidoHandler from './pedido.handler.js';

router.get('/', pedidoHandler.getAllPedidos);
router.post('/fazer-pedido', pedidoHandler.createPedido)

export default router;