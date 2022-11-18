import express, { Router } from 'express'
import createPromotionController from '../controllers/promotion/createPromotionController'
import deletePromotionController from '../controllers/promotion/deletePromotionController'
import getPromotionController from '../controllers/promotion/getPromotionController'
import getPromotionsController from '../controllers/promotion/getPromotionsController'
import updatePromotionController from '../controllers/promotion/updatePromotionController'


const router: Router = express.Router()

router.get('/', getPromotionsController)
router.post('/', createPromotionController)
router.put('/:promotionId', updatePromotionController)
router.get('/:promotionId', getPromotionController)
router.delete('/:promotionId', deletePromotionController)

export default router
