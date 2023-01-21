import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { CardRepository } from '../../../domain/repositories/CardRepository'
import GetCardByIdService from '../../../domain/services/card/GetCardByIdService'
import { DeleteCardUseCaseDependencies, DeleteCardUseCaseProps } from './types'

export default class DeleteCardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _getCardByIdService: GetCardByIdService

  constructor({ cardRepository }: DeleteCardUseCaseDependencies) {
    this._cardRepository = cardRepository
    this._getCardByIdService = new GetCardByIdService({ cardRepository })
  }

  async run({ cardId, tenantId }: DeleteCardUseCaseProps): Promise<void> {
    const cardToDelete = await this._getCardByIdService.run({ cardId })
    if (cardToDelete.owner !== tenantId) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    // TODO: improve this flow
    // has promos?
    // -> no : delete
    // -> yes : trow error "must delete promos firstly"

    await this._cardRepository.delete(cardToDelete.id)
  }
}
