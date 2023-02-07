import { UserSaveDTO } from '../../dto/userSaveDTO';
import { User } from '../../models/user';
import { UserCategory } from '../../models/userCategory';

export interface IUserRepository {
    sayHello(): string;
    saveUser(user: UserSaveDTO): Promise<User>
    findUserByEmail(email: string, password: string): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    findUserCategoryById(userCategoryId: number): Promise<UserCategory>;
    updateUserPassword(userId: string, password: string): Promise<Boolean>;
    validateUser(userId: string): Promise<Boolean>;
    updateUserPassword(userId: string, password: string): Promise<Boolean>;
}

