import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {

  console.log(" MAIL FUNCTION CALLED");

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"STREAMPLAY" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log(" MAIL SENT:", info.response);

  } catch (err) {

    console.log(" MAIL ERROR:", err);

  }
};