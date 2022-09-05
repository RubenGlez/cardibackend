import {
  User,
  UserRepository,
  UserHasBusinessRoleService,
  UserRoleException,
  Card,
  CardRepository
} from '../../../domain'

type InputData = Card

export default class CreateCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _userHasBusinessRoleService: UserHasBusinessRoleService

  constructor (cardRepository: CardRepository, userRepository: UserRepository) {
    this._cardRepository = cardRepository
    this._userHasBusinessRoleService = new UserHasBusinessRoleService(userRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Card> {
    const userHasBusinessRole = await this._userHasBusinessRoleService.run(tenantId)
    if (!userHasBusinessRole) throw new UserRoleException()

    const cardToCreate: Card = {
      owner: tenantId,
      company: inputData.company,
      name: inputData.name,
      color: inputData.color,
      logo: inputData.logo,
      description: inputData.description
    }

    const cardCreated = await this._cardRepository.save(cardToCreate)
    return cardCreated
  }
}
