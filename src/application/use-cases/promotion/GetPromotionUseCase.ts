import { Promotion } from '../../../domain/entities/Promotion'
import GetPromotionByIdService from '../../../domain/services/promotion/GetPromotionByIdService'
import {
  GetPromotionUseCaseDependencies,
  GetPromotionUseCaseProps
} from './types'

export default class GetPromotionUseCase {
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor({ promotionRepository }: GetPromotionUseCaseDependencies) {
    this._getPromotionByIdService = new GetPromotionByIdService({
      promotionRepository
    })
  }

  async run({ id }: GetPromotionUseCaseProps): Promise<Promotion> {
    return await this._getPromotionByIdService.run({ id })
  }
}
