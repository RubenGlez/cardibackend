import { NextFunction, Request, Response } from 'express'
import GetPromotionsUseCase from '../../../../../application/use-cases/promotion/GetPromotionsUseCase'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'


export default async function getPromotionsController(
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
