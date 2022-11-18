import { NextFunction, Request, Response } from 'express'
import CreatePromotionUseCase from '../../../../../application/use-cases/promotion/CreatePromotionUseCase'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'

export default async function createPromotionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const createPromotionUseCase = new CreatePromotionUseCase(
    mongoPromotionRepository,
  )

  try {
    const { tenantId } = req
    const promotion = await createPromotionUseCase.run(req.body, tenantId)
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
