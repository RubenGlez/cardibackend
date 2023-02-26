import { Promotion } from '../../../domain/entities/Promotion'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import { PromotionRepository } from '../../../domain/repositories/PromotionRepository'

type PromotionToCreate = Pick<
  Promotion,
  | 'company'
  | 'company'
  | 'card'
  | 'name'
  | 'description'
  | 'type'
  | 'validFrom'
  | 'validTo'
>

type PromotionToUpdate = Pick<
  Promotion,
  'id' | 'name' | 'description' | 'validFrom' | 'validTo'
>

export interface CreatePromotionUseCaseDependencies {
  promotionRepository: PromotionRepository
}

export interface CreatePromotionUseCaseProps extends PromotionToCreate {
  tenantId: Promotion['owner']
}

export interface DeletePromotionUseCaseDependencies {
  promotionRepository: PromotionRepository
}

export interface DeletePromotionUseCaseProps {
  tenantId: Promotion['id']
  promotionId: Promotion['id']
}

export interface GetPromotionsUseCaseDependencies {
  promotionRepository: PromotionRepository
  companyRepository: CompanyRepository
}

export interface GetPromotionsUseCaseProps {
  tenantId: Promotion['id']
  companyId: Promotion['company']
}

export interface GetPromotionUseCaseDependencies {
  promotionRepository: PromotionRepository
}

export interface GetPromotionUseCaseProps {
  promotionId: Promotion['id']
}

export interface UpdatePromotionUseCaseDependencies {
  promotionRepository: PromotionRepository
}

export interface UpdatePromotionUseCaseProps extends PromotionToUpdate {
  tenantId: Promotion['owner']
  promotionId: Promotion['id']
}
