import express, { Router } from 'express'
import { errorController, notFoundController } from '../controllers'
import { authenticationMiddleware } from '../middlewares'
import authRouter from './authRouter'
import cardRouter from './cardRouter'
import companyRouter from './companyRouter'
import preferencesRouter from './preferencesRouter'
import promotionRouter from './promotionRouter'
import userRouter from './userRouter'

const router: Router = express.Router()

router.use('/auth', authRouter)
router.use('/cards', authenticationMiddleware, cardRouter)
router.use('/companies', authenticationMiddleware, companyRouter)
router.use('/promotions', authenticationMiddleware, promotionRouter)
router.use('/users', authenticationMiddleware, userRouter)
router.use('/preferences', authenticationMiddleware, preferencesRouter)

router.use(notFoundController)
router.use(errorController)

export default router
