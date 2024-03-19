import nodemailer from "nodemailer";

const { USERNAMEMAILTRAP, PASSPASSWORDMAILTRAP } = process.env;

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
  const email = { ...data, from: USERNAMEMAILTRAP };
  return transporter.sendMail(email);
};

export default sendEmail;
