import {
  Subscription,
  User,
  GetPromotionByIdService,
  PromotionRepository,
  CardiError,
  CardiErrorTypes,
  SubscriptionRepository,
  SubscriptionStatus,
  GetUserByIdService,
  UserRepository,
  UserRole
} from '../../../domain'

type InputData = Pick<Subscription, 'subscriptor' | 'promotion'>

export default class CreateSubscriptionUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService
  private readonly _getUserByIdService: GetUserByIdService

  constructor (
    subscriptionRepository: SubscriptionRepository, 
    promotionRepository: PromotionRepository,
    userRepository: UserRepository
  ) {
    this._subscriptionRepository = subscriptionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(promotionRepository)
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Subscription> {
    const promotion = await this._getPromotionByIdService.run(inputData.promotion)
    if (promotion.owner !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)

    const subscriptor = await this._getUserByIdService.run(inputData.subscriptor)
    const subscriptoHasBasicRole = subscriptor.role === UserRole.Basic
    if (!subscriptoHasBasicRole) throw new CardiError(CardiErrorTypes.InvalidSusbcriptorRole)

    const today = new Date()
    const isPromoOutdated = promotion.validFrom > today || promotion.validTo < today
    if (isPromoOutdated) throw new CardiError(CardiErrorTypes.PromotionOutdated)
    
    const subscriptionFound = await this._subscriptionRepository.getBySubscriptorAndPromotion(inputData.subscriptor, inputData.promotion)
    if (subscriptionFound !== null) throw new CardiError(CardiErrorTypes.SubscriptionAlreadyExist, { id: subscriptionFound?.id ?? '' })
    
    const subscriptionToCreate: Subscription = {
      subscriptor: inputData.subscriptor,
      owner: promotion.owner,
      promotion: promotion.id,
      card: promotion.card,
      company: promotion.company,
      steps: [{ date: today }],
      status: SubscriptionStatus.active
    }
    const subscriptionCreated = await this._subscriptionRepository.save(subscriptionToCreate)
    return subscriptionCreated
  }
}
