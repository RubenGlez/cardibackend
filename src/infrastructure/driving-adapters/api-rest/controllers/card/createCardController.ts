import { NextFunction, Request, Response } from 'express'
import { MongoCardRepository } from '../../../../../infrastructure'
import { CreateCardUseCase } from '../../../../../application'

export default async function createCardController (
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
