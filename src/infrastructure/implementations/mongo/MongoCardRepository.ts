import { Card } from "../../../domain/entities/Card"
import { User } from "../../../domain/entities/User"
import { CardRepository } from "../../../domain/repositories/CardRepository"
import CardModel from "../../driven-adapters/mongoose/models/CardModel"


export default class MongoCardRepository implements CardRepository {
  private readonly _model = CardModel

  private map(cardToMap: any): Card {
    const card = cardToMap.toObject({ versionKey: false })
    card.id = card._id.toString()
    delete card._id
    card.owner = card.owner.toString()
    card.company = card.company.toString()
    return card as Card
  }

  async getAllByOwner(owner: User['id']): Promise<Card[]> {
    const allCards = await this._model.find({ owner })
    if (allCards.length === 0) return allCards
    const allCardsMapped = allCards.map((card) => this.map(card))
    return allCardsMapped
  }

  async getById(id: Card['id']): Promise<Card | null> {
    const cardFound = await this._model.findById(id)
    if (cardFound === null) return null
    const cardMapped = this.map(cardFound)
    return cardMapped
  }

  async save(inputData: Card): Promise<Card> {
    const cardToCreate = new this._model(inputData)
    const cardCreated = await cardToCreate.save()
    const cardMapped = this.map(cardCreated)
    return cardMapped
  }

  async update(inputData: Card): Promise<Card> {
    const cardUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    )
    const cardMapped = this.map(cardUpdated)
    return cardMapped
  }

  async delete(id: Card['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
