import { Company } from '../../../domain/entities/Company'
import { Subscription } from '../../../domain/entities/Subscription'
import { SubscriptionRepository } from '../../../domain/repositories/SubscriptionRepository'
import SubscriptionModel from '../../driven-adapters/mongoose/models/SubscriptionModel'

export default class MongoSubscriptionRepository
  implements SubscriptionRepository {
  private readonly _model = SubscriptionModel

  private toDto(subscriptionToMap: any): Subscription {
    const subscriptionDTO = Object.assign({ id: subscriptionToMap._id?.toString() }, subscriptionToMap)
    delete subscriptionDTO._id
    delete subscriptionDTO.__v

    subscriptionDTO.subscriptor = subscriptionDTO.subscriptor?.toString()
    subscriptionDTO.owner = subscriptionDTO.owner?.toString()
    subscriptionDTO.card = subscriptionDTO.card?.toString()
    subscriptionDTO.promotion = subscriptionDTO.promotion?.toString()
    subscriptionDTO.company = subscriptionDTO.company?.toString()

    return subscriptionDTO
  }

  async getAllByCompany(
    company: Company['id']
  ): Promise<Subscription[]> {
    const subscriptionsByCompany = await this._model.find({ company }).lean()
    if (subscriptionsByCompany.length === 0) return subscriptionsByCompany
    const subscriptionsByCompanyMapped = subscriptionsByCompany.map(
      subscription => this.toDto(subscription)
    )
    return subscriptionsByCompanyMapped
  }

  async getBySubscriptorAndPromotion(
    subscriptor: Subscription['subscriptor'],
    promotion: Subscription['promotion']
  ): Promise<Subscription | null> {
    const subscriptionsBySubscriptorAndPromotion = await this._model.findOne({
      subscriptor,
      promotion
    }).lean()
    if (subscriptionsBySubscriptorAndPromotion === null) return null
    const subscriptionsBySubscriptorAndPromotionMapped = this.toDto(
      subscriptionsBySubscriptorAndPromotion
    )
    return subscriptionsBySubscriptorAndPromotionMapped
  }

  async getById(id: Subscription['id']): Promise<Subscription | null> {
    const subscriptionFound = await this._model.findById(id).lean()
    if (subscriptionFound === null) return null
    const subscriptionMapped = this.toDto(subscriptionFound)
    return subscriptionMapped
  }

  async save(inputData: Subscription): Promise<Subscription> {
    const subscriptionToCreate = new this._model(inputData)
    const subscriptionCreated = await subscriptionToCreate.save()
    const subscriptionMapped = this.toDto(subscriptionCreated.toObject())
    return subscriptionMapped
  }

  async update(inputData: Subscription): Promise<Subscription | null> {
    const subscriptionUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    ).lean()
    if (subscriptionUpdated === null) return null
    const subscriptionMapped = this.toDto(subscriptionUpdated)
    return subscriptionMapped
  }
}
