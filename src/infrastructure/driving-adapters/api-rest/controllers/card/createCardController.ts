import { NextFunction, Request, Response } from 'express'
import CreateCardUseCase from '../../../../../application/use-cases/card/CreateCardUseCase'
import MongoCardRepository from '../../../../implementations/mongo/MongoCardRepository'

export default async function createCardController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCardRepository = new MongoCardRepository()
  const createCardUseCase = new CreateCardUseCase(
    mongoCardRepository,
  )

  try {
    const { tenantId } = req
    const card = await createCardUseCase.run(req.body, tenantId)
    res.json(card)
  } catch (e) {
    next(e)
  }
}
