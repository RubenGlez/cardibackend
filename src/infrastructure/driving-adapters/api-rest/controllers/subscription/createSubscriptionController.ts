import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository, MongoSubscriptionRepository, MongoUserRepository } from '../../../..'
import { CreateSubscriptionUseCase } from '../../../../../application'

export default async function createSubscriptionController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoSubscriptionRepository = new MongoSubscriptionRepository()
  const mongoPromotionRepository = new MongoPromotionRepository()
  const mongoUserRepository = new MongoUserRepository()
  const createSubscriptionUseCase = new CreateSubscriptionUseCase(
    mongoSubscriptionRepository,
    mongoPromotionRepository,
    mongoUserRepository
  )

  try {
    const { tenantId } = req
    const subscription = await createSubscriptionUseCase.run(req.body, tenantId)
    res.json(subscription)
  } catch (e) {
    next(e)
  }
}
