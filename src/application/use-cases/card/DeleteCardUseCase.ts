import { Card } from "../../../domain/entities/Card"
import { CardiError } from "../../../domain/exceptions/CardiError"
import { CardiErrorTypes } from "../../../domain/exceptions/CardiErrorTypes"
import { CardRepository } from "../../../domain/repositories/CardRepository"
import GetCardByIdService from "../../../domain/services/card/GetCardByIdService"

export default class DeleteCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _getCardByIdService: GetCardByIdService

  constructor(cardRepository: CardRepository) {
    this._cardRepository = cardRepository
    this._getCardByIdService = new GetCardByIdService(cardRepository)
  }

  async run(
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
