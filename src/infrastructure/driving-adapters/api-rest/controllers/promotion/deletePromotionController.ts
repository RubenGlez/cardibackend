import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository } from '../../../..'
import { DeletePromotionUseCase } from '../../../../../application'

export default async function deletePromotionController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const deletePromotionUseCase = new DeletePromotionUseCase(mongoPromotionRepository)

  try {
    const { params, tenantId } = req
    const { promotionId } = params
    const promotion = await deletePromotionUseCase.run(promotionId, tenantId)
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
