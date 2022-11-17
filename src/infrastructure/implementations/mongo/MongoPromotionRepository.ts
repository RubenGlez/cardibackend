import { Promotion, PromotionRepository, User } from '../../../domain'
import { PromotionModel } from '../..'

export default class MongoPromotionRepository implements PromotionRepository {
  private readonly _model = PromotionModel

  private map(promotionToMap: any): Promotion {
    const promotion = promotionToMap.toObject({
      versionKey: false,
      flattenMaps: true,
      transform: (doc: any, ret: any) => {
        ret.id = ret._id
        delete ret._id
        ret.subscriptions = ret.subscriptions?.map((sub: any) => {
          const _sub = { ...sub }
          delete _sub._id
          return _sub
        })
        return ret
      }
    })
    return promotion as Promotion
  }

  async getAll(): Promise<Promotion[]> {
    const allPromotions = await this._model.find()
    if (allPromotions.length === 0) return allPromotions
    const allPromotionsMapped = allPromotions.map(promotion =>
      this.map(promotion)
    )
    return allPromotionsMapped
  }

  async getAllByOwner(owner: User['id']): Promise<Promotion[]> {
    const allPromotions = await this._model.find({ owner })
    if (allPromotions.length === 0) return allPromotions
    const allPromotionsMapped = allPromotions.map(promotion =>
      this.map(promotion)
    )
    return allPromotionsMapped
  }

  async getByName(name: Promotion['name']): Promise<Promotion | null> {
    const promotionFound = await this._model.findOne({ name })
    if (promotionFound === null) return null
    const promotionMapped = this.map(promotionFound)
    return promotionMapped
  }

  async getById(id: Promotion['id']): Promise<Promotion | null> {
    const promotionFound = await this._model.findById(id)
    if (promotionFound === null) return null
    const promotionMapped = this.map(promotionFound)
    return promotionMapped
  }

  async save(inputData: Promotion): Promise<Promotion> {
    const promotionToCreate = new this._model(inputData)
    const promotionCreated = await promotionToCreate.save()
    const promotionMapped = this.map(promotionCreated)
    return promotionMapped
  }

  async update(inputData: Promotion): Promise<Promotion> {
    const promotionUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    )
    const promotionMapped = this.map(promotionUpdated)
    return promotionMapped
  }

  async delete(id: Promotion['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
