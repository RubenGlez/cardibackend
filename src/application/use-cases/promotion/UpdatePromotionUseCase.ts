import {
  CardiError,
  CardiErrorTypes,
  GetPromotionByIdService,
  Promotion,
  PromotionRepository,
  User
} from '../../../domain'

type InputData = Pick<
  Promotion,
  'id' | 'name' | 'description' | 'subscriptions' | 'validFrom' | 'validTo'
>

export default class UpdatePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService

  constructor(promotionRepository: PromotionRepository) {
    this._promotionRepository = promotionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(
      promotionRepository
    )
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Promotion> {
    const currentPromotion = await this._getPromotionByIdService.run(
      inputData.id
    )
    if (currentPromotion?.owner !== tenantId) {
      throw new CardiError(CardiErrorTypes.NotOwned)
    }

    const promotionToUpdate: Promotion = {
      ...currentPromotion,
      name: inputData.name ?? currentPromotion.name,
      description: inputData.description ?? currentPromotion.description,
      subscriptions: inputData.subscriptions ?? currentPromotion.subscriptions,
      validFrom: inputData.validFrom ?? currentPromotion.validFrom,
      validTo: inputData.validTo ?? currentPromotion.validTo
    }

    const promotionUpdated = await this._promotionRepository.update(
      promotionToUpdate
    )
    return promotionUpdated
  }
}
