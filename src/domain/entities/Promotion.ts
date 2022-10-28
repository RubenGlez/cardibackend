import { Card } from './Card'
import { Company } from './Company'
import { Subscription } from './Subscription'
import { User } from './User'

export enum PromotionType {
  Standard = 'Basic',
  Other = 'Other'
}

export type PromotionSubscription = Pick<
  Subscription,
  'id' | 'subscriptor' | 'status' | 'createdAt' | 'updatedAt'
>

export interface Promotion {
  id?: string
  owner: User['id']
  company: Company['id']
  card: Card['id']
  name: string
  description: string
  type: PromotionType
  subscriptions: PromotionSubscription[]
  validFrom: Date
  validTo: Date
}
