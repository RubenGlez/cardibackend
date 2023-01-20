import { NextFunction, Request, Response } from 'express'
import UpdateCardUseCase from '../../../../../application/use-cases/card/UpdateCardUseCase'
import MongoCardRepository from '../../../../implementations/mongo/MongoCardRepository'

export default async function updateCardController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const updateCardUseCase = new UpdateCardUseCase({
    cardRepository: mongoCardRepository
  })

  try {
    const { params, tenantId = '' } = req
    const { cardId } = params
    const card = await updateCardUseCase.run({
      tenantId,
      ...req.body,
      id: cardId
    })
    res.json(card)
  } catch (e) {
    next(e)
  }
}
