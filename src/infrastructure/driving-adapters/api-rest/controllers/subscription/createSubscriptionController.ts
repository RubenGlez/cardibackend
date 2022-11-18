import { NextFunction, Request, Response } from 'express'
import CreateSubscriptionUseCase from '../../../../../application/use-cases/subscription/CreateSubscriptionUseCase'
import MongoPromotionRepository from '../../../../implementations/mongo/MongoPromotionRepository'
import MongoSubscriptionRepository from '../../../../implementations/mongo/MongoSubscriptionRepository'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'

export default async function createSubscriptionController(
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
