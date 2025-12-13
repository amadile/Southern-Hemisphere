const GenericController = require("./genericController");
const ContactMessage = require("../models/ContactMessage");
const {
  sendContactAutoResponse,
  sendContactNotification,
} = require("../utils/emailService");

class ContactController extends GenericController {
  constructor() {
    super(ContactMessage);
  }

  // Override create to send emails
  create = async (req, res) => {
    try {
      const contactData = req.body;
      const message = new ContactMessage(contactData);
      const savedMessage = await message.save();

      // Send auto-response to the person who submitted the form
      const autoResponseResult = await sendContactAutoResponse(
        contactData.email,
        contactData.name
      );

      // Send notification to admin
      const notificationResult = await sendContactNotification({
        ...contactData,
        createdAt: savedMessage.createdAt,
      });

      res.status(201).json({
        success: true,
        message:
          "Message sent successfully. You will receive a confirmation email shortly.",
        data: savedMessage,
        emailStatus: {
          autoResponse: autoResponseResult.success,
          adminNotification: notificationResult.success,
        },
      });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to submit message",
        error: error.message,
      });
    }
  };

  // Override getAll to sort by createdAt (newest first) and support filtering by read status
  getAll = async (req, res) => {
    try {
      const { isRead } = req.query;
      const filter = {};

      if (isRead !== undefined) {
        filter.isRead = isRead === "true";
      }

      const messages = await ContactMessage.find(filter).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Mark message as read
  markAsRead = async (req, res) => {
    try {
      const message = await ContactMessage.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true }
      );
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Mark message as responded
  markAsResponded = async (req, res) => {
    try {
      const message = await ContactMessage.findByIdAndUpdate(
        req.params.id,
        { responseSent: true },
        { new: true }
      );
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new ContactController();
