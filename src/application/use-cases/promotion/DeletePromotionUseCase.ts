import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { PromotionRepository } from '../../../domain/repositories/PromotionRepository'
import GetPromotionByIdService from '../../../domain/services/promotion/GetPromotionByIdService'
import {
  DeletePromotionUseCaseDependencies,
  DeletePromotionUseCaseProps
} from './types'

export default class DeletePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor({ promotionRepository }: DeletePromotionUseCaseDependencies) {
    this._promotionRepository = promotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService({
      promotionRepository
    })
  }

  async run({
    promotionId,
    tenantId
  }: DeletePromotionUseCaseProps): Promise<void> {
    const promotionToDelete = await this._getPromotionByIdService.run({
      id: promotionId
    })
    if (promotionToDelete.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    // TODO: improve this flow
    // has suscriptions?
    // -> no : delete
    // -> yes : trow error "must delete suscriptions firstly"

    await this._promotionRepository.delete(promotionToDelete.id)
  }
}
