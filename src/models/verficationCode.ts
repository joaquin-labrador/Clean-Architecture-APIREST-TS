export class VerficationCode {
    private verificationCodeId: number;
    private userId: string;
    private code: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(verificationCodeId: number, userId: string, code: number, createdAt: Date, updatedAt: Date) {
        this.verificationCodeId = verificationCodeId;
        this.userId = userId;
        this.code = code;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //all getters
    public getVerificationCodeId(): number {
        return this.verificationCodeId;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getCode(): number {
        return this.code;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}