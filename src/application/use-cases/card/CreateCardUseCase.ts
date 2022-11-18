import { Card } from "../../../domain/entities/Card"
import { User } from "../../../domain/entities/User"
import { CardRepository } from "../../../domain/repositories/CardRepository"

type InputData = Omit<Card, 'id'>

export default class CreateCardUseCase {
  private readonly _cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Card> {
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
