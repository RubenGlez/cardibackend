import { NextFunction, Request, Response } from 'express'
import DeletePromotionUseCase from '../../../../../application/use-cases/promotion/DeletePromotionUseCase'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'

export default async function deletePromotionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const deletePromotionUseCase = new DeletePromotionUseCase({
    promotionRepository: mongoPromotionRepository
  })

  try {
    const { params, tenantId = '' } = req
    const { promotionId } = params
    const promotion = await deletePromotionUseCase.run({
      tenantId,
      promotionId
    })
    res.json(promotion)
  } catch (e) {
    next(e)
  }
}
