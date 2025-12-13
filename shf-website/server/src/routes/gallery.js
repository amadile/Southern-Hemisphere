const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const { authenticate, authorize } = require("../middleware/auth");
const {
  validateGallery,
  validateObjectId,
} = require("../middleware/validator");

// Public routes
// GET /api/gallery - Get all gallery items (with optional category filter)
router.get("/", galleryController.getAll);

// GET /api/gallery/:id - Get a specific gallery item
router.get("/:id", validateObjectId, galleryController.getById);

// Protected routes (admin/staff)
// POST /api/gallery - Create a new gallery item
router.post(
  "/",
  authenticate,
  authorize("admin", "staff"),
  validateGallery,
  galleryController.create
);

// PUT /api/gallery/:id - Update a gallery item
router.put(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  galleryController.update
);

// DELETE /api/gallery/:id - Delete a gallery item (soft delete)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  galleryController.delete
);

module.exports = router;
