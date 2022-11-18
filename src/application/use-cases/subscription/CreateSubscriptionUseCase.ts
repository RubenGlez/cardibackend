import { Subscription, SubscriptionStatus } from "../../../domain/entities/Subscription"
import { User, UserRole } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import { SubscriptionRepository } from "../../../domain/repositories/SubscriptionRepository"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import GetPromotionByIdService from "../../../domain/services/promotion/GetPromotionByIdService"
import GetUserByIdService from "../../../domain/services/user/GetUserByIdService"

type InputData = Pick<Subscription, 'subscriptor' | 'promotion'>

export default class CreateSubscriptionUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService
  private readonly _getUserByIdService: GetUserByIdService

  constructor(
    subscriptionRepository: SubscriptionRepository,
    promotionRepository: PromotionRepository,
    userRepository: UserRepository
  ) {
    this._subscriptionRepository = subscriptionRepository
    this._getPromotionByIdService = new GetPromotionByIdService(
      promotionRepository
    )
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Subscription> {
    const promotion = await this._getPromotionByIdService.run(
      inputData.promotion
    )

    if (promotion.owner?.toString() !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const subscriptor = await this._getUserByIdService.run(
      inputData.subscriptor
    )
    const subscriptorHasBasicRole = subscriptor.role === UserRole.Basic
    if (!subscriptorHasBasicRole) {
      throw new OutputError(OutputErrorTypes.InvalidSusbcriptorRole)
    }

    const today = new Date()
    const isPromoOutdated =
      promotion.validFrom > today || promotion.validTo < today
    if (isPromoOutdated) throw new OutputError(OutputErrorTypes.PromotionOutdated)

    const subscriptionFound =
      await this._subscriptionRepository.getBySubscriptorAndPromotion(
        inputData.subscriptor,
        inputData.promotion
      )
    if (subscriptionFound !== null) {
      throw new OutputError(OutputErrorTypes.SubscriptionAlreadyExist, {
        id: subscriptionFound?.id ?? ''
      })
    }

    const subscriptionToCreate: Subscription = {
      subscriptor: inputData.subscriptor,
      owner: promotion.owner,
      promotion: promotion.id,
      card: promotion.card,
      company: promotion.company,
      steps: [{ date: today }],
      status: SubscriptionStatus.inProgress
    }
    const subscriptionCreated = await this._subscriptionRepository.save(
      subscriptionToCreate
    )

    return subscriptionCreated
  }
}
