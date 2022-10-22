import {
  User,
  Card,
  CardRepository,
} from '../../../domain'

type InputData = Omit<Card, 'id'>

export default class CreateCardUseCase {
  private readonly _cardRepository: CardRepository

  constructor (cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Card> {
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
