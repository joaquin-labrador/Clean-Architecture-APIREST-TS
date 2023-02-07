import nodemailer from 'nodemailer';
import { HttpErrorHandler } from '../error/HttpErrorHandler';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transporter.verify().then(() => {
    console.log("Connection to email server is ok");
}).catch((error) => {
    console.log(error);
    throw new HttpErrorHandler(500, "Internal server error")
});