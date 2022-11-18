import { Promotion } from "../../../domain/entities/Promotion"
import { User } from "../../../domain/entities/User"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"

export default class GetPromotionsUseCase {
  private readonly _promotionRepository: PromotionRepository

  constructor(promotionRepository: PromotionRepository) {
    this._promotionRepository = promotionRepository
  }

  async run(tenantId: User['id']): Promise<Promotion[]> {
    const promotions = await this._promotionRepository.getAllByOwner(tenantId)
    return promotions
  }
}
