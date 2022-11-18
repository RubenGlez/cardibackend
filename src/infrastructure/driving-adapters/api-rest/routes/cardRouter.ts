import express, { Router } from 'express'
import createCardController from '../controllers/card/createCardController'
import deleteCardController from '../controllers/card/deleteCardController'
import getCardController from '../controllers/card/getCardController'
import getCardsController from '../controllers/card/getCardsController'
import updateCardController from '../controllers/card/updateCardController'


const router: Router = express.Router()

router.get('/', getCardsController)
router.post('/', createCardController)
router.put('/:cardId', updateCardController)
router.get('/:cardId', getCardController)
router.delete('/:cardId', deleteCardController)

export default router
