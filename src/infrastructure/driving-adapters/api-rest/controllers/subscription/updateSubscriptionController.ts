import { NextFunction, Request, Response } from 'express'
import UpdateSubscriptionUseCase from '../../../../../application/use-cases/subscription/UpdateSubscriptionUseCase'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'
import MongoSubscriptionRepository from '../../../../implementations/mongo/MongoSubscriptionRepository'

export default async function updateSubscriptionController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoSubscriptionRepository = new MongoSubscriptionRepository()
  const mongoPromotionRepository = new MongoPromotionRepository()
  const updateSubscriptionUseCase = new UpdateSubscriptionUseCase({
    promotionRepository: mongoPromotionRepository,
    subscriptionRepository: mongoSubscriptionRepository
  })

  try {
    const { params, tenantId = '', body } = req
    const { subscriptionId } = params
    const subscription = await updateSubscriptionUseCase.run({
      tenantId,
      subscriptionId,
      ...body
    })
    res.json(subscription)
  } catch (e) {
    next(e)
  }
}
