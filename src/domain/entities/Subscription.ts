import { Card } from "./Card"
import { Company } from "./Company"
import { Promotion } from "./Promotion"
import { User } from "./User"

export interface SubscriptionStep {
  id: string
  date: Date
}

export enum SubscriptionStatus {
  active = 'active',
  inactive = 'inactive',
  completed = 'completed'
}

export interface Subscription {
  id?: string
  // datos del  user basic
  subscriptor: User['id']
  // datos del user business
  owner: User['id']
  promotion: Promotion['id']
  card: Card['id']
  company: Company['id']
  // datos de la subscripción
  steps: SubscriptionStep[]
  status: SubscriptionStatus
}