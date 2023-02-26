import { Promotion } from '../../../domain/entities/Promotion'
import GetPromotionByIdService from '../../../domain/services/promotion/GetPromotionByIdService'
import {
  GetPromotionUseCaseDependencies,
  GetPromotionUseCaseProps
} from './types.business'

export default class GetPromotionUseCase {
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor({ promotionRepository }: GetPromotionUseCaseDependencies) {
    this._getPromotionByIdService = new GetPromotionByIdService({
      promotionRepository
    })
  }

  async run({ promotionId }: GetPromotionUseCaseProps): Promise<Promotion> {
    return await this._getPromotionByIdService.run({ promotionId })
  }
}
