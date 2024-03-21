import nodemailer from "nodemailer";

const { USERNAMEMAILTRAP, PASSPASSWORDMAILTRAP, EMAIL } = process.env;

const transport = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: USERNAMEMAILTRAP,
    pass: PASSPASSWORDMAILTRAP,
  },
};

const transporter = nodemailer.createTransport(transport);

const sendEmail = (data) => {
  const email = { ...data, from: EMAIL };
  return transporter.sendMail(email);
};

export default sendEmail;
