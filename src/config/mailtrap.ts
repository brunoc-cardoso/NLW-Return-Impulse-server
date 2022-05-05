import nodemailer from 'nodemailer';

const dotenv = require('dotenv');

dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export { transport };
