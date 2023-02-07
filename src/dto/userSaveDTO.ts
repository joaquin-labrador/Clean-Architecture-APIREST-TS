export class UserSaveDTO {

    public email: string;
    public password: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public balance: number = 0;
    public address: string;
    public userCategoryId: number;

    constructor(username: string, password: string, email: string, firstName: string, lastName: string,
        balance: number, address: string, userCategoryId: number) {

        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.address = address;
        this.userCategoryId = userCategoryId;
    }
} 