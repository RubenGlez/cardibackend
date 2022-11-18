import { Promotion } from "../../entities/Promotion"
import { CardiError } from "../../exceptions/CardiError"
import { CardiErrorTypes } from "../../exceptions/CardiErrorTypes"
import { PromotionRepository } from "../../repositories/PromotionRepository"

export default class GetPromotionByIdService {
  private readonly _promotionRepository: PromotionRepository

  constructor(promotionRepository: PromotionRepository) {
    this._promotionRepository = promotionRepository
  }

  async run(id: Promotion['id']): Promise<Promotion> {
    const promotion = await this._promotionRepository.getById(id)
    if (promotion === null) throw new CardiError(CardiErrorTypes.PromotionNotFound)
    return promotion
  }
}
