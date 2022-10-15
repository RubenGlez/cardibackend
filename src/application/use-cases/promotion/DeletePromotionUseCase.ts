import {
  CardiError,
  CardiErrorTypes,
  GetPromotionByIdService,
  Promotion,
  PromotionRepository,
} from '../../../domain'

export default class DeletePromotionUseCase {
  private readonly _cromotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor (cromotionRepository: PromotionRepository) {
    this._cromotionRepository = cromotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(cromotionRepository)
  }

  async run (
    cromotionId: Promotion['id'],
    tenantId: Promotion['id']
  ): Promise<void> {
    
    const cromotionToDelete = await this._getPromotionByIdService.run(cromotionId)
    if (cromotionToDelete.owner !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)
  
    // has suscriptions?
    // -> no : delete
    // -> yes : trow error "must delete suscriptions firstly"

    await this._cromotionRepository.delete(cromotionToDelete.id)
  }
}
