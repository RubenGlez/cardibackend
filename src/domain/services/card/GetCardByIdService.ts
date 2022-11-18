import { Card } from "../../entities/Card"
import { OutputError } from "../../exceptions/OutputError"
import { OutputErrorTypes } from "../../exceptions/OutputErrorTypes"
import { CardRepository } from "../../repositories/CardRepository"

export default class GetCardByIdService {
  private readonly _cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run(id: Card['id']): Promise<Card> {
    const card = await this._cardRepository.getById(id)
    if (card === null) throw new OutputError(OutputErrorTypes.CardNotFound)
    return card
  }
}
