import express, { Router } from 'express'
import basicAuthenticationMiddleware from '../middlewares/basicAuthenticationMiddleware'
import businessAuthenticationMiddleware from '../middlewares/businessAuthenticationMiddleware'
import authRouter from './authRouter'
import basicRoleRouter from './basicRoleRouter'
import businessRoleRouter from './businessRoleRouter'

const router: Router = express.Router()

router.use('/auth', authRouter)
router.use('/basic', basicAuthenticationMiddleware, basicRoleRouter)
router.use('/business', businessAuthenticationMiddleware, businessRoleRouter)


export default router
