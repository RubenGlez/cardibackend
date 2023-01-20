import { SubscriptionRepository } from '../../repositories/SubscriptionRepository'
import {
  ExistSubscriptionServiceDependencies,
  ExistSubscriptionServiceProps
} from './types'

export default class ExistSubscriptionService {
  private readonly _subscriptionRepository: SubscriptionRepository

  constructor({
    subscriptionRepository
  }: ExistSubscriptionServiceDependencies) {
    this._subscriptionRepository = subscriptionRepository
  }

  async run({
    subscriptor,
    promotion
  }: ExistSubscriptionServiceProps): Promise<boolean> {
    const subscription =
      await this._subscriptionRepository.getBySubscriptorAndPromotion(
        subscriptor,
        promotion
      )
    if (subscription !== null) return true
    return false
  }
}
