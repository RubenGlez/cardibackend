import { Card } from "../entities/Card"
import { User } from "../entities/User"

export interface CardRepository {
  getAllByOwner: (owner: User['id']) => Promise<Card[]>
  getById: (id: Card['id']) => Promise<Card | null>
  save: (inputData: Card) => Promise<Card>
  update: (inputData: Card) => Promise<Card>
  delete: (id: Card['id']) => Promise<void>
}
