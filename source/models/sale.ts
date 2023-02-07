
export class Sale {
    private saleId: string;
    private userId: string;
    private shippingCost: number;
    private allProductsCost: number;
    private totalCost: number;
    private date: Date;

    constructor(saleId: string, userId: string, shippingCost: number, allProductsCost: number, date: Date) {
        this.saleId = saleId;
        this.shippingCost = shippingCost;
        this.userId = userId;
        this.date = date;
        this.allProductsCost = allProductsCost;
        this.totalCost = this.shippingCost + this.allProductsCost;
    }
}