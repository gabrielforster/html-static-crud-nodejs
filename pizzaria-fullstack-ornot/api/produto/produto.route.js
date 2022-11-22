import { Router } from 'express';
const router = Router();

import * as produtoHandler from './produto.handler.js';

router.get('/', produtoHandler.getAllProducts);
router.get('/:id', produtoHandler.getOne)
router.post('/cadastrar-produto', produtoHandler.createProduto);

export default router;