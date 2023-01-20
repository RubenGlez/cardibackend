import { Card } from '../../entities/Card'
import { OutputError } from '../../exceptions/OutputError'
import { OutputErrorTypes } from '../../exceptions/OutputErrorTypes'
import { CardRepository } from '../../repositories/CardRepository'
import {
  GetCardByIdServiceDependencies,
  GetCardByIdServiceProps
} from './types'

export default class GetCardByIdService {
  private readonly _cardRepository: CardRepository

  constructor({ cardRepository }: GetCardByIdServiceDependencies) {
    this._cardRepository = cardRepository
  }

  async run({ id }: GetCardByIdServiceProps): Promise<Card> {
    const card = await this._cardRepository.getById(id)
    if (card === null) throw new OutputError(OutputErrorTypes.CardNotFound)
    return card
  }
}
