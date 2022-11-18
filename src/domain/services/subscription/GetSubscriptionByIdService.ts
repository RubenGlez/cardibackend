import { Subscription } from "../../entities/Subscription"
import { OutputError } from "../../exceptions/OutputError"
import { OutputErrorTypes } from "../../exceptions/OutputErrorTypes"
import { SubscriptionRepository } from "../../repositories/SubscriptionRepository"

export default class GetSubscriptionByIdService {
  private readonly _subscriptionRepository: SubscriptionRepository

  constructor(subscriptionRepository: SubscriptionRepository) {
    this._subscriptionRepository = subscriptionRepository
  }

  async run(id: Subscription['id']): Promise<Subscription> {
    const subscription = await this._subscriptionRepository.getById(id)
    if (subscription === null) throw new OutputError(OutputErrorTypes.SubscriptionNotFound)
    return subscription
  }
}
