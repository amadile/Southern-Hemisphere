const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authenticate, authorize } = require("../middleware/auth");
const { contactLimiter } = require("../middleware/rateLimiter");
const {
  validateContactMessage,
  validateObjectId,
} = require("../middleware/validator");

// Public routes
// POST /api/contact - Create a new contact message (with rate limiting and validation)
router.post(
  "/",
  contactLimiter,
  validateContactMessage,
  contactController.create
);

// Protected routes (admin only)
// GET /api/contact - Get all contact messages (with optional read filter)
router.get(
  "/",
  authenticate,
  authorize("admin", "staff"),
  contactController.getAll
);

// GET /api/contact/:id - Get a specific contact message
router.get(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  contactController.getById
);

// PUT /api/contact/:id - Update a contact message
router.put(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  contactController.update
);

// PUT /api/contact/:id/read - Mark message as read
router.put(
  "/:id/read",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  contactController.markAsRead
);

// PUT /api/contact/:id/responded - Mark message as responded
router.put(
  "/:id/responded",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  contactController.markAsResponded
);

// DELETE /api/contact/:id - Delete a contact message
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  contactController.delete
);

module.exports = router;
