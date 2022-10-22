import {
  GetCardByIdService,
  Card,
  CardRepository,
  CardiError,
  CardiErrorTypes
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
    if (cardToDelete.owner !== tenantId) throw new CardiError(CardiErrorTypes.NotOwned)

    // has promos?
    // -> no : delete
    // -> yes : trow error "must delete promos firstly"
  
    await this._cardRepository.delete(cardToDelete.id)
  }
}
