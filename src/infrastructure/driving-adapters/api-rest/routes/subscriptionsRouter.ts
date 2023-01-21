import express, { Router } from 'express'
import createSubscriptionController from '../controllers/subscription/createSubscriptionController'
import getSubscriptionsController from '../controllers/subscription/getSubscriptionsController'
import updateSubscriptionController from '../controllers/subscription/updateSubscriptionController'

const router: Router = express.Router()

router.get('/', getSubscriptionsController)
router.post('/', createSubscriptionController)
router.put('/:subscriptionId', updateSubscriptionController)

export default router
