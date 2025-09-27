const sendMail = require("../Utils/Nodemailer");

const SendEmail = async (req, res) => {
  try {
    const { name, email, phone, company, message, service } = req.body;

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
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Service:</strong> ${service || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email to the target recipient
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
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const Newsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is a required field",
      });
    }

    const subject = `New Newsletter Subscription`;

    const htmlContent = `
      <h2>Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${email}</p>
    `;

    const targetEmail = process.env.TARGET_EMAIL || process.env.SMTP_USER;
    console.log("Sending newsletter email to:", targetEmail);

    await sendMail(targetEmail, subject, htmlContent);
    console.log("Newsletter email sent successfully to:", targetEmail);

    return res.status(200).json({
      success: true,
      message: "Newsletter subscription email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending newsletter email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send newsletter email",
    });
  }
};

module.exports = {
  SendEmail,
  Newsletter,
};
