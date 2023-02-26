import express, { Router } from 'express'
import commonAuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.common'
import authRouter from './authRouter'
import preferencesRouter from './preferencesRouter'
import userRouter from './userRouter'

const router: Router = express.Router()

router.use('/auth', authRouter)

router.use('/preferences', commonAuthenticationMiddleware, preferencesRouter)
router.use('/users', commonAuthenticationMiddleware, userRouter)


export default router
