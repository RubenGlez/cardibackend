import { Subscription } from "..";

export interface SubscriptionRepository {
  getAll: () => Promise<Subscription[]>;
  getAllByPromotion: (promotion: Subscription["promotion"]) => Promise<Subscription[]>;
  getAllBySubscriptorAndPromotion: (
    subscriptor: Subscription["subscriptor"],
    promotion: Subscription["promotion"]
  ) => Promise<Subscription[]>;
  getById: (id: Subscription["id"]) => Promise<Subscription | null>;
  save: (inputData: Subscription) => Promise<Subscription>;
  update: (inputData: Subscription) => Promise<Subscription>;
  delete: (id: Subscription["id"]) => Promise<void>;
  generateUuid: () => string;
}
