import { Promotion } from "../entities/Promotion"

export interface PromotionRepository {
  getAllByCompany: (companyId: Promotion['company']) => Promise<Promotion[]>
  getById: (id: Promotion['id']) => Promise<Promotion | null>
  save: (inputData: Promotion) => Promise<Promotion>
  update: (inputData: Promotion) => Promise<Promotion>
  delete: (id: Promotion['id']) => Promise<void>
}
