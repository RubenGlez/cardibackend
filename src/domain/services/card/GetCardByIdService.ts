import { Card } from "../../entities/Card"
import { CardiError } from "../../exceptions/CardiError"
import { CardiErrorTypes } from "../../exceptions/CardiErrorTypes"
import { CardRepository } from "../../repositories/CardRepository"

export default class GetCardByIdService {
  private readonly _cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run(id: Card['id']): Promise<Card> {
    const card = await this._cardRepository.getById(id)
    if (card === null) throw new CardiError(CardiErrorTypes.CardNotFound)
    return card
  }
}
