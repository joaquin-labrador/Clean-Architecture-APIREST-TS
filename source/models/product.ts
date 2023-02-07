export class Product {

    private productId: string;
    private productName: string;
    private price: number;
    private description: string;
    private image: string;
    private stock: number;
    private productCategoryId: string;


    constructor(productId: string, productName: string, price: number, description: string, image: string, stock: number, productCategoryId: string) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.productCategoryId = productCategoryId;

    }

    // stock methods

    public plusStock(): void {
        this.stock++;
    }

    public minusStock(): void {
        this.stock--;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

}
