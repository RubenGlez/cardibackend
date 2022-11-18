import express, { Router } from 'express'
import deleteUserController from '../controllers/user/deleteUserController'
import getUserController from '../controllers/user/getUserController'
import updateUserController from '../controllers/user/updateUserController'


const router: Router = express.Router()

router.get('/:userId', getUserController)
router.put('/:userId', updateUserController)
router.delete('/:userId', deleteUserController)

export default router
