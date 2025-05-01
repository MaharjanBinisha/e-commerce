// utils/sendVerificationEmail.js
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Account",
    html: `
      <p>Hello,</p>
      <p>Welcome to Ensemble! We're so excited to have you on board. </p>
      <p>Your verification code is: <b>${verificationCode}</b></p>
      <p>Enter this code in the app to complete registration and start exploring our latest collections.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
