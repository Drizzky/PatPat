import nodemailer from 'nodemailer';
import generateError from '../utils/generateError.js';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendEmail = async (email, subject, body) => {
  try {
    await transport.sendMail({
      from: SMTP_USER,
      to: email,
      subject,
      text: body,
    });
  } catch (err) {
    console.error(err);
    generateError('Error sending E-mail', 500);
  }
};

//exportamos la función
export default sendEmail;
