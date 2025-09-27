const sendMail = require("../Utils/Nodemailer");

const SendEmail = async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    const { name, email, phone, company, message ,service } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    const subject = `New Inquiry from ${name}`;

    const htmlContent = `
      <h2>New Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    
    // Send email to the target recipient (you can set this in .env as TARGET_EMAIL)
    const targetEmail = process.env.TARGET_EMAIL || process.env.SMTP_USER;
    console.log("Sending email to:", targetEmail);
    
    await sendMail(targetEmail, subject, htmlContent);
    console.log("Email sent successfully to:", targetEmail);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  SendEmail,
};
