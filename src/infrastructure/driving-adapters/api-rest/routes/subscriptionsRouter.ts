import express, { Router } from 'express'
import createSubscriptionController from '../controllers/subscription/createSubscriptionController.business'
import getSubscriptionsController from '../controllers/subscription/getSubscriptionsController.business'
import updateSubscriptionController from '../controllers/subscription/updateSubscriptionController.business'

const router: Router = express.Router()

router.get('/', getSubscriptionsController)
router.post('/', createSubscriptionController)
router.put('/:subscriptionId', updateSubscriptionController)

export default router
