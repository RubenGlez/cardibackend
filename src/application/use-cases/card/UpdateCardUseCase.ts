import { Card } from '../../../domain/entities/Card'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { CardRepository } from '../../../domain/repositories/CardRepository'
import GetCardByIdService from '../../../domain/services/card/GetCardByIdService'
import { UpdateCardUseCaseDependencies, UpdateCardUseCaseProps } from './types'

export default class UpdateCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _getCardByIdService: GetCardByIdService

  constructor({ cardRepository }: UpdateCardUseCaseDependencies) {
    this._cardRepository = cardRepository
    this._getCardByIdService = new GetCardByIdService({ cardRepository })
  }

  async run({
    tenantId,
    cardId,
    name,
    color,
    logo,
    description
  }: UpdateCardUseCaseProps): Promise<Card> {
    const currentCard = await this._getCardByIdService.run({ cardId })
    if (currentCard?.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const cardToUpdate: Card = {
      ...currentCard,
      name: name ?? currentCard.name,
      color: color ?? currentCard.color,
      logo: logo ?? currentCard.logo,
      description: description ?? currentCard.description
    }

    const cardUpdated = await this._cardRepository.update(cardToUpdate)
    return cardUpdated
  }
}
