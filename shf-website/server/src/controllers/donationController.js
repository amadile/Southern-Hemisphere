const GenericController = require("./genericController");
const Donation = require("../models/Donation");
const {
  sendDonationConfirmation,
  sendDonationNotification,
} = require("../utils/emailService");

class DonationController extends GenericController {
  constructor() {
    super(Donation);
  }

  // Override getAll to sort by createdAt (newest first)
  getAll = async (req, res) => {
    try {
      const donations = await Donation.find()
        .populate("categoryId")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: donations.length,
        data: donations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Get donations by status
  getByStatus = async (req, res) => {
    try {
      const { status } = req.params;
      const donations = await Donation.find({ status }).sort({ createdAt: -1 });
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Create a new donation with a unique transaction ID
  create = async (req, res) => {
    try {
      // Generate a unique transaction ID if not provided
      const transactionId =
        req.body.transactionId ||
        `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const donationData = {
        ...req.body,
        transactionId,
        status: req.body.status || "pending",
      };

      const donation = new Donation(donationData);
      const savedDonation = await donation.save();

      res.status(201).json({
        success: true,
        message: "Donation created successfully",
        data: savedDonation,
      });
    } catch (error) {
      console.error("Donation creation error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to create donation",
        error: error.message,
      });
    }
  };

  // Update donation status and send confirmation emails
  updateDonationStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const donation = await Donation.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate("categoryId");

      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found",
        });
      }

      // If donation is completed, send confirmation emails
      if (status === "completed") {
        // Send confirmation to donor
        await sendDonationConfirmation({
          donorName: donation.donorName,
          donorEmail: donation.donorEmail,
          amount: donation.amount,
          currency: donation.currency,
          transactionId: donation.transactionId,
          createdAt: donation.createdAt,
        });

        // Send notification to admin
        await sendDonationNotification({
          donorName: donation.donorName,
          donorEmail: donation.donorEmail,
          donorPhone: donation.donorPhone,
          amount: donation.amount,
          currency: donation.currency,
          paymentMethod: donation.paymentMethod,
          transactionId: donation.transactionId,
          status: donation.status,
          notes: donation.notes,
          createdAt: donation.createdAt,
        });
      }

      res.status(200).json({
        success: true,
        message: "Donation status updated successfully",
        data: donation,
      });
    } catch (error) {
      console.error("Donation update error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update donation",
        error: error.message,
      });
    }
  };
}

module.exports = new DonationController();
