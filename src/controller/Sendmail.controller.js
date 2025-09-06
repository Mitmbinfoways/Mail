const sendMail = require("../Utils/Nodemailer");

const SendEmail = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    const subject = `New Inquiry from ${name}`;

    const htmlContent = `
      <h2>New Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    
    await sendMail(process.env.SMTP_USER, subject, htmlContent);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

module.exports = {
  SendEmail,
};
