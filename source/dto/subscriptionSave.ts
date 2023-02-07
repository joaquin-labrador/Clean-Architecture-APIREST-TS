
export class SubscriptionSaveDTO {
    public userId: string;
    public userEmail: string;
    public paymentId: string;
    public status: string;
    public endDate: Date;

    constructor(userId: string, userEmail: string, paymentId: string,
        status: string, endDate: Date) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.paymentId = paymentId;
        this.status = status;
        this.endDate = endDate;
    }
}