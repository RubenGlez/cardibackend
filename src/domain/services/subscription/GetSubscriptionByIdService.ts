import { Subscription } from '../../entities/Subscription'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { SubscriptionRepository } from '../../repositories/SubscriptionRepository'
import {
  GetSubscriptionByIdServiceDependencies,
  GetSubscriptionByIdServiceProps
} from './types'

export default class GetSubscriptionByIdService {
  private readonly _subscriptionRepository: SubscriptionRepository

  constructor({
    subscriptionRepository
  }: GetSubscriptionByIdServiceDependencies) {
    this._subscriptionRepository = subscriptionRepository
  }

  async run({ subscriptionId }: GetSubscriptionByIdServiceProps): Promise<Subscription> {
    const subscription = await this._subscriptionRepository.getById(subscriptionId)
    if (subscription === null) {
      throw new OutputError(OutputErrorTypes.SubscriptionNotFound)
    }
    return subscription
  }
}
