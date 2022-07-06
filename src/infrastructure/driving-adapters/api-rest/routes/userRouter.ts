import express, { Router } from 'express'
import {
  deleteUserController,
  getUserController,
  updateUserController
} from '../controllers'

const router: Router = express.Router()

router.get('/:userId', getUserController)
router.put('/:userId', updateUserController)
router.delete('/:userId', deleteUserController)

export default router
