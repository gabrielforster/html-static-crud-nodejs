import { Router } from 'express';
const router = Router();

import * as produtoHandler from './produto.handler.js';

router.get('/', produtoHandler.getAllProducts);
router.get('/:id', produtoHandler.getOne)
router.post('/edit', produtoHandler.editProduct);
router.post('/cadastrar-produto', produtoHandler.createProduto);
router.delete('/:id', produtoHandler.deleteProduct)

export default router;