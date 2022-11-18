import { NextFunction, Request, Response } from 'express'
import GetCardUseCase from '../../../../../application/use-cases/card/GetCardUseCase'
import MongoCardRepository from '../../../../implementations/mongo/MongoCardRepository'


export default async function getCardController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const getCardUseCase = new GetCardUseCase(mongoCardRepository)

  try {
    const { cardId } = req.params
    const cards = await getCardUseCase.run(cardId)
    res.json(cards)
  } catch (e) {
    next(e)
  }
}
