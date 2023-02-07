
export class SaleDetails {
    private saleDetailsId: string | undefined; // saleDetailsId is the primary key
    private saleId: string; // saleId is the foreign key
    private productId: string; // productId is the foreign key
    private quantity: number;
    private productCost: number;
    private totalCost: number;


    constructor(quantity: number, productCost: number,
        saleId: string, productId: string, saleDetailsId?: string) {
        this.saleDetailsId = saleDetailsId;
        this.saleId = saleId;
        this.productId = productId;
        this.quantity = quantity;
        this.productCost = productCost;
        this.totalCost = this.quantity * this.productCost;
    }

    // Getters

    public getSaleDetailsId(): string | undefined {
        return this.saleDetailsId;
    }

    public getSaleId(): string {
        return this.saleId;
    }

    public getProductId(): string {
        return this.productId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getProductCost(): number {
        return this.productCost;
    }

    public getTotalCost(): number {
        return this.totalCost;
    }


} 