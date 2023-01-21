import { Card } from '../../../domain/entities/Card'
import { User } from '../../../domain/entities/User'
import {
  CardRepository,
  CardRepositorySaveProps
} from '../../../domain/repositories/CardRepository'
import CardModel from '../../driven-adapters/mongoose/models/CardModel'

export default class MongoCardRepository implements CardRepository {
  private readonly _model = CardModel

  private toDto(cardToMap: any): Card {
    const cardDTO = Object.assign({ id: cardToMap._id?.toString() }, cardToMap)
    delete cardDTO._id
    delete cardDTO.__v
    cardDTO.owner = cardDTO.owner?.toString()
    cardDTO.company = cardDTO.company?.toString()
    return cardDTO
  }

  async getAllByOwner(owner: User['id']): Promise<Card[]> {
    const allCards = await this._model.find({ owner }).lean()
    if (allCards.length === 0) return []
    const allCardsMapped = allCards.map(card => this.toDto(card))
    return allCardsMapped
  }

  async getById(id: Card['id']): Promise<Card | null> {
    const cardFound = await this._model.findById(id).lean()
    if (cardFound === null) return null
    const cardMapped = this.toDto(cardFound)
    return cardMapped
  }

  async save(inputData: CardRepositorySaveProps): Promise<Card> {
    const cardToCreate = new this._model(inputData)
    const cardCreated = await cardToCreate.save()
    const cardMapped = this.toDto(cardCreated.toObject())
    return cardMapped
  }

  async update(inputData: Card): Promise<Card> {
    const cardUpdated = await this._model
      .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
      .lean()
    const cardMapped = this.toDto(cardUpdated)
    return cardMapped
  }

  async delete(id: Card['id']): Promise<void> {
    await this._model.findByIdAndDelete(id).lean()
  }
}
