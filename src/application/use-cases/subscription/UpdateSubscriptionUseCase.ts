import { PromotionType } from "../../../domain/entities/Promotion"
import { Subscription, SubscriptionStatus } from "../../../domain/entities/Subscription"
import { User } from "../../../domain/entities/User"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import { SubscriptionRepository } from "../../../domain/repositories/SubscriptionRepository"
import GetPromotionByIdService from "../../../domain/services/promotion/GetPromotionByIdService"
import GetSubscriptionByIdService from "../../../domain/services/subscription/GetSubscriptionByIdService"



type InputData = Pick<Subscription, 'id'>

export default class UpdateSubscriptionUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getSubscriptionByIdService: GetSubscriptionByIdService
  private readonly _getPromotionByIdService: GetPromotionByIdService
  private readonly _subscriptionSteps: number = 3

  constructor(
    subscriptionRepository: SubscriptionRepository,
    promotionRepository: PromotionRepository
  ) {
    this._subscriptionRepository = subscriptionRepository
    this._getSubscriptionByIdService = new GetSubscriptionByIdService(
      subscriptionRepository
    )
    this._getPromotionByIdService = new GetPromotionByIdService(
      promotionRepository
    )
  }

  async run(
    inputData: InputData,
    tenantId: User['id']
  ): Promise<Subscription | null> {
    const currentSubscription = await this._getSubscriptionByIdService.run(
      inputData.id
    )
    if (currentSubscription?.owner !== tenantId)
      throw new CardiError(CardiErrorTypes.NotOwned)

    const promotion = await this._getPromotionByIdService.run(
      currentSubscription.promotion
    )

    const today = new Date()
    const isPromoOutdated =
      promotion.validFrom > today || promotion.validTo < today
    if (isPromoOutdated) throw new CardiError(CardiErrorTypes.PromotionOutdated)

    const isStandardPromotion = promotion.type === PromotionType.Standard
    if (!isStandardPromotion)
      throw new CardiError(CardiErrorTypes.InvalidPromotionType)

    const isSubscriptionCompleted =
      currentSubscription.steps.length === this._subscriptionSteps
    if (isSubscriptionCompleted)
      throw new CardiError(CardiErrorTypes.SubscriptionAlreadyCompleted)

    const isLastStep =
      currentSubscription.steps.length === this._subscriptionSteps - 1

    const status = isLastStep
      ? SubscriptionStatus.completed
      : SubscriptionStatus.inProgress

    const subscriptionToUpdate: Subscription = {
      ...currentSubscription,
      steps: [...currentSubscription.steps, { date: today }],
      status
    }

    const subscriptionUpdated = await this._subscriptionRepository.update(
      subscriptionToUpdate
    )
    return subscriptionUpdated
  }
}
