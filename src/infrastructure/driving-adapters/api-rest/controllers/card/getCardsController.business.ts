import { NextFunction, Request, Response } from 'express'
import GetCardsUseCase from '../../../../../application/use-cases/card/GetCardsUseCase.business'
import MongoCardRepository from '../../../../implementations/mongo/MongoCardRepository'

export default async function getCardsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const getCardsUseCase = new GetCardsUseCase({
    cardRepository: mongoCardRepository
  })

  try {
    const { tenantId = '' } = req
    const cards = await getCardsUseCase.run({ tenantId })
    res.json(cards)
  } catch (e) {
    next(e)
  }
}
