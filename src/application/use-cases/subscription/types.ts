import { Subscription } from '../../../domain/entities/Subscription'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import { PromotionRepository } from '../../../domain/repositories/PromotionRepository'
import { SubscriptionRepository } from '../../../domain/repositories/SubscriptionRepository'
import { UserRepository } from '../../../domain/repositories/UserRepository'

type SubscriptionToCreate = Pick<Subscription, 'subscriptor' | 'promotion'>

export interface CreateSubscriptionUseCaseDependencies {
  subscriptionRepository: SubscriptionRepository
  promotionRepository: PromotionRepository
  userRepository: UserRepository
}

export interface CreateSubscriptionUseCaseProps extends SubscriptionToCreate {
  tenantId: Subscription['owner']
}

export interface GetSubscriptionsUseCaseDependencies {
  subscriptionRepository: SubscriptionRepository
  companyRepository: CompanyRepository
}

export interface GetSubscriptionsUseCaseProps {
  tenantId: Subscription['owner']
  companyId: Subscription['company']
}

export interface UpdateSubscriptionUseCaseDependencies {
  subscriptionRepository: SubscriptionRepository
  promotionRepository: PromotionRepository
}

export interface UpdateSubscriptionUseCaseProps {
  tenantId: Subscription['owner']
  subscriptionId: Subscription['id']
}
