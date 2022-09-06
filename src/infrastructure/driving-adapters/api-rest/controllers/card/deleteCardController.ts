import { NextFunction, Request, Response } from 'express'
import { MongoCardRepository } from '../../../..'
import { DeleteCardUseCase } from '../../../../../application'

export default async function deleteCardController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const deleteCardUseCase = new DeleteCardUseCase(mongoCardRepository)

  try {
    const { params, tenantId } = req
    const { cardId } = params
    const card = await deleteCardUseCase.run(cardId, tenantId)
    res.json(card)
  } catch (e) {
    next(e)
  }
}
