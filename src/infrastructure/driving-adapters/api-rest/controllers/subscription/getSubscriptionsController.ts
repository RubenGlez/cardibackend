import { NextFunction, Request, Response } from 'express'
import GetSubscriptionsUseCase from '../../../../../application/use-cases/subscription/GetSubscriptionsUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'
import MongoSubscriptionRepository from '../../../../implementations/mongo/MongoSubscriptionRepository'

export default async function getSubscriptionsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoSubscriptionRepository = new MongoSubscriptionRepository()
  const mongoCompanyRepository = new MongoCompanyRepository()
  const getSubscriptionsUseCase = new GetSubscriptionsUseCase(
    mongoSubscriptionRepository,
    mongoCompanyRepository
  )

  try {
    const { tenantId, query } = req
    const { companyId } = query
    const companies = await getSubscriptionsUseCase.run(tenantId, companyId?.toString())
    res.json(companies)

  } catch (e) {
    next(e)
  }
}
