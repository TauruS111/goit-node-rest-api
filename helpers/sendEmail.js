import nodemailer from "nodemailer";

// const { USERNAMEMAILTRAP, PASSPASSWORDMAILTRAP } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "72b2e90af01b0c",
    pass: "90cb3ef8390aea",
  },
});

const transporter = nodemailer.createTestAccount(transport);

const sendEmail = (data) => {
  const email = { ...data, from: USERNAMEMAILTRAP };
  return transporter.sendEmail(email);
};

export default sendEmail;
