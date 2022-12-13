import { FilterQuery } from 'mongoose'
import { Promotion } from '../../../domain/entities/Promotion'
import { User } from '../../../domain/entities/User'
import { PromotionRepository } from '../../../domain/repositories/PromotionRepository'
import PromotionModel from '../../driven-adapters/mongoose/models/PromotionModel'
import { PromotionFilters } from '../../driving-adapters/api-rest/controllers/promotion/helpers'
import { getQueryPaginated, getQuerySorted } from './helpers'

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

  async getAllByOwner(
    owner: User['id'],
    filters: PromotionFilters
  ): Promise<Promotion[]> {
    const currentDate = new Date()

    const stateFilters: Record<string, FilterQuery<Promotion>> = {
      actived: {
        validFrom: { $lte: currentDate },
        validTo: { $gte: currentDate }
      },
      expired: {
        validTo: { $lte: currentDate }
      }
    }
    const stateFilter =
      filters.state !== undefined ? stateFilters[filters.state] : {}

    const query = this._model.find({ owner, ...stateFilter })
    const querySorted = getQuerySorted(query, filters)
    const querySortedAndPaginated = getQueryPaginated(querySorted, filters)
    const queryResult = await querySortedAndPaginated.lean()

    if (queryResult.length === 0) return queryResult
    const promotionsMapped = queryResult.map(promotion => this.toDTO(promotion))
    return promotionsMapped
  }

  async getById(id: Promotion['id']): Promise<Promotion | null> {
    const promotionFound = await this._model.findById(id).lean()
    if (promotionFound === null) return null
    const promotionMapped = this.toDTO(promotionFound)
    return promotionMapped
  }

  async save(inputData: Promotion): Promise<Promotion> {
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
