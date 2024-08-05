import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const smtpMailer = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_GMAIL_APP_PASSWORD,
  },
});

export default smtpMailer;
