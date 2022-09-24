import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository, MongoUserRepository } from '../../../..'
import { CreatePromotionUseCase } from '../../../../../application'

export default async function createPromotionController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const mongoUserRepository = new MongoUserRepository()
  const createPromotionUseCase = new CreatePromotionUseCase(
    mongoPromotionRepository,
    mongoUserRepository
  )

  try {
    const { tenantId } = req
    const promotion = await createPromotionUseCase.run(req.body, tenantId)
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
