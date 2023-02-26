import { Card } from '../../../domain/entities/Card'
import GetCardByIdService from '../../../domain/services/card/GetCardByIdService'
import { GetCardUseCaseDependencies, GetCardUseCaseProps } from './types.business'

export default class GetCardUseCase {
  private readonly _getCardByIdService: GetCardByIdService

  constructor({ cardRepository }: GetCardUseCaseDependencies) {
    this._getCardByIdService = new GetCardByIdService({ cardRepository })
  }

  async run({ cardId }: GetCardUseCaseProps): Promise<Card> {
    return await this._getCardByIdService.run({ cardId })
  }
}
