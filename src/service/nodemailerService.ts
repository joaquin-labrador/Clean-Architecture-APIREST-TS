import nodemailer from 'nodemailer';
import { Service } from 'typedi';

import { AuthEmailDTO } from '../dto/authEmailDTO';
import { HttpErrorHandler } from '../error/HttpErrorHandler';
import { transporter } from '../config/mailer';
import { VerficationCodeSaveDTO } from '../dto/verificationCodeSaveDTO';

@Service({ transient: true })
export class NodemailerService {

    private transporter: nodemailer.Transporter;

    private constructor() {
        this.transporter = transporter;
    }


    async sendVerificationEmail(auhtEmailDTO: AuthEmailDTO) {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL,
                to: auhtEmailDTO.email,
                subject: "Verification code",
                text: `Verify your account clicking on the link below \n http://localhost:${process.env.PORT}/verify/${auhtEmailDTO.userId}`

            })
        } catch (error) {
            console.log(error);
            throw new HttpErrorHandler(500, "Internal server error")
        }
    }

    async sendResetPasswordEmail(auhtEmailDTO: VerficationCodeSaveDTO, email: string) {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Reset password",
                text: `\t Insert this code to reset your password \n\t ${auhtEmailDTO.code}`

            })
        } catch (error) {
            console.log(error);
            throw new HttpErrorHandler(500, "Internal server error")
        }
    }


}
