import { Card } from "./Card";
import { User } from "./User";

export interface Wallet {
  id?: string
  owner: User['id']
  cards: Array<Card['id']>
  createdAt?: Date
  updatedAt?: Date
}