import { GetCardByIdService, Card, CardRepository } from '../../../domain'

export default class GetCardUseCase {
  private readonly _getCardByIdService: GetCardByIdService

  constructor (cardRepository: CardRepository) {
    this._getCardByIdService = new GetCardByIdService(cardRepository)
  }

  async run (id: Card['id']): Promise<Card> {
    return await this._getCardByIdService.run(id)
  }
}
