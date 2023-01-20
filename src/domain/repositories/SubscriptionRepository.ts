import { Subscription, SubscriptionStep } from '../entities/Subscription'

export type SubscriptionRepositorySaveProps = Pick<
  Subscription,
  'subscriptor' | 'owner' | 'promotion' | 'card' | 'company' | 'status'
> & {
  steps: Array<Pick<SubscriptionStep, 'date'>>
}

export type SubscriptionRepositoryUpdateProps = Omit<Subscription, 'steps'> & {
  steps: Array<Pick<SubscriptionStep, 'date'>>
}

export interface SubscriptionRepository {
  getAllByCompany: (company: Subscription['company']) => Promise<Subscription[]>
  getBySubscriptorAndPromotion: (
    subscriptor: Subscription['subscriptor'],
    promotion: Subscription['promotion']
  ) => Promise<Subscription | null>
  getById: (id: Subscription['id']) => Promise<Subscription | null>
  save: (props: SubscriptionRepositorySaveProps) => Promise<Subscription>
  update: (
    props: SubscriptionRepositoryUpdateProps
  ) => Promise<Subscription | null>
}
