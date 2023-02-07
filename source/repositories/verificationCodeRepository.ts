import * as Prisma from "@prisma/client";
import { Service } from 'typedi';

import { VerficationCode } from "../models/verficationCode";
import { IVerificationCodeRepository } from "./interfaces/IVerificationCodeRepository";
import { VerficationCodeSaveDTO } from "../dto/verificationCodeSaveDTO";
import { HttpErrorHandler } from "../error/HttpErrorHandler";
import { handleRepositoryError } from "./errorRepositories/errorHandlerRepositories";

const prisma: Prisma.PrismaClient = new Prisma.PrismaClient();

@Service({ transient: true })
export class VerificationCodeRepository implements IVerificationCodeRepository {

    private verificationCodePrisma;

    private constructor() {
        this.verificationCodePrisma = prisma.verificationCode;
    }

    public async saveVerificationCode(verficationCodeSaveDTO: VerficationCodeSaveDTO): Promise<VerficationCode> {

        try {

            const verificationCode = await this.verificationCodePrisma.create({
                data: {
                    userId: verficationCodeSaveDTO.userId,
                    code: verficationCodeSaveDTO.code,
                }
            });

            return this.parseVerificationCode(verificationCode);

        } catch (error) {
            throw handleRepositoryError(error);
        }
    }
    public async getVerificationCode(code: number, userId: string): Promise<VerficationCode> {

        try {
            const verificationCode = await this.verificationCodePrisma.findFirst({
                where: {
                    code: code,
                    userId: userId,
                }
            });

            if (!verificationCode) {
                throw new HttpErrorHandler(404, "Verification code not found");
            }

            return this.parseVerificationCode(verificationCode);

        } catch (error) {
            throw handleRepositoryError(error);
        }

    }

    public async deleteVerificationCode(code: number): Promise<void> {

        try {
            await this.verificationCodePrisma.delete({
                where: {
                    code: code,
                }
            });

        } catch (error) {
            throw handleRepositoryError(error);
        }
    }

    private parseVerificationCode(verificationCode: Prisma.VerificationCode): VerficationCode {
        return new VerficationCode(verificationCode.verificationCodeId, verificationCode.userId,
            verificationCode.code, verificationCode.createdAt,
            verificationCode.updatedAt);
    }
}