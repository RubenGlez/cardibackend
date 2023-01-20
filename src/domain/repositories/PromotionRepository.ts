import { Promotion } from '../entities/Promotion'

export type PromotionRepositorySaveProps = Pick<
  Promotion,
  | 'owner'
  | 'company'
  | 'card'
  | 'name'
  | 'description'
  | 'type'
  | 'validFrom'
  | 'validTo'
>
export interface PromotionRepository {
  getAllByCompany: (companyId: Promotion['company']) => Promise<Promotion[]>
  getById: (id: Promotion['id']) => Promise<Promotion | null>
  save: (props: PromotionRepositorySaveProps) => Promise<Promotion>
  update: (inputData: Promotion) => Promise<Promotion>
  delete: (id: Promotion['id']) => Promise<void>
}
