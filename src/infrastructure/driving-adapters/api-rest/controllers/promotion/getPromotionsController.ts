import { NextFunction, Request, Response } from 'express'
import GetPromotionsUseCase from '../../../../../application/use-cases/promotion/GetPromotionsUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'


export default async function getPromotionsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPromotionRepository = new MongoPromotionRepository()
  const mongoCompanyRepository = new MongoCompanyRepository()
  const getPromotionsUseCase = new GetPromotionsUseCase(mongoPromotionRepository, mongoCompanyRepository)

  try {
    const { tenantId, query } = req
    const { companyId } = query
    const promotions = await getPromotionsUseCase.run(tenantId, companyId?.toString())
    res.json(promotions)

  } catch (e) {
    next(e)
  }
}


