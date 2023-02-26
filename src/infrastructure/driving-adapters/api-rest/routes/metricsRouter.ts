import express, { Router } from 'express'
import getMetricsController from '../controllers/metrics/getMetricsController.business'

const router: Router = express.Router()

router.get('/', getMetricsController)

export default router
