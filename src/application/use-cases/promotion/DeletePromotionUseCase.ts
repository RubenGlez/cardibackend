import {
  CardiError,
  CardiErrorTypes,
  GetPromotionByIdService,
  Promotion,
  PromotionRepository,
} from '../../../domain'

export default class DeletePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor (cromotionRepository: PromotionRepository) {
    this._promotionRepository = cromotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(cromotionRepository)
  }

  async run (
    cromotionId: Promotion['id'],
    tenantId: Promotion['id']
  ): Promise<void> {
    
    const promotionToDelete = await this._getPromotionByIdService.run(cromotionId)
    if (promotionToDelete.owner !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)
  
    // has suscriptions?
    // -> no : delete
    // -> yes : trow error "must delete suscriptions firstly"

    await this._promotionRepository.delete(promotionToDelete.id)
  }
}
