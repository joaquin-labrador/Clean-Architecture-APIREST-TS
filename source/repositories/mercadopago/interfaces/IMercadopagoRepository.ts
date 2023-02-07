export interface IMercadoPagoRepository {
    createPaymentLinkTest(): Promise<string>;
    createSubscriptionLinkTest(): Promise<string>;
}