import { hashSync, compareSync } from "bcrypt";
import { Service } from 'typedi';

import { UserRepository } from "../repositories/userRepository";
import { UserAuthEmailDTO } from "../dto/userAuthEmailDTO";
import { UserAuthUsernameDTO } from "../dto/userAuthUsername";
import { UserPayload } from "../utils/customJwtPayload";
import { generateToken } from "../jwt/generateToken";
import { UserSaveDTO } from "../dto/userSaveDTO";
import { NodemailerService } from "./nodemailerService";
import { AuthEmailDTO } from "../dto/authEmailDTO";
import { generateCode } from "../utils/generateCode";
import { isUserVerified } from "../utils/isUserVerified";
import { VerficationCodeSaveDTO } from "../dto/verificationCodeSaveDTO";
import { VerificationCodeRepository } from "../repositories/verificationCodeRepository";

const SALT = 12;

@Service({ transient: true })
export class UserAuthService {


    userRepository: UserRepository;
    nodeMailerService: NodemailerService;
    verificationCodeRepository: VerificationCodeRepository;

    private constructor(userRepository: UserRepository, nodeMailerService: NodemailerService, verificationCodeRepository: VerificationCodeRepository) {
        console.log("User auth service created");
        this.userRepository = userRepository;
        this.nodeMailerService = nodeMailerService;
        this.verificationCodeRepository = verificationCodeRepository;
    }

    sayHello(): string {
        return this.userRepository.sayHello();
    }

    //register user service
    public async registerUser(userSaveDTO: UserSaveDTO): Promise<Boolean> {

        userSaveDTO.password = hashSync(userSaveDTO.password, SALT);
        const newUser = await this.userRepository.saveUser(userSaveDTO);

        const authEmailDTO = new AuthEmailDTO(newUser.getEmail(), newUser.getUserId());

        await this.nodeMailerService.sendVerificationEmail(authEmailDTO) //send verification email

        return (newUser) ? true : false;
    }


    async authenticateUserByEmail(email: string, password: string): Promise<string | null> {

        const authUserDTO = new UserAuthEmailDTO(email, password);
        const user = await this.userRepository.findUserByEmail(authUserDTO.getEmail());
        isUserVerified(user);

        const match = compareSync(authUserDTO.getPassword(), user.getPassword());

        if (!match) return null;

        const userCategory = await this.userRepository.findUserCategoryById(user.getUserCategoryId());

        const userPayload: UserPayload = {
            userId: user.getUserId(),
            userCategory: userCategory.getUserCategoryName()
        }
        return generateToken(userPayload);

    }

    async authenticateUserByUsername(username: string, password: string): Promise<string | null> {

        const authUserDTO = new UserAuthUsernameDTO(username, password);
        const user = await this.userRepository.findUserByUsername(authUserDTO.getUsername());
        isUserVerified(user);

        const match = compareSync(authUserDTO.getPassword(), user.getPassword());

        if (!match) return null;

        const userCategory = await this.userRepository.findUserCategoryById(user.getUserCategoryId());

        const userPayload: UserPayload = {
            userId: user.getUserId(),
            userCategory: userCategory.getUserCategoryName()
        }
        return generateToken(userPayload);

    }

    async validateUser(userId: string): Promise<void> {
        this.userRepository.validateUser(userId);
    }

    async sendCodePasswordReset(email: string): Promise<Boolean> {
        const user = await this.userRepository.findUserByEmail(email);
        isUserVerified(user);

        const code = generateCode();
        const verificationCodeDTO = new VerficationCodeSaveDTO(user.getUserId(), code);

        await this.nodeMailerService.sendResetPasswordEmail(verificationCodeDTO, email);
        const isSaved = this.verificationCodeRepository.saveVerificationCode(verificationCodeDTO);

        return Boolean(isSaved);
    }

    async resetPassword(code: number, password: string, email: string): Promise<Boolean> {

        const user = await this.userRepository.findUserByEmail(email);
        isUserVerified(user);

        await this.verificationCodeRepository.getVerificationCode(code, user.getUserId());

        const newPassword = hashSync(password, SALT);
        const isUpdated = this.userRepository.updateUserPassword(user.getUserId(), newPassword);

        await this.verificationCodeRepository.deleteVerificationCode(code);
        return isUpdated;


    }
}

