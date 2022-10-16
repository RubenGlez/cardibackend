import { Card, CardRepository, User } from '../../../domain'

export default class GetCardsUseCase {
  private readonly _cardRepository: CardRepository

  constructor (cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run (tenantId: User['id']): Promise<Card[]> {
    const companies = await this._cardRepository.getAllByOwner(tenantId)
    return companies
  }
}
