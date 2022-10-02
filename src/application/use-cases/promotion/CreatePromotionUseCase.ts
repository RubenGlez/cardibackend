import {
  Promotion,
  PromotionRepository,
  User,
  UserRepository,
  UserHasBusinessRoleService,
  CardiError,
  CardiErrorTypes,
} from '../../../domain'

type InputData = Omit<Promotion, 'id'>

export default class CreatePromotionUseCase {
  private readonly _promotionRepository: PromotionRepository
  private readonly _userHasBusinessRoleService: UserHasBusinessRoleService

  constructor (promotionRepository: PromotionRepository, userRepository: UserRepository) {
    this._promotionRepository = promotionRepository
    this._userHasBusinessRoleService = new UserHasBusinessRoleService(userRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Promotion> {
    const userHasBusinessRole = await this._userHasBusinessRoleService.run(tenantId)
    if (!userHasBusinessRole) throw new CardiError(CardiErrorTypes.InvalidUserRole)

    const promotionToCreate: Promotion = {
      owner: tenantId,
      company: inputData.company,
      card: inputData.card,
      name: inputData.name,
      description: inputData.description,
      type: inputData.type,
      validFrom: inputData.validFrom,
      validTo: inputData.validTo,
    }

    const promotionCreated = await this._promotionRepository.save(promotionToCreate)
    return promotionCreated
  }
}
