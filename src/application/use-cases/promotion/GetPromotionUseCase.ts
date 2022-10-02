import { GetPromotionByIdService, Promotion, PromotionRepository } from '../../../domain'

export default class GetPromotionUseCase {
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor (promotionRepository: PromotionRepository) {
    this._getPromotionByIdService = new GetPromotionByIdService(promotionRepository)
  }

  async run (id: Promotion['id']): Promise<Promotion> {
    return await this._getPromotionByIdService.run(id)
  }
}
