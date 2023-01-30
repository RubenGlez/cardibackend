import { Promotion } from '../../entities/Promotion'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { PromotionRepository } from '../../repositories/PromotionRepository'
import {
  GetPromotionByIdServiceDependencies,
  GetPromotionByIdServiceProps
} from './types'

export default class GetPromotionByIdService {
  private readonly _promotionRepository: PromotionRepository

  constructor({ promotionRepository }: GetPromotionByIdServiceDependencies) {
    this._promotionRepository = promotionRepository
  }

  async run({ promotionId }: GetPromotionByIdServiceProps): Promise<Promotion> {
    const promotion = await this._promotionRepository.getById(promotionId)
    if (promotion === null){
      throw new OutputError(OutputErrorTypes.PromotionNotFound)
    }
    return promotion
  }
}
