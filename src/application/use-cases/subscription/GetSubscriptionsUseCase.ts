import {
  CardiError,
  CardiErrorTypes,
  Promotion,
  PromotionRepository,
  Subscription,
  SubscriptionRepository,
  User
} from '../../../domain'

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
      throw new CardiError(CardiErrorTypes.PromotionNotFound)
    }

    const isPromotionOwnedByTenant = promotion.owner === tenantId
    if (!isPromotionOwnedByTenant) {
      throw new CardiError(CardiErrorTypes.NotOwned)
    }

    const subscriptions = await this._subscriptionRepository.getAllByPromotion(
      promotionId
    )
    return subscriptions
  }
}
