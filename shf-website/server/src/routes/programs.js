const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");
const { authenticate, authorize } = require("../middleware/auth");
const {
  validateProgram,
  validateObjectId,
} = require("../middleware/validator");

// Public routes
// GET /api/programs - Get all programs
router.get("/", programController.getAll);

// GET /api/programs/:id - Get a specific program
router.get("/:id", validateObjectId, programController.getById);

// Protected routes (admin/staff)
// POST /api/programs - Create a new program
router.post(
  "/",
  authenticate,
  authorize("admin", "staff"),
  validateProgram,
  programController.create
);

// PUT /api/programs/:id - Update a program
router.put(
  "/:id",
  authenticate,
  authorize("admin", "staff"),
  validateObjectId,
  programController.update
);

// DELETE /api/programs/:id - Delete a program (soft delete)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateObjectId,
  programController.delete
);

module.exports = router;
