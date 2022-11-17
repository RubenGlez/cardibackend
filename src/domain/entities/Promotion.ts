import { Card } from './Card'
import { Company } from './Company'
import { User } from './User'

export enum PromotionType {
  Standard = 'Basic',
  Other = 'Other'
}

export interface Promotion {
  id?: string
  owner: User['id']
  company: Company['id']
  card: Card['id']
  name: string
  description: string
  type: PromotionType
  validFrom: Date
  validTo: Date
}
