import { Subscription } from "../../models/subscription";
import { SubscriptionSaveDTO } from "../../dto/subscriptionSave";

export interface ISubscriptionRepository {
    getSubscriptionByUserId(userId: string): Promise<Subscription>;
    saveSubscription(subscription: SubscriptionSaveDTO): Promise<Subscription>;
}
