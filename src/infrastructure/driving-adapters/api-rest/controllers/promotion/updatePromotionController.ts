import { NextFunction, Request, Response } from 'express'
import UpdatePromotionUseCase from '../../../../../application/use-cases/promotion/UpdatePromotionUseCase'
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
    const { params, tenantId = '' } = req
    const { promotionId } = params
    const promotion = await updatePromotionUseCase.run({
      tenantId,
      ...req.body,
      id: promotionId
    })
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
