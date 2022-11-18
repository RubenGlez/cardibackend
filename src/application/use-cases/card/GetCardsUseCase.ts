import { Card } from "../../../domain/entities/Card"
import { User } from "../../../domain/entities/User"
import { CardRepository } from "../../../domain/repositories/CardRepository"

export default class GetCardsUseCase {
  private readonly _cardRepository: CardRepository

  constructor(cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async run(tenantId: User['id']): Promise<Card[]> {
    const companies = await this._cardRepository.getAllByOwner(tenantId)
    return companies
  }
}
