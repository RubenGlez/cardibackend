import { NextFunction, Request, Response } from 'express'
import CreateCardUseCase from '../../../../../application/use-cases/card/CreateCardUseCase.business'
import MongoCardRepository from '../../../../implementations/mongo/MongoCardRepository'

export default async function createCardController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const createCardUseCase = new CreateCardUseCase({
    cardRepository: mongoCardRepository
  })

  try {
    const { tenantId = '', body } = req
    const card = await createCardUseCase.run({ tenantId, ...body })
    res.json(card)
  } catch (e) {
    next(e)
  }
}
