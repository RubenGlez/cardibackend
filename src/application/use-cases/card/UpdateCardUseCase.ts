import { Card } from "../../../domain/entities/Card"
import { User } from "../../../domain/entities/User"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { CardRepository } from "../../../domain/repositories/CardRepository"
import GetCardByIdService from "../../../domain/services/card/GetCardByIdService"

type InputData = Omit<Card, 'owner' | 'company'>

export default class UpdateCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _getCardByIdService: GetCardByIdService


  constructor(cardRepository: CardRepository) {
    this._cardRepository = cardRepository
    this._getCardByIdService = new GetCardByIdService(cardRepository)
  }

  async run(inputData: InputData, tenantId: User['id']): Promise<Card> {
    const currentCard = await this._getCardByIdService.run(inputData.id)
    if (currentCard?.owner !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)

    const cardToUpdate: Card = {
      ...currentCard,
      name: inputData.name ?? currentCard.name,
      color: inputData.color ?? currentCard.color,
      logo: inputData.logo ?? currentCard.logo,
      description: inputData.description ?? currentCard.description,
    }

    const cardUpdated = await this._cardRepository.update(cardToUpdate)
    return cardUpdated
  }
}
