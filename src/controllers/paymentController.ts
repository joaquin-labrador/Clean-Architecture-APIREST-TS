import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";


import { HttpErrorHandler } from "../error/HttpErrorHandler";
import { PaymentService } from "../service/mercadopago/paymentService";

@Service({ transient: true })
export class PaymentController {
    private paymentService: PaymentService;

    constructor(paymentService: PaymentService) {
        this.paymentService = paymentService
    }

    async getPaymentLink(req: Request, res: Response, next: NextFunction) {

        try {

            const paymentLink = await this.paymentService.createPaymentLinkTest();
            res.status(200).json({ paymentLink });

        } catch (error) {

            throw new HttpErrorHandler(500, "Error creating payment link");

        }
    }

    async getSubscriptionLink(req: Request, res: Response, next: NextFunction) {
        try {

            const subscriptionLink = await this.paymentService.createSubscriptionLinkTest();
            res.status(200).json({ subscriptionLink });

        } catch (error) {
            console.log(error);
            throw new HttpErrorHandler(500, "Error creating subscription link");

        }
    }

    async getNotification(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Notification received");
            res.status(200).json(req.query);
        } catch (error) {
            console.log(error);
            throw new HttpErrorHandler(500, "Error in notification");

        }
    }

    async getRecordSubscription(req: Request, res: Response, next: NextFunction) {
        try {
            const subscription = await this.paymentService.getRecordSubscription();
            res.status(200).json(subscription);
        } catch (error) {
            console.log(error);
            throw new HttpErrorHandler(500, "Error getting record subscription");
        }


    }
}