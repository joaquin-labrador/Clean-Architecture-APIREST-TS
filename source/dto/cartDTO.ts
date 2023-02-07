import { ProductCartDTO } from "./productCartDTO";

export class CartDTO {
    public userId: string;
    public productList: Array<ProductCartDTO>
    public total: number;

    constructor(userId: string, productList: Array<ProductCartDTO>, quantity: number, total: number) {
        this.userId = userId;
        this.productList = productList;
        this.total = total;
    }

}