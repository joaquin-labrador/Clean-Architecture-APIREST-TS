export class Subscription {
    private userId: string;
    private userEmail: string;
    private paymentId: string;
    private status: string;
    private createdAt: Date;
    private updatedAt: Date;
    private endDate: Date;

    constructor(userId: string, userEmail: string, paymentId: string, status: string, endDate: Date,
        createdAt: Date, updatedAt: Date) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.paymentId = paymentId;
        this.status = status;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getUserEmail(): string {
        return this.userEmail;
    }

    public getPaymentId(): string {
        return this.paymentId;
    }

    public getStatus(): string {
        return this.status;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }


}