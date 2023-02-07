export class UserCategory {
    private userCategoryId: number;
    private userCategoryName: string;

    constructor(userCategoryName: string, userCategoryId: number) {
        this.userCategoryId = userCategoryId;
        this.userCategoryName = userCategoryName
    }

    // Getters

    public getUserCategoryId(): number {
        return this.userCategoryId;
    }

    public getUserCategoryName(): string {
        return this.userCategoryName;
    }
}