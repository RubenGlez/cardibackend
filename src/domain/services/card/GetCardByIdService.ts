import { Card, CardNotFoundException, CardRepository } from '../../../domain'

export default class GetCardByIdService {
  private readonly _cardRepository: CardRepository

  constructor (cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run (id: Card['id']): Promise<Card> {
    const card = await this._cardRepository.getById(id)
    if (card === null) throw new CardNotFoundException()
    return card
  }
}
