export class ProductCartDTO {
    public productName: string;
    public price: string;
    public image: string;
    public quantityToBuy: number;
    
    constructor(productName: string, price: string, image: string, quantityToBuy: number) {
        this.productName = productName;
        this.price = price;
        this.image = image;
        this.quantityToBuy = quantityToBuy
    }
}