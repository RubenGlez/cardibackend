import express, { Router } from 'express'
import {
  createPromotionController,
  deletePromotionController,
  getPromotionsController,
  getPromotionController,
  updatePromotionController,
} from '../controllers'

const router: Router = express.Router()

router.get('/', getPromotionsController)
router.post('/', createPromotionController)
router.put('/:promotionId', updatePromotionController)
router.get('/:promotionId', getPromotionController)
router.delete('/:promotionId', deletePromotionController)

export default router
