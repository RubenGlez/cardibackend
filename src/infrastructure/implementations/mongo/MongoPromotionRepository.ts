import { Promotion } from '../../../domain/entities/Promotion'
import { PromotionRepository, PromotionRepositorySaveProps } from '../../../domain/repositories/PromotionRepository'
import PromotionModel from '../../driven-adapters/mongoose/models/PromotionModel'

export default class MongoPromotionRepository implements PromotionRepository {
  private readonly _model = PromotionModel

  private toDTO(promotionToMap: any): Promotion {
    const promotionDTO = Object.assign(
      { id: promotionToMap._id?.toString() },
      promotionToMap
    )
    delete promotionDTO._id
    delete promotionDTO.__v
    promotionDTO.user = promotionDTO.user?.toString()
    promotionDTO.company = promotionDTO.company?.toString()
    promotionDTO.card = promotionDTO.card?.toString()

    return promotionDTO
  }

  async getAllByCompany(company: Promotion['id']): Promise<Promotion[]> {
    const promotionsByCompany = await this._model.find({ company }).lean()
    if (promotionsByCompany.length === 0) return []
    const promotionsByCompanyMapped = promotionsByCompany.map(promotion =>
      this.toDTO(promotion)
    )
    return promotionsByCompanyMapped
  }

  async getById(id: Promotion['id']): Promise<Promotion | null> {
    const promotionFound = await this._model.findById(id).lean()
    if (promotionFound === null) return null
    const promotionMapped = this.toDTO(promotionFound)
    return promotionMapped
  }

  async save(inputData: PromotionRepositorySaveProps): Promise<Promotion> {
    const promotionToCreate = new this._model(inputData)
    const promotionCreated = await promotionToCreate.save()
    const promotionMapped = this.toDTO(promotionCreated.toObject())
    return promotionMapped
  }

  async update(inputData: Promotion): Promise<Promotion> {
    const promotionUpdated = await this._model
      .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
      .lean()
    const promotionMapped = this.toDTO(promotionUpdated)
    return promotionMapped
  }

  async delete(id: Promotion['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
