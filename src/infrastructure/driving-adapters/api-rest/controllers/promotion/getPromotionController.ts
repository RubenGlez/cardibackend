import { NextFunction, Request, Response } from 'express'
import GetPromotionUseCase from '../../../../../application/use-cases/promotion/GetPromotionUseCase'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'

export default async function getPromotionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const getPromotionUseCase = new GetPromotionUseCase({
    promotionRepository: mongoPromotionRepository
  })

  try {
    const { promotionId } = req.params
    const promotions = await getPromotionUseCase.run({ promotionId })
    res.json(promotions)
  } catch (e) {
    next(e)
  }
}
