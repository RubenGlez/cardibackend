import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository } from '../../../..'
import { GetPromotionsUseCase } from '../../../../../application'

export default async function getPromotionsController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const getPromotionsUseCase = new GetPromotionsUseCase(mongoPromotionRepository)

  try {
    const { tenantId } = req
    const promotions = await getPromotionsUseCase.run(tenantId)
    res.json(promotions)

  } catch (e) {
    next(e)
  }
}
