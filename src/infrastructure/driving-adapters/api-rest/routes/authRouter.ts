import express, { Router } from 'express'
import signInController from '../controllers/auth/signInController'
import signUpController from '../controllers/auth/signUpController'

const router: Router = express.Router()

router.post('/signup', signUpController)
router.post('/signin', signInController)

export default router
