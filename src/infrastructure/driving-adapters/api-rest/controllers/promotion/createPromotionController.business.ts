import { NextFunction, Request, Response } from 'express'
import CreatePromotionUseCase from '../../../../../application/use-cases/promotion/CreatePromotionUseCase.business'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'

export default async function createPromotionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const createPromotionUseCase = new CreatePromotionUseCase({
    promotionRepository: mongoPromotionRepository
  })

  try {
    const { tenantId = '', body } = req
    const promotion = await createPromotionUseCase.run({
      tenantId,
      ...body
    })
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
