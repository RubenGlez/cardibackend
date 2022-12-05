import { Promotion } from "../../../domain/entities/Promotion"
import { User } from "../../../domain/entities/User"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import { PromotionFilters } from "../../../infrastructure/driving-adapters/api-rest/controllers/promotion/helpers"

export default class GetPromotionsUseCase {
  private readonly _promotionRepository: PromotionRepository

  constructor(promotionRepository: PromotionRepository) {
    this._promotionRepository = promotionRepository
  }

  async run(tenantId: User['id'], filters: PromotionFilters): Promise<Promotion[]> {
    const promotions = await this._promotionRepository.getAllByOwner(tenantId, filters)
    return promotions
  }
}
