import { Promotion } from "../entities/Promotion"
import { User } from "../entities/User"

export interface PromotionRepository {
  getAllByOwner: (owner: User['id']) => Promise<Promotion[]>
  getById: (id: Promotion['id']) => Promise<Promotion | null>
  save: (inputData: Promotion) => Promise<Promotion>
  update: (inputData: Promotion) => Promise<Promotion>
  delete: (id: Promotion['id']) => Promise<void>
}
