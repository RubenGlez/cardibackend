import { Subscription } from '../../entities/Subscription'
import { SubscriptionRepository } from '../../repositories/SubscriptionRepository'

export interface ExistSubscriptionServiceDependencies {
  subscriptionRepository: SubscriptionRepository
}

export interface ExistSubscriptionServiceProps {
  subscriptor: Subscription['subscriptor']
  promotion: Subscription['promotion']
}

export interface GetSubscriptionByIdServiceDependencies {
  subscriptionRepository: SubscriptionRepository
}

export interface GetSubscriptionByIdServiceProps {
  subscriptionId: Subscription['id']
}
