const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.host,
      // port: process.env.port,
      service: "Gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: process.env.user,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Email could not be sent:", error);
  }
};

module.exports = sendMail;
