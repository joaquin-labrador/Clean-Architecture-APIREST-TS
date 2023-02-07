import { Service } from "typedi";

import { MercadoPagoRepository } from "../../repositories/mercadopago/mercadopagoRepostory";

@Service({ transient: true })
export class PaymentService {
    private mercadoPagoRepository: MercadoPagoRepository;

    private constructor(mercadoPagoRepository: MercadoPagoRepository) {
        this.mercadoPagoRepository = mercadoPagoRepository;
    }

    async createPaymentLinkTest(): Promise<string> {
        const payment = await this.mercadoPagoRepository.createPaymentLinkTest();
        return payment;
    };

    async createSubscriptionLinkTest(): Promise<string> {
        const subscription = await this.mercadoPagoRepository.createSubscriptionLinkTest();
        return subscription;
    };

    async getRecordSubscription(): Promise<string> {
        const subscriptionRecord = await this.mercadoPagoRepository.getRecordSubscription();

        return subscriptionRecord;
    }


}