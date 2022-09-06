import express, { Router } from 'express'
import {
  createCardController,
  getCardsController,
  deleteCardController,
  getCardController,
  updateCardController,
} from '../controllers'

const router: Router = express.Router()

router.get('/', getCardsController)
router.post('/', createCardController)
router.put('/:cardId', updateCardController)
router.get('/:cardId', getCardController)
router.delete('/:cardId', deleteCardController)

export default router
