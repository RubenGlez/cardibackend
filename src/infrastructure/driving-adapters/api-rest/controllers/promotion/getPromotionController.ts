import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository } from '../../../..'
import { GetPromotionUseCase } from '../../../../../application'

export default async function getPromotionController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const getPromotionUseCase = new GetPromotionUseCase(mongoPromotionRepository)

  try {
    const { promotionId } = req.params
    const promotions = await getPromotionUseCase.run(promotionId)
    res.json(promotions)
  } catch (e) {
    next(e)
  }
}
