import { CardiError, CardiErrorTypes, Subscription, SubscriptionRepository } from '../..'

export default class GetSubscriptionByIdService {
  private readonly _subscriptionRepository: SubscriptionRepository

  constructor (subscriptionRepository: SubscriptionRepository) {
    this._subscriptionRepository = subscriptionRepository
  }

  async run (id: Subscription['id']): Promise<Subscription> {
    const subscription = await this._subscriptionRepository.getById(id)
    if (subscription === null) throw new CardiError(CardiErrorTypes.SubscriptionNotFound)
    return subscription
  }
}
