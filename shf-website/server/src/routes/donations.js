const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const { authenticate, authorize } = require("../middleware/auth");
const { donationLimiter } = require("../middleware/rateLimiter");
const {
  validateDonation,
  validateObjectId,
} = require("../middleware/validator");

// Public routes
// POST /api/donations - Create a new donation (with rate limiting and validation)
router.post("/", donationLimiter, validateDonation, donationController.create);

// Protected routes (admin/staff)
// GET /api/donations - Get all donations
router.get(
  "/",
  authenticate,
  authorize("admin", "staff"),
  donationController.getAll
);

// GET /api/donations/status/:status - Get donations by status
router.get(
  "/status/:status",
  authenticate,
  authorize("admin", "staff"),
  donationController.getByStatus
);

// GET /api/donations/:id - Get a specific donation
router.get(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  donationController.getById
);

// PUT /api/donations/:id - Update a donation
router.put(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  donationController.update
);

// PUT /api/donations/:id/status - Update donation status
router.put(
  "/:id/status",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  donationController.updateDonationStatus
);

// DELETE /api/donations/:id - Delete a donation
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  donationController.delete
);

module.exports = router;
