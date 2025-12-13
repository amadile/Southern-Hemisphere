const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const { authenticate, authorize } = require("../middleware/auth");
const { validateNews, validateObjectId } = require("../middleware/validator");

// Public routes
// GET /api/news - Get all news items (with optional category filter)
router.get("/", newsController.getAll);

// GET /api/news/:id - Get a specific news item
router.get("/:id", validateObjectId, newsController.getById);

// Protected routes (admin/staff)
// POST /api/news - Create a new news item
router.post(
  "/",
  authenticate,
  authorize("admin", "staff"),
  validateNews,
  newsController.create
);

// PUT /api/news/:id - Update a news item
router.put(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  newsController.update
);

// DELETE /api/news/:id - Delete a news item (soft delete)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  newsController.delete
);

module.exports = router;
