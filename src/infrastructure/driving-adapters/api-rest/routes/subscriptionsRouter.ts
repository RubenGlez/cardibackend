import express, { Router } from 'express'
import {
  createSubscriptionController,
  // deleteSubscriptionController,
  getSubscriptionsController,
  // getSubscriptionController,
  updateSubscriptionController,
} from '../controllers'

const router: Router = express.Router()

router.get('/', getSubscriptionsController)
router.post('/', createSubscriptionController)
router.put('/:subscriptionId', updateSubscriptionController)
// router.get('/:subscriptionId', getSubscriptionController)
// router.delete('/:subscriptionId', deleteSubscriptionController)

export default router
