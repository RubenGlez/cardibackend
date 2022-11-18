import { Subscription } from "../../entities/Subscription"
import { SubscriptionRepository } from "../../repositories/SubscriptionRepository"

export default class ExistSubscriptionService {
  private readonly _subscriptionRepository: SubscriptionRepository

  constructor(subscriptionRepository: SubscriptionRepository) {
    this._subscriptionRepository = subscriptionRepository
  }

  async run(subscriptor: Subscription['subscriptor'], promotion: Subscription['promotion']): Promise<boolean> {
    const subscription = await this._subscriptionRepository.getBySubscriptorAndPromotion(subscriptor, promotion)
    if (subscription !== null) return true
    return false
  }
}
