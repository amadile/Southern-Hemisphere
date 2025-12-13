const nodemailer = require("nodemailer");

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send contact form auto-response email
 */
const sendContactAutoResponse = async (to, name) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: "Thank You for Contacting Southern Hemisphere Foundation",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0A3D62 0%, #3DC1D3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .button { background: #F6B93B; color: #0A3D62; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Southern Hemisphere Foundation</h1>
            <p style="margin: 0; font-size: 18px;">Building Brighter Tomorrows</p>
          </div>
          <div class="content">
            <h2>Dear ${name},</h2>
            <p>Thank you for reaching out to Southern Hemisphere Foundation.</p>
            <p>Your message has been received successfully, and our team will get back to you within 24–48 hours.</p>
            <p>If your inquiry is urgent, please feel free to call us directly at:</p>
            <p style="font-size: 18px; margin: 15px 0;">
              📞 <strong>+256 762 658 295</strong><br>
              📞 <strong>+256 753 044 889</strong>
            </p>
            <p>We appreciate your interest in our work and look forward to assisting you.</p>
            <p style="margin-top: 30px;">Warm regards,<br><strong>Southern Hemisphere Foundation</strong></p>
            <p style="font-size: 14px; color: #666;">
              Bunamwaya, Makindye–Ssabagabo, Wakiso District<br>
              southernhemispherefoundation@gmail.com
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Southern Hemisphere Foundation. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Send contact notification to admin
 */
const sendContactNotification = async (contactData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message: ${contactData.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A3D62; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #3DC1D3; }
          .label { font-weight: bold; color: #0A3D62; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Message Received</h2>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">From:</span> ${contactData.name}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${contactData.email}
            </div>
            ${
              contactData.phone
                ? `<div class="info-row"><span class="label">Phone:</span> ${contactData.phone}</div>`
                : ""
            }
            <div class="info-row">
              <span class="label">Subject:</span> ${contactData.subject}
            </div>
            <div class="info-row">
              <span class="label">Message:</span><br>
              <p style="margin-top: 10px; white-space: pre-wrap;">${
                contactData.message
              }</p>
            </div>
            <div class="info-row">
              <span class="label">Date:</span> ${new Date(
                contactData.createdAt
              ).toLocaleString()}
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Admin notification error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Send donation confirmation email
 */
const sendDonationConfirmation = async (donationData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: donationData.donorEmail,
    subject: "Thank You for Your Generous Donation",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0A3D62 0%, #3DC1D3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .donation-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #F6B93B; }
          .amount { font-size: 32px; color: #0A3D62; font-weight: bold; text-align: center; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You! 🙏</h1>
            <p style="margin: 0; font-size: 18px;">Your donation makes a difference</p>
          </div>
          <div class="content">
            <h2>Dear ${donationData.donorName},</h2>
            <p>We are deeply grateful for your generous donation to Southern Hemisphere Foundation.</p>
            
            <div class="donation-box">
              <p style="text-align: center; margin: 0; color: #666;">Donation Amount</p>
              <div class="amount">${
                donationData.currency
              } ${donationData.amount.toLocaleString()}</div>
              <p style="text-align: center; margin: 0; color: #666;">Transaction ID: ${
                donationData.transactionId
              }</p>
              <p style="text-align: center; margin: 5px 0; color: #666;">Date: ${new Date(
                donationData.createdAt
              ).toLocaleDateString()}</p>
            </div>

            <p>Your contribution will directly support:</p>
            <ul style="line-height: 2;">
              <li>Quality education for orphaned and vulnerable children</li>
              <li>Skills development programs for youth</li>
              <li>Community outreach and welfare support</li>
            </ul>

            <p>Every donation, no matter the size, helps us build brighter tomorrows for children in need.</p>
            
            <p style="margin-top: 30px;">With heartfelt gratitude,<br><strong>The Southern Hemisphere Foundation Team</strong></p>
            
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              For any questions about your donation, please contact us:<br>
              📧 southernhemispherefoundation@gmail.com<br>
              📞 +256 762 658 295 / +256 753 044 889
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Southern Hemisphere Foundation. All rights reserved.</p>
            <p>Bunamwaya, Makindye–Ssabagabo, Wakiso District, Uganda</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Donation email error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Send donation notification to admin
 */
const sendDonationNotification = async (donationData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `New Donation Received: ${
      donationData.currency
    } ${donationData.amount.toLocaleString()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A3D62; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #F6B93B; }
          .label { font-weight: bold; color: #0A3D62; }
          .amount { font-size: 24px; color: #F6B93B; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 New Donation Received!</h2>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">Amount:</span> <span class="amount">${
                donationData.currency
              } ${donationData.amount.toLocaleString()}</span>
            </div>
            <div class="info-row">
              <span class="label">Donor Name:</span> ${donationData.donorName}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${donationData.donorEmail}
            </div>
            ${
              donationData.donorPhone
                ? `<div class="info-row"><span class="label">Phone:</span> ${donationData.donorPhone}</div>`
                : ""
            }
            <div class="info-row">
              <span class="label">Payment Method:</span> ${
                donationData.paymentMethod
              }
            </div>
            <div class="info-row">
              <span class="label">Transaction ID:</span> ${
                donationData.transactionId
              }
            </div>
            <div class="info-row">
              <span class="label">Status:</span> ${donationData.status}
            </div>
            <div class="info-row">
              <span class="label">Date:</span> ${new Date(
                donationData.createdAt
              ).toLocaleString()}
            </div>
            ${
              donationData.notes
                ? `<div class="info-row"><span class="label">Notes:</span><br><p style="margin-top: 10px;">${donationData.notes}</p></div>`
                : ""
            }
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Admin donation notification error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactAutoResponse,
  sendContactNotification,
  sendDonationConfirmation,
  sendDonationNotification,
};
