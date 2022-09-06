import {
  GetCardByIdService,
  Card,
  CardRepository,
  User,
  ResourceNotOwnedException,
} from '../../../domain'

type InputData = Omit<Card, 'owner' | 'company'>

export default class UpdateCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _getCardByIdService: GetCardByIdService


  constructor (cardRepository: CardRepository) {
    this._cardRepository = cardRepository
    this._getCardByIdService = new GetCardByIdService(cardRepository)
  }

  async run (inputData: InputData, tenantId: User['id']): Promise<Card> {
    const currentCard = await this._getCardByIdService.run(inputData.id)
    if (currentCard?.owner !== tenantId) throw new ResourceNotOwnedException()

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
