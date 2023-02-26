import express, { Router } from 'express'
import basicAuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.basic'
import businessAuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.business'
import basicRoleRouter from './basicRoleRouter'
import businessRoleRouter from './businessRoleRouter'
import commonRouter from './commonRouter'

const router: Router = express.Router()

router.use('/common', commonRouter)
router.use('/basic', basicAuthenticationMiddleware, basicRoleRouter)
router.use('/business', businessAuthenticationMiddleware, businessRoleRouter)

export default router
