import express, { Router } from 'express'
import cardRouter from './cardRouter'
import companyRouter from './companyRouter'
import metricsRouter from './metricsRouter'
import promotionRouter from './promotionRouter'
import subscriptionsRouter from './subscriptionsRouter'

const router: Router = express.Router()

router.use('/cards', cardRouter)
router.use('/companies', companyRouter)
router.use('/promotions', promotionRouter)
router.use('/subscriptions', subscriptionsRouter)
router.use('/metrics', metricsRouter)

export default router
