export class ProductCategory {
    private productCategoryId: string | undefined;
    private productCategoryName: string;

    constructor(productCategoryName: string, productCategoryId?: string) {
        this.productCategoryId = productCategoryId;
        this.productCategoryName = productCategoryName;
    }

}   
