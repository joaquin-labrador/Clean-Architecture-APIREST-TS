export class AuthEmailDTO {

    email: string;
    userId: string;

    constructor(email: string, userId: string) {
        this.email = email;
        this.userId = userId;

    }

}