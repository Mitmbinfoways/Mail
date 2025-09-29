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
    const targetEmail = process.env.SMTP_USER || "nexsaar@gmail.com";

    await sendMail(targetEmail, subject, htmlContent);

    const clientSubject = "Thank you for contacting Nexsaar Technologies!";
    const clientHtml = `
      <p>Dear ${name},</p>
      <p>Greetings from <strong>Nexsaar Technologies</strong>!</p>
      <p>Thank you so much for reaching out to us. We confirm that your message, submitted through our website's Contact Us form, has been successfully received.</p>
      <p>We understand that you're looking for solutions, and our priority is to connect you with the right expertise. Our dedicated Customer Care Team is currently reviewing your inquiry to ensure the most knowledgeable specialist follows up.</p>
      <p>You can expect a personalized response within <strong>24 business hours</strong>. We look forward to addressing your request and starting a conversation about how we can best assist you.</p>
      <p>We look forward to serving you.</p>
      <br/>
      <p>Sincerely,<br/>Customer Care Team,<br/>Nexsaar Technologies</p>
    `;

    await sendMail(email, clientSubject, clientHtml);

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
