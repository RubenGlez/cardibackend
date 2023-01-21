import express, { Router } from 'express'
import getUserController from '../controllers/user/getUserController'
import updateUserController from '../controllers/user/updateUserController'

const router: Router = express.Router()

router.get('/:userId', getUserController)
router.put('/:userId', updateUserController)

export default router
