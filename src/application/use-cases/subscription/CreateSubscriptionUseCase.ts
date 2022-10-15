import {
  Subscription,
  User,
  GetPromotionByIdService,
  PromotionRepository,
  CardiError,
  CardiErrorTypes,
  SubscriptionRepository,
  ExistSubscriptionService,
  SubscriptionStatus
} from '../../../domain'

type InputData = Pick<Subscription, 'subscriptor' | 'promotion'>

export default class CreateSubscriptionUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService
  private readonly _existSubscriptionService: ExistSubscriptionService

  constructor (subscriptionRepository: SubscriptionRepository, promotionRepository: PromotionRepository) {
    this._subscriptionRepository = subscriptionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(promotionRepository)
    this._existSubscriptionService = new ExistSubscriptionService(subscriptionRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Subscription> {
    const promotion = await this._getPromotionByIdService.run(inputData.promotion)
    if (promotion.owner !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)

    const today = new Date()
    const isPromoOutdated = promotion.validFrom > today || promotion.validTo < today
    if (isPromoOutdated)  throw new CardiError(CardiErrorTypes.PromotionOutdated)

    const existSubscription = await this._existSubscriptionService.run(inputData.subscriptor, inputData.promotion)
    if (existSubscription) throw new CardiError(CardiErrorTypes.SubscriptionAlreadyExist)
    
    const stepId = this._subscriptionRepository.generateUuid()
    const subscriptionToCreate: Subscription = {
      subscriptor: inputData.subscriptor,
      owner: promotion.owner,
      promotion: promotion.id,
      card: promotion.card,
      company: promotion.company,
      steps: [{
        id: stepId,
        date: today
      }],
      status: SubscriptionStatus.active
    }
    const subscriptionCreated = await this._subscriptionRepository.save(subscriptionToCreate)
    return subscriptionCreated
  }
}
