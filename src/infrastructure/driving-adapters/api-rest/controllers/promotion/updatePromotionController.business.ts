import { NextFunction, Request, Response } from 'express'
import UpdatePromotionUseCase from '../../../../../application/use-cases/promotion/UpdatePromotionUseCase.business'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'

export default async function updatePromotionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const updatePromotionUseCase = new UpdatePromotionUseCase({
    promotionRepository: mongoPromotionRepository
  })

  try {
    const { params, tenantId = '', body } = req
    const { promotionId } = params
    const promotion = await updatePromotionUseCase.run({
      tenantId,
      promotionId,
      ...body
    })
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
