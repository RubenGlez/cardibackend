import { Card } from '../../../domain/entities/Card'
import { CardRepository } from '../../../domain/repositories/CardRepository'
import { GetCardsUseCaseDependencies, GetCardsUseCaseProps } from './types.business'

export default class GetCardsUseCase {
  private readonly _cardRepository: CardRepository

  constructor({ cardRepository }: GetCardsUseCaseDependencies) {
    this._cardRepository = cardRepository
  }

  async run({ tenantId }: GetCardsUseCaseProps): Promise<Card[]> {
    const cards = await this._cardRepository.getAllByOwner(tenantId)
    return cards
  }
}
