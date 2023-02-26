import express, { Router } from 'express'
import getUserController from '../controllers/user/getUserController.common'
import updateUserController from '../controllers/user/updateUserController.common'

const router: Router = express.Router()

router.get('/:userId', getUserController)
router.put('/:userId', updateUserController)

export default router
