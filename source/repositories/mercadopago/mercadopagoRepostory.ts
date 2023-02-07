import axios from "axios";
import { Service } from "typedi";


import { IMercadoPagoRepository } from "./interfaces/IMercadopagoRepository";
import { HttpErrorHandler } from "../../error/HttpErrorHandler";
import { handleRepositoryError } from "../errorRepositories/errorHandlerRepositories";

const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN;

@Service({ transient: true })
export class MercadoPagoRepository implements IMercadoPagoRepository {

    public async createPaymentLinkTest(): Promise<string> {
        try {
            const url = "https://api.mercadopago.com/checkout/preferences";

            const body = {
                payer_email: "test_user_1299614275@testuser.com",
                items: [
                    {
                        title: "Payment Test",
                        description: "Payment Test",
                        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                        category_id: 1,
                        quantity: 1,
                        unit_price: 100,
                        currency_id: "ARS",
                    }
                ],
                back_urls: {
                    failure: "/failure",
                    pending: "/pending",
                    success: "/success",
                },
                notification_url: process.env.NGROK_URL_NOTIFICATION,
            }

            const payment = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ADMIN_ACCESS_TOKEN}`,

                }
            })

            return payment.data;

        } catch (error) {
            console.log(error);
            throw handleRepositoryError(error);
        }

    }
    public async createSubscriptionLinkTest(): Promise<string> {
        try {
            const url = "https://api.mercadopago.com/preapproval";

            const body = {
                back_url: "https://www.mercadopago.com.ar",
                reason: "Suscripción de ejemplo",
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 100,
                    currency_id: "ARS",
                },
                payer_email: "test_user_1299614275@testuser.com",
                status: "pending"
            };

            const subscription = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`
                }
            })

            return subscription.data;
        } catch (error) {
            throw handleRepositoryError(error);
        }

    }

    public async createPaymentLink(buyerEmail: string): Promise<string> {


        try {
            const url = "https://api.mercadopago.com/checkout/preferences";

            const body = {
                payer_email: buyerEmail,
                items: [
                    {
                        title: "Payment Test",
                        description: "Payment Test",
                        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                        category_id: 1,
                        quantity: 1,
                        unit_price: 100,
                        currency_id: "ARS",
                    }
                ],
                back_urls: {
                    failure: "/failure",
                    pending: "/pending",
                    success: "/success",
                },
            }

            const payment = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`,

                }
            });

            return payment.data;

        } catch (error) {
            console.log(error);
            throw handleRepositoryError(error);
        }
    }



    public async getRecordSubscription(): Promise<string> {
        try {
            const subs = await axios.get("https://api.mercadopago.com/preapproval/search", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}`
                }
            });
            return subs.data;
        } catch (error) {
            throw handleRepositoryError(error);
        }
    }
}
