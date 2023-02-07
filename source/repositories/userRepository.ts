import * as Prisma from ".prisma/client";
import { Service } from 'typedi';

import { User } from "../models/user";
import { UserCategory } from "../models/userCategory";
import { IUserRepository } from "./interfaces/IUserRepositories";
import { UserSaveDTO } from "../dto/userSaveDTO";
import { HttpErrorHandler } from "../error/HttpErrorHandler";
import { handleRepositoryError } from "./errorRepositories/errorHandlerRepositories";

const prisma: Prisma.PrismaClient = new Prisma.PrismaClient();

@Service({ transient: true })
export class UserRepository implements IUserRepository {

    private userPrisma;
    private userCategoryPrisma;
    private constructor() {
        //private constructor to prevent creating new instances (Singleton)
        this.userPrisma = prisma.user;
        this.userCategoryPrisma = prisma.userCategory;
    }


    sayHello(): string {
        return "Hello from user repository";
    }


    public async saveUser(user: UserSaveDTO): Promise<User> {

        try {
            const newUser = await this.userPrisma.create({
                data: {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    balance: user.balance,
                    address: user.address,
                    userCategoryId: user.userCategoryId
                }
            });

            return this.parseUser(newUser);

        } catch (error) {
            throw handleRepositoryError(error);
        }

    };

    public async findUserByEmail(email: string): Promise<User> {

        try {
            const user = await this.userPrisma.findUnique({
                where: {
                    email: email,

                }
            });

            if (!user) throw new HttpErrorHandler(404, "User not found");

            return this.parseUser(user)
        } catch (error) {
            throw handleRepositoryError(error);
        }
    }

    public async findUserByUsername(username: string): Promise<User> {

        try {
            const user = await this.userPrisma.findUnique({
                where: {
                    username: username,
                }

            });
            if (!user) throw new HttpErrorHandler(404, "User not found");
            return this.parseUser(user);

        } catch (error) {
            throw handleRepositoryError(error);
        }

    }

    public async findUserById(userId: string): Promise<User> {
        try {
            const user = await this.userPrisma.findUnique({
                where: {
                    userId: userId,
                }
            });
            if (!user) throw new HttpErrorHandler(404, "User not found");

            return this.parseUser(user)
        } catch (error) {
            throw handleRepositoryError(error);
        }
    };

    public async findUserCategoryById(userCategoryId: number): Promise<UserCategory> {
        try {
            const userCategory = await this.userCategoryPrisma.findUnique({
                where: {
                    userCategoryId: userCategoryId,
                }
            });
            if (!userCategory) throw new HttpErrorHandler(404, "User category not found");

            return this.parseUserCategory(userCategory)
        } catch (error: any) {
            throw handleRepositoryError(error);
        }
    };

    public async validateUser(userId: string): Promise<Boolean> {
        try {
            const user = await this.userPrisma.update({
                where: {
                    userId: userId
                },
                data: {
                    verified: true
                }
            });
            if (!user) throw new HttpErrorHandler(400, "User not found");

            return true;
        } catch (error) {
            throw handleRepositoryError(error);
        }

    }

    public async updateUserPassword(userId: string, password: string): Promise<Boolean> {
        try {
            const user = await this.userPrisma.update({
                where: {
                    userId: userId
                },
                data: {
                    password: password
                }
            });
            if (!user) throw new HttpErrorHandler(404, "User not found");

            return true;
        } catch (error: any) {
            throw handleRepositoryError(error);
        }

    }

    private parseUser(user: Prisma.User): User {
        return new User(
            user.username,
            user.password,
            user.email,
            user.firstName,
            user.lastName,
            user.balance,
            user.address,
            user.userCategoryId,
            user.userId,
            user.verified
        );

    }

    private parseUserCategory(userCategory: Prisma.UserCategory): UserCategory {
        return new UserCategory(
            userCategory.userCategoryName,
            userCategory.userCategoryId
        );
    }



}



