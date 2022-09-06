import {
  GetCardByIdService,
  Card,
  CardRepository,
  ResourceNotOwnedException
} from '../../../domain'

export default class DeleteCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _getCardByIdService: GetCardByIdService

  constructor (cardRepository: CardRepository) {
    this._cardRepository = cardRepository
    this._getCardByIdService = new GetCardByIdService(cardRepository)
  }

  async run (
    cardId: Card['id'],
    tenantId: Card['id']
  ): Promise<void> {
    
    const cardToDelete = await this._getCardByIdService.run(cardId)
    if (cardToDelete.owner !== tenantId) throw new ResourceNotOwnedException()
  
    await this._cardRepository.delete(cardToDelete.id)
  }
}
