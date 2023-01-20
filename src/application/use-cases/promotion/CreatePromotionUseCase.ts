import { Promotion } from '../../../domain/entities/Promotion'
import {
  PromotionRepository,
  PromotionRepositorySaveProps
} from '../../../domain/repositories/PromotionRepository'
import {
  CreatePromotionUseCaseDependencies,
  CreatePromotionUseCaseProps
} from './types'

export default class CreatePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository

  constructor({ promotionRepository }: CreatePromotionUseCaseDependencies) {
    this._promotionRepository = promotionRepository
  }

  async run({
    tenantId,
    company,
    card,
    name,
    description,
    type,
    validFrom,
    validTo
  }: CreatePromotionUseCaseProps): Promise<Promotion> {
    const promotionToCreate: PromotionRepositorySaveProps = {
      owner: tenantId,
      company,
      card,
      name,
      description,
      type,
      validFrom,
      validTo
    }

    const promotionCreated = await this._promotionRepository.save(
      promotionToCreate
    )
    return promotionCreated
  }
}
