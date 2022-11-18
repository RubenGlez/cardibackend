import { Subscription } from "../entities/Subscription";

export interface SubscriptionRepository {
  getAllByPromotion: (promotion: Subscription["promotion"]) => Promise<Subscription[]>;
  getBySubscriptorAndPromotion: (
    subscriptor: Subscription["subscriptor"],
    promotion: Subscription["promotion"]
  ) => Promise<Subscription | null>;
  getById: (id: Subscription["id"]) => Promise<Subscription | null>;
  save: (inputData: Subscription) => Promise<Subscription>;
  update: (inputData: Subscription) => Promise<Subscription | null>;
}
