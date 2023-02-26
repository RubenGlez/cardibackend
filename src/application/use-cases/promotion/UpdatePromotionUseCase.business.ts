import { Promotion } from '../../../domain/entities/Promotion'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { PromotionRepository } from '../../../domain/repositories/PromotionRepository'
import GetPromotionByIdService from '../../../domain/services/promotion/GetPromotionByIdService'
import {
  UpdatePromotionUseCaseDependencies,
  UpdatePromotionUseCaseProps
} from './types.business'

export default class UpdatePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor({ promotionRepository }: UpdatePromotionUseCaseDependencies) {
    this._promotionRepository = promotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService({
      promotionRepository
    })
  }

  async run({
    tenantId,
    promotionId,
    name,
    description,
    validFrom,
    validTo
  }: UpdatePromotionUseCaseProps): Promise<Promotion> {
    const currentPromotion = await this._getPromotionByIdService.run({
      promotionId
    })
    if (currentPromotion?.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const promotionToUpdate: Promotion = {
      ...currentPromotion,
      name: name ?? currentPromotion.name,
      description: description ?? currentPromotion.description,
      validFrom: validFrom ?? currentPromotion.validFrom,
      validTo: validTo ?? currentPromotion.validTo
    }

    const promotionUpdated = await this._promotionRepository.update(
      promotionToUpdate
    )
    return promotionUpdated
  }
}
