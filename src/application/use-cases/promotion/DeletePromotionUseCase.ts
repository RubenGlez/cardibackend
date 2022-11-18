import { Promotion } from "../../../domain/entities/Promotion"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import GetPromotionByIdService from "../../../domain/services/promotion/GetPromotionByIdService"


export default class DeletePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor(cromotionRepository: PromotionRepository) {
    this._promotionRepository = cromotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(cromotionRepository)
  }

  async run(
    cromotionId: Promotion['id'],
    tenantId: Promotion['id']
  ): Promise<void> {

    const promotionToDelete = await this._getPromotionByIdService.run(cromotionId)
    if (promotionToDelete.owner !== tenantId) throw new OutputError(OutputErrorTypes.NotOwned)

    // has suscriptions?
    // -> no : delete
    // -> yes : trow error "must delete suscriptions firstly"

    await this._promotionRepository.delete(promotionToDelete.id)
  }
}
