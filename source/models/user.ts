export class User {

    private userId: string;
    private email: string;
    private password: string;
    private username: string;
    private firstName: string;
    private lastName: string;
    private balance: number = 0;
    private address: string;
    private userCategoryId: number;
    private verified: Boolean;

    constructor(username: string, password: string, email: string, firstName: string, lastName: string,
        balance: number, address: string, userCategoryId: number, userId: string, verified: Boolean) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.address = address;
        this.userCategoryId = userCategoryId;
        this.verified = verified;
    }



    // Getters

    public getUserId(): string {
        return this.userId;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getUsername(): string {
        return this.username;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getAddress(): string {
        return this.address;
    }

    public getUserCategoryId(): number {
        return this.userCategoryId;
    }

    public getVerified(): Boolean {
        return this.verified;
    }



}