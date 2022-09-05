import express, { Router } from 'express'
import {
  createCardController,
  // getCardsController,
  // deleteCardController,
  // getCardController,
  // updateCardController,
} from '../controllers'

const router: Router = express.Router()

// router.get('/', getCardsController)
router.post('/', createCardController)
// router.put('/:companyId', updateCardController)
// router.get('/:companyId', getCardController)
// router.delete('/:companyId', deleteCardController)

export default router
