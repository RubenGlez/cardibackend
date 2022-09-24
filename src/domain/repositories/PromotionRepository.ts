import { Promotion, User } from '../../domain'

export interface PromotionRepository {
  getAll: () => Promise<Promotion[]>
  getAllByOwner: (owner: User['id']) => Promise<Promotion[]>
  getById: (id: Promotion['id']) => Promise<Promotion | null>
  getByName: (name: Promotion['name']) => Promise<Promotion | null>
  save: (inputData: Promotion) => Promise<Promotion>
  update: (inputData: Promotion) => Promise<Promotion>
  delete: (id: Promotion['id']) => Promise<void>
}
