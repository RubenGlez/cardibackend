import { Card } from '../../../domain/entities/Card'
import {
  CardRepository,
  CardRepositorySaveProps
} from '../../../domain/repositories/CardRepository'
import { CreateCardUseCaseDependencies, CreateCardUseCaseProps } from './types.business'

export default class CreateCardUseCase {
  private readonly _cardRepository: CardRepository

  constructor({ cardRepository }: CreateCardUseCaseDependencies) {
    this._cardRepository = cardRepository
  }

  async run({
    tenantId,
    company,
    name,
    color,
    logo,
    description
  }: CreateCardUseCaseProps): Promise<Card> {
    const cardToCreate: CardRepositorySaveProps = {
      owner: tenantId,
      company,
      name,
      color,
      logo,
      description
    }

    const cardCreated = await this._cardRepository.save(cardToCreate)
    return cardCreated
  }
}
