import nodemailer from "nodemailer";
import { env } from '../../../config/env.service.js';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { 
        user: env.googleAccountEmail,
        pass:env.googleAppPassword
    }
})

export const sendEmail = async ({to, subject, html}) => {
const info = await transporter.sendMail({
    from: `ruba moshet <${env.googleAccountEmail}>`,
    to ,
    subject,
    html
})
console.log("mail sent")



}