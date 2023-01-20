import { PromotionType } from '../../../domain/entities/Promotion'
import {
  Subscription,
  SubscriptionStatus
} from '../../../domain/entities/Subscription'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import {
  SubscriptionRepository,
  SubscriptionRepositoryUpdateProps
} from '../../../domain/repositories/SubscriptionRepository'
import GetPromotionByIdService from '../../../domain/services/promotion/GetPromotionByIdService'
import GetSubscriptionByIdService from '../../../domain/services/subscription/GetSubscriptionByIdService'
import {
  UpdateSubscriptionUseCaseDependencies,
  UpdateSubscriptionUseCaseProps
} from './types'

export default class UpdateSubscriptionUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getSubscriptionByIdService: GetSubscriptionByIdService
  private readonly _getPromotionByIdService: GetPromotionByIdService
  private readonly _subscriptionSteps: number = 3

  constructor({
    subscriptionRepository,
    promotionRepository
  }: UpdateSubscriptionUseCaseDependencies) {
    this._subscriptionRepository = subscriptionRepository
    this._getSubscriptionByIdService = new GetSubscriptionByIdService({
      subscriptionRepository
    })
    this._getPromotionByIdService = new GetPromotionByIdService({
      promotionRepository
    })
  }

  async run({
    tenantId,
    subscriptionId
  }: UpdateSubscriptionUseCaseProps): Promise<Subscription | null> {
    const currentSubscription = await this._getSubscriptionByIdService.run({
      id: subscriptionId
    })
    if (currentSubscription?.owner !== tenantId)
      throw new OutputError(OutputErrorTypes.NotOwned)

    const promotion = await this._getPromotionByIdService.run({
      id: currentSubscription.promotion
    })

    const today = new Date()
    const isPromoOutdated =
      promotion.validFrom > today || promotion.validTo < today
    if (isPromoOutdated)
      throw new OutputError(OutputErrorTypes.PromotionOutdated)

    const isStandardPromotion = promotion.type === PromotionType.Standard
    if (!isStandardPromotion)
      throw new OutputError(OutputErrorTypes.InvalidPromotionType)

    const isSubscriptionCompleted =
      currentSubscription.steps.length === this._subscriptionSteps
    if (isSubscriptionCompleted)
      throw new OutputError(OutputErrorTypes.SubscriptionAlreadyCompleted)

    const isLastStep =
      currentSubscription.steps.length === this._subscriptionSteps - 1

    const status = isLastStep
      ? SubscriptionStatus.completed
      : SubscriptionStatus.inProgress

    const subscriptionToUpdate: SubscriptionRepositoryUpdateProps = {
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
