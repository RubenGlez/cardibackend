import { Promotion } from '../../entities/Promotion'
import { PromotionRepository } from '../../repositories/PromotionRepository'

export interface GetPromotionByIdServiceDependencies {
  promotionRepository: PromotionRepository
}

export interface GetPromotionByIdServiceProps {
  promotionId: Promotion['id']
}
