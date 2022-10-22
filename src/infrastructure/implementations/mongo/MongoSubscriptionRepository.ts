import { Subscription, SubscriptionRepository } from '../../../domain'
import { SubscriptionModel } from '../..'
import { Document, Types } from 'mongoose'

type SubscriptionToMap = Document<unknown, any, Subscription> &
  Subscription & {
    _id: Types.ObjectId
  }

export default class MongoSubscriptionRepository
  implements SubscriptionRepository
{
  private readonly _model = SubscriptionModel

  private map(subscriptionToMap: SubscriptionToMap): Subscription {
    return {
      id: subscriptionToMap._id.toString(),
      subscriptor: subscriptionToMap.subscriptor?.toString(),
      owner: subscriptionToMap.owner?.toString(),
      promotion: subscriptionToMap.promotion?.toString(),
      card: subscriptionToMap.card?.toString(),
      company: subscriptionToMap.company?.toString(),
      steps: subscriptionToMap.steps.map(step => ({
        id: step.id?.toString(),
        date: step.date
      })),
      status: subscriptionToMap.status,
      createdAt: subscriptionToMap.createdAt,
      updatedAt: subscriptionToMap.updatedAt
    }
  }

  async getAll(): Promise<Subscription[]> {
    const allSubscriptions = await this._model.find()
    if (allSubscriptions.length === 0) return allSubscriptions
    const allSubscriptionsMapped = allSubscriptions.map(subscription =>
      this.map(subscription)
    )
    return allSubscriptionsMapped
  }

  async getAllByPromotion(
    promotion: Subscription['promotion']
  ): Promise<Subscription[]> {
    const subscriptionsByPromotion = await this._model.find({ promotion })
    if (subscriptionsByPromotion.length === 0) return subscriptionsByPromotion
    const subscriptionsByPromotionMapped = subscriptionsByPromotion.map(
      subscription => this.map(subscription)
    )
    return subscriptionsByPromotionMapped
  }

  async getBySubscriptorAndPromotion(
    subscriptor: Subscription['subscriptor'],
    promotion: Subscription['promotion']
  ): Promise<Subscription | null> {
    const subscriptionsBySubscriptorAndPromotion = await this._model.findOne({
      subscriptor,
      promotion
    })
    if (subscriptionsBySubscriptorAndPromotion === null) return null
    const subscriptionsBySubscriptorAndPromotionMapped = this.map(
      subscriptionsBySubscriptorAndPromotion
    )
    return subscriptionsBySubscriptorAndPromotionMapped
  }

  async getById(id: Subscription['id']): Promise<Subscription | null> {
    const subscriptionFound = await this._model.findById(id)
    if (subscriptionFound === null) return null
    const subscriptionMapped = this.map(subscriptionFound)
    return subscriptionMapped
  }

  async save(inputData: Subscription): Promise<Subscription> {
    const subscriptionToCreate = new this._model(inputData)
    const subscriptionCreated = await subscriptionToCreate.save()
    const subscriptionMapped = this.map(subscriptionCreated)
    return subscriptionMapped
  }

  async update(inputData: Subscription): Promise<Subscription | null> {
    const subscriptionUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: 'after' }
    )
    if (subscriptionUpdated === null) return null
    const subscriptionMapped = this.map(subscriptionUpdated)
    return subscriptionMapped
  }

  async delete(id: Subscription['id']): Promise<void> {
    await this._model.findByIdAndDelete(id)
  }
}
