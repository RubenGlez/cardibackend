import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository, MongoSubscriptionRepository } from '../../../..'
import { CreateSubscriptionUseCase } from '../../../../../application'

export default async function createSubscriptionController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoSubscriptionRepository = new MongoSubscriptionRepository()
  const mongoPromotionRepository = new MongoPromotionRepository()
  const createSubscriptionUseCase = new CreateSubscriptionUseCase(
    mongoSubscriptionRepository,
    mongoPromotionRepository
  )

  try {
    const { tenantId } = req
    const subscription = await createSubscriptionUseCase.run(req.body, tenantId)
    res.json(subscription)
  } catch (e) {
    next(e)
  }
}
