import * as Prisma from ".prisma/client";
import { Service } from 'typedi';


import { HttpErrorHandler } from "../error/HttpErrorHandler";
import { Subscription } from "../models/subscription";
import { handleRepositoryError } from "./errorRepositories/errorHandlerRepositories";
import { SubscriptionSaveDTO } from "../dto/subscriptionSave";


const prisma: Prisma.PrismaClient = new Prisma.PrismaClient();

@Service({ transient: true })
export class SubscriptionRepository {

    private subscriptionPrisma = prisma;



    public async getSubscriptionByUserId(userId: string): Promise<Subscription> {
        try {
            const subscription = await this.subscriptionPrisma.subscription.findFirst({
                where: {
                    userId: userId,
                }
            });

            if (!subscription) {
                throw new HttpErrorHandler(404, "Subscription not found");
            }

            return this.parseSubscription(subscription);

        } catch (error) {
            throw handleRepositoryError(error);
        }
    }

    public async saveSubscription(subscription: SubscriptionSaveDTO): Promise<Subscription> {
        try {
            const newSubscription = await this.subscriptionPrisma.subscription.create({
                data: {
                    userId: subscription.userId,
                    userEmail: subscription.userEmail,
                    paymentId: subscription.paymentId,
                    status: subscription.status,
                    endDate: subscription.endDate,
                }
            });

            return this.parseSubscription(newSubscription);

        } catch (error) {
            throw handleRepositoryError(error);
        }
    }


    private parseSubscription(subscription: Prisma.Subscription): Subscription {
        return new Subscription(subscription.userId, subscription.userEmail, subscription.paymentId,
            subscription.status, subscription.endDate, subscription.createdAt, subscription.updatedAt);
    }
}
