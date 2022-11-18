import { Promotion } from "../../../domain/entities/Promotion"
import { Subscription } from "../../../domain/entities/Subscription"
import { User } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import { SubscriptionRepository } from "../../../domain/repositories/SubscriptionRepository"

export default class GetSubscriptionsUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _promotionRepository: PromotionRepository

  constructor(
    subscriptionRepository: SubscriptionRepository,
    promotionRepository: PromotionRepository
  ) {
    this._subscriptionRepository = subscriptionRepository
    this._promotionRepository = promotionRepository
  }

  async run(
    promotionId: Promotion['id'],
    tenantId: User['id']
  ): Promise<Subscription[]> {
    const promotion = await this._promotionRepository.getById(promotionId)
    if (promotion == null) {
      throw new OutputError(OutputErrorTypes.PromotionNotFound)
    }

    const isPromotionOwnedByTenant = promotion.owner === tenantId
    if (!isPromotionOwnedByTenant) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const subscriptions = await this._subscriptionRepository.getAllByPromotion(
      promotionId
    )
    return subscriptions
  }
}
