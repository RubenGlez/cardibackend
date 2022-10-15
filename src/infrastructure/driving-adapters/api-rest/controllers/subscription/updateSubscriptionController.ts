import { NextFunction, Request, Response } from 'express'
import { MongoPromotionRepository, MongoSubscriptionRepository } from '../../../..'
import { UpdateSubscriptionUseCase } from '../../../../../application'

export default async function updateSubscriptionController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoSubscriptionRepository = new MongoSubscriptionRepository()
  const mongoPromotionRepository = new MongoPromotionRepository()
  const updateSubscriptionUseCase = new UpdateSubscriptionUseCase(mongoSubscriptionRepository, mongoPromotionRepository)

  try {
    const { params, tenantId } = req
    const { subscriptionId } = params
    const subscription = await updateSubscriptionUseCase.run({ ...req.body, id: subscriptionId }, tenantId)
    res.json(subscription)
  } catch (e) {
    next(e)
  }
}
