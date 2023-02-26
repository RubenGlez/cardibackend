import { NextFunction, Request, Response } from 'express'
import DeleteCardUseCase from '../../../../../application/use-cases/card/DeleteCardUseCase.business'
import MongoCardRepository from '../../../../implementations/mongo/MongoCardRepository'

export default async function deleteCardController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const deleteCardUseCase = new DeleteCardUseCase({
    cardRepository: mongoCardRepository
  })

  try {
    const { params, tenantId = '' } = req
    const { cardId } = params
    const card = await deleteCardUseCase.run({ tenantId, cardId })
    res.json(card)
  } catch (e) {
    next(e)
  }
}
