import { NextFunction, Request, Response } from 'express'
import { MongoCardRepository } from '../../../../../infrastructure'
import { GetCardsUseCase } from '../../../../../application'

export default async function getCardsController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const getCardsUseCase = new GetCardsUseCase(mongoCardRepository)

  try {
    const { tenantId } = req
    const cards = await getCardsUseCase.run(tenantId)
    res.json(cards)

  } catch (e) {
    next(e)
  }
}
