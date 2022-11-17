import { Router } from "express"

import * as saboresHandler from './sabores.handler.js'

const router = Router()

router.get('/', saboresHandler.getAll)
router.get('/:id', saboresHandler.getById)
router.post('/cadastrar-sabor', saboresHandler.create)
router.delete('/:id', saboresHandler.deleteOne)

export default router;