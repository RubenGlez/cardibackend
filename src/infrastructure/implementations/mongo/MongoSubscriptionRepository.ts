import {
  Promotion,
  Subscription,
  SubscriptionRepository,
  User,
} from "../../../domain";
import { SubscriptionModel, UuidAdapter } from "../..";

export default class MongoSubscriptionRepository
  implements SubscriptionRepository
{
  private readonly _model = SubscriptionModel;
  private readonly _uuidAdapter: UuidAdapter;

  constructor() {
    this._uuidAdapter = new UuidAdapter();
  }

  private map(subscriptionToMap: any): Subscription {
    const subscription = subscriptionToMap.toObject({ versionKey: false });
    subscription.id = subscription._id.toString();
    delete subscription._id;
    subscription.subscriptor = subscription.subscriptor.toString();
    subscription.owner = subscription.owner.toString();
    subscription.subscription = subscription.subscription.toString();
    subscription.card = subscription.card.toString();
    subscription.company = subscription.company.toString();
    return subscription as Subscription;
  }

  async getAll(): Promise<Subscription[]> {
    const allSubscriptions = await this._model.find();
    if (allSubscriptions.length === 0) return allSubscriptions;
    const allSubscriptionsMapped = allSubscriptions.map((subscription) =>
      this.map(subscription)
    );
    return allSubscriptionsMapped;
  }

  async getAllByPromotion(subscription: Promotion["id"]): Promise<Subscription[]> {
    const subscriptionsByPromotion = await this._model.find({ subscription });
    if (subscriptionsByPromotion.length === 0) return subscriptionsByPromotion;
    const subscriptionsByPromotionMapped = subscriptionsByPromotion.map(
      (subscription) => this.map(subscription)
    );
    return subscriptionsByPromotionMapped;
  }

  async getAllBySubscriptorAndPromotion(
    subscriptor: Subscription["subscriptor"],
    promotion: Subscription["promotion"]
  ): Promise<Subscription[]> {
    const subscriptionsBySubscriptorAndPromotion = await this._model.find({
      subscriptor,
      promotion,
    });
    if (subscriptionsBySubscriptorAndPromotion.length === 0)
      return subscriptionsBySubscriptorAndPromotion;
    const subscriptionsBySubscriptorAndPromotionMapped =
      subscriptionsBySubscriptorAndPromotion.map((subscription) =>
        this.map(subscription)
      );
    return subscriptionsBySubscriptorAndPromotionMapped;
  }

  async getById(id: Subscription["id"]): Promise<Subscription | null> {
    const subscriptionFound = await this._model.findById(id);
    if (subscriptionFound === null) return null;
    const subscriptionMapped = this.map(subscriptionFound);
    return subscriptionMapped;
  }

  async save(inputData: Subscription): Promise<Subscription> {
    const subscriptionToCreate = new this._model(inputData);
    const subscriptionCreated = await subscriptionToCreate.save();
    const subscriptionMapped = this.map(subscriptionCreated);
    return subscriptionMapped;
  }

  async update(inputData: Subscription): Promise<Subscription> {
    const subscriptionUpdated = await this._model.findByIdAndUpdate(
      inputData.id,
      inputData,
      { returnDocument: "after" }
    );
    const subscriptionMapped = this.map(subscriptionUpdated);
    return subscriptionMapped;
  }

  async delete(id: Subscription["id"]): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }

  generateUuid(): string {
    return this._uuidAdapter.generateUuid();
  }
}
