import {
  Subscription,
  SubscriptionStatus
} from '../../../domain/entities/Subscription'
import { UserRole } from '../../../domain/entities/User'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import {
  SubscriptionRepository,
  SubscriptionRepositorySaveProps
} from '../../../domain/repositories/SubscriptionRepository'
import GetPromotionByIdService from '../../../domain/services/promotion/GetPromotionByIdService'
import GetUserByIdService from '../../../domain/services/user/GetUserByIdService'
import {
  CreateSubscriptionUseCaseDependencies,
  CreateSubscriptionUseCaseProps
} from './types.business'

export default class CreateSubscriptionUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getPromotionByIdService: GetPromotionByIdService
  private readonly _getUserByIdService: GetUserByIdService

  constructor({
    subscriptionRepository,
    promotionRepository,
    userRepository
  }: CreateSubscriptionUseCaseDependencies) {
    this._subscriptionRepository = subscriptionRepository
    this._getPromotionByIdService = new GetPromotionByIdService({
      promotionRepository
    })
    this._getUserByIdService = new GetUserByIdService({ userRepository })
  }

  async run({
    tenantId,
    promotion,
    subscriptor
  }: CreateSubscriptionUseCaseProps): Promise<Subscription> {
    const _promotion = await this._getPromotionByIdService.run({
      promotionId: promotion
    })

    if (_promotion.owner?.toString() !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const _subscriptor = await this._getUserByIdService.run({
      userId: subscriptor
    })
    const subscriptorHasBasicRole = _subscriptor.role === UserRole.Basic
    if (!subscriptorHasBasicRole) {
      throw new OutputError(OutputErrorTypes.InvalidSusbcriptorRole)
    }

    const today = new Date()
    const isPromoOutdated =
      _promotion.validFrom > today || _promotion.validTo < today
    if (isPromoOutdated)
      throw new OutputError(OutputErrorTypes.PromotionOutdated)

    const subscriptionFound =
      await this._subscriptionRepository.getBySubscriptorAndPromotion(
        _subscriptor.id,
        _promotion.id
      )
    if (subscriptionFound !== null) {
      throw new OutputError(OutputErrorTypes.SubscriptionAlreadyExist, {
        id: subscriptionFound?.id ?? ''
      })
    }

    const subscriptionToCreate: SubscriptionRepositorySaveProps = {
      subscriptor,
      owner: _promotion.owner,
      promotion: _promotion.id,
      card: _promotion.card,
      company: _promotion.company,
      steps: [{ date: today }],
      status: SubscriptionStatus.inProgress
    }
    const subscriptionCreated = await this._subscriptionRepository.save(
      subscriptionToCreate
    )

    return subscriptionCreated
  }
}
