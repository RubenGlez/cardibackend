import express, { Router } from 'express'
import { authenticationMiddleware } from '../middlewares'
import authRouter from './authRouter'
import basicRoleRouter from './basicRoleRouter'
import businessRoleRouter from './businessRoleRouter'

const router: Router = express.Router()

router.use('/auth', authRouter)
router.use('/basic', authenticationMiddleware, basicRoleRouter)
router.use('/business', authenticationMiddleware, businessRoleRouter)


export default router
