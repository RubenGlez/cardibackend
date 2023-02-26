import express, { Router } from 'express'
import createPromotionController from '../controllers/promotion/createPromotionController.business'
import deletePromotionController from '../controllers/promotion/deletePromotionController.business'
import getPromotionController from '../controllers/promotion/getPromotionController.business'
import getPromotionsController from '../controllers/promotion/getPromotionsController.business'
import updatePromotionController from '../controllers/promotion/updatePromotionController.business'

const router: Router = express.Router()

router.get('/', getPromotionsController)
router.post('/', createPromotionController)
router.put('/:promotionId', updatePromotionController)
router.get('/:promotionId', getPromotionController)
router.delete('/:promotionId', deletePromotionController)

export default router
