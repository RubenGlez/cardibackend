import { Promotion } from "../../../domain/entities/Promotion"
import { User } from "../../../domain/entities/User"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import GetPromotionByIdService from "../../../domain/services/promotion/GetPromotionByIdService"

type InputData = Pick<
  Promotion,
  'id' | 'name' | 'description' | 'validFrom' | 'validTo'
>

export default class UpdatePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor(promotionRepository: PromotionRepository) {
    this._promotionRepository = promotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(
      promotionRepository
    )
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Promotion> {
    const currentPromotion = await this._getPromotionByIdService.run(
      inputData.id
    )
    if (currentPromotion?.owner !== tenantId) {
      throw new CardiError(CardiErrorTypes.NotOwned)
    }

    const promotionToUpdate: Promotion = {
      ...currentPromotion,
      name: inputData.name ?? currentPromotion.name,
      description: inputData.description ?? currentPromotion.description,
      validFrom: inputData.validFrom ?? currentPromotion.validFrom,
      validTo: inputData.validTo ?? currentPromotion.validTo
    }

    const promotionUpdated = await this._promotionRepository.update(
      promotionToUpdate
    )
    return promotionUpdated
  }
}
