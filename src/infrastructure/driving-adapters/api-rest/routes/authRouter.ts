import express, { Router } from 'express'
import {
  signUpController,
  signInController
} from '../controllers'

const router: Router = express.Router()

router.post('/signup', signUpController)
router.post('/signin', signInController)

export default router
