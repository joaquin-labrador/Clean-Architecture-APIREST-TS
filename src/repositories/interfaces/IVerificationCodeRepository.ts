import { VerficationCodeSaveDTO } from '../../dto/verificationCodeSaveDTO';
import { VerficationCode } from '../../models/verficationCode';

export interface IVerificationCodeRepository {
    saveVerificationCode(verficationCodeSaveDTO: VerficationCodeSaveDTO): Promise<VerficationCode>;
    getVerificationCode(code: number, userId: string): Promise<VerficationCode>;
}    