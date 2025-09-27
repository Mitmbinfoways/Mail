const nodemailer = require("nodemailer");

const sendMail = async (to, subject, htmlContent) => {
  try {
    // Check if required environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP_USER and SMTP_PASS environment variables are required");
    }

    console.log("Creating transporter with user:", process.env.SMTP_USER);
    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    const mailOptions = {
      from: `"Form Submission" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    console.log("Sending mail with options:", { to, subject, from: mailOptions.from });
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendMail;
