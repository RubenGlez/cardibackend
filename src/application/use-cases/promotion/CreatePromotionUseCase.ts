import { Promotion } from "../../../domain/entities/Promotion"
import { User } from "../../../domain/entities/User"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"

type InputData = Omit<Promotion, 'id'>

export default class CreatePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository

  constructor(promotionRepository: PromotionRepository) {
    this._promotionRepository = promotionRepository
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Promotion> {
    const promotionToCreate: Promotion = {
      owner: tenantId,
      company: inputData.company,
      card: inputData.card,
      name: inputData.name,
      description: inputData.description,
      type: inputData.type,
      validFrom: inputData.validFrom,
      validTo: inputData.validTo
    }

    const promotionCreated = await this._promotionRepository.save(
      promotionToCreate
    )
    return promotionCreated
  }
}
