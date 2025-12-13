const { body, param, query, validationResult } = require("express-validator");

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const validateUserRegistration = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be 2-50 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be 2-50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain uppercase, lowercase, and number"),

  body("role")
    .optional()
    .isIn(["admin", "editor", "staff"])
    .withMessage("Invalid role"),

  handleValidationErrors,
];

/**
 * Validation rules for user login
 */
const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

/**
 * Validation rules for program creation/update
 */
const validateProgram = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be 3-200 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("goals").optional().isArray().withMessage("Goals must be an array"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  handleValidationErrors,
];

/**
 * Validation rules for news creation/update
 */
const validateNews = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be 3-200 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt must be max 500 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["news", "event", "story"])
    .withMessage("Invalid category"),

  body("date").optional().isISO8601().withMessage("Invalid date format"),

  handleValidationErrors,
];

/**
 * Validation rules for donation
 */
const validateDonation = [
  body("donorName")
    .trim()
    .notEmpty()
    .withMessage("Donor name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Donor name must be 2-100 characters"),

  body("donorEmail")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("donorPhone")
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage("Invalid phone number format"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 1000 })
    .withMessage("Amount must be at least 1000 UGX"),

  body("currency")
    .optional()
    .isIn(["UGX", "USD"])
    .withMessage("Invalid currency"),

  body("categoryId").optional().isMongoId().withMessage("Invalid category ID"),

  handleValidationErrors,
];

/**
 * Validation rules for contact message
 */
const validateContactMessage = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage("Invalid phone number format"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Subject must be 3-200 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be 10-2000 characters"),

  handleValidationErrors,
];

/**
 * Validation rules for gallery item
 */
const validateGallery = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be 3-200 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be max 500 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["learners", "community", "school"])
    .withMessage("Invalid category"),

  handleValidationErrors,
];

/**
 * Validation rules for MongoDB ObjectId
 */
const validateObjectId = [
  param("id").isMongoId().withMessage("Invalid ID format"),

  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateProgram,
  validateNews,
  validateDonation,
  validateContactMessage,
  validateGallery,
  validateObjectId,
};
