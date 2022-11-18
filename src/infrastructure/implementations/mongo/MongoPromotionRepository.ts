import { Promotion } from "../../../domain/entities/Promotion"
import { User } from "../../../domain/entities/User"
import { PromotionRepository } from "../../../domain/repositories/PromotionRepository"
import PromotionModel from "../../driven-adapters/mongoose/models/PromotionModel"

export default class MongoPromotionRepository implements PromotionRepository {
  private readonly _model = PromotionModel

  private toDTO(promotionToMap: any): Promotion {
    const promotionDTO = Object.assign({ id: promotionToMap._id }, promotionToMap)
    delete promotionDTO._id
    delete promotionDTO.__v
    return promotionDTO
  }

  async getAllByOwner(owner: User['id']): Promise<Promotion[]> {
    const allPromotions = await this._model.find({ owner }).lean()
    if (allPromotions.length === 0) return allPromotions
    const allPromotionsMapped = allPromotions.map(promotion =>
      this.toDTO(promotion)
    )
    return allPromotionsMapped
  }

  async getById(id: Promotion['id']): Promise<Promotion | null> {
    const promotionFound = await this._model.findById(id)
    if (promotionFound === null) return null
    const promotionMapped = this.toDTO(promotionFound)
    return promotionMapped
  }

  async save(inputData: Promotion): Promise<Promotion> {
    const promotionToCreate = new this._model(inputData)
    const promotionCreated = await promotionToCreate.save()
    const promotionMapped = this.toDTO(promotionCreated)
    return promotionMapped
  }

  async update(inputData: Promotion): Promise<Promotion> {
    const promotionUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    )
    const promotionMapped = this.toDTO(promotionUpdated)
    return promotionMapped
  }

  async delete(id: Promotion['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
