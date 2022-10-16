import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository, MongoSubscriptionRepository } from '../../../../../infrastructure'
import { GetSubscriptionsUseCase } from '../../../../../application'

export default async function getSubscriptionsController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoSubscriptionRepository = new MongoSubscriptionRepository()
  const mongoPromotionRepository = new MongoPromotionRepository()
  const getSubscriptionsUseCase = new GetSubscriptionsUseCase(
    mongoSubscriptionRepository,
    mongoPromotionRepository
  )

  try {
    const { tenantId, query } = req
    const { promotionId } = query
    const companies = await getSubscriptionsUseCase.run(promotionId?.toString(), tenantId)
    res.json(companies)

  } catch (e) {
    next(e)
  }
}
