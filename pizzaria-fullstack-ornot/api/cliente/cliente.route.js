import { Router } from 'express';
const router = Router();

import * as clienteHandler from './cliente.handler.js';

router.get('/', clienteHandler.getAllClients);
router.post('/cadastrar-cliente', clienteHandler.createUser)

export default router;