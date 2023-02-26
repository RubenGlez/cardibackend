import express, { Router } from 'express'
import createCardController from '../controllers/card/createCardController.business'
import deleteCardController from '../controllers/card/deleteCardController.business'
import getCardController from '../controllers/card/getCardController.business'
import getCardsController from '../controllers/card/getCardsController.business'
import updateCardController from '../controllers/card/updateCardController.business'

const router: Router = express.Router()

router.get('/', getCardsController)
router.post('/', createCardController)
router.put('/:cardId', updateCardController)
router.get('/:cardId', getCardController)
router.delete('/:cardId', deleteCardController)

export default router
