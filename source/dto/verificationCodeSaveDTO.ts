export class VerficationCodeSaveDTO {
    userId: string;
    code: number;

    constructor(userId: string, code: number) {
        this.userId = userId;
        this.code = code;
    }

}