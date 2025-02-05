import nodemailer from 'nodemailer';
import generateErrorUtil from './generateErrorUtil.js';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

const sendMailUtil = async (email, subject, body) => {
    try {
        // Send email
        await transport.sendMail({
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        });
        console.log('Email sent successfully');
    } catch (err) {
        console.error('Error sending email:', err);
        generateErrorUtil('Cannot send email', 500);
    }
};

export default sendMailUtil;
