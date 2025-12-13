const express = require("express");
const router = express.Router();
const {
  uploadSingle,
  uploadMultiple,
  deleteImage,
} = require("../utils/cloudinary");
const { authenticate, authorize } = require("../middleware/auth");

/**
 * @route   POST /api/upload/single
 * @desc    Upload single image
 * @access  Private (Admin/Staff)
 */
router.post(
  "/single",
  authenticate,
  authorize("admin", "staff"),
  (req, res) => {
    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
          error: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      res.json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          url: req.file.path,
          publicId: req.file.filename,
          width: req.file.width,
          height: req.file.height,
          format: req.file.format,
          size: req.file.bytes,
        },
      });
    });
  }
);

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple images
 * @access  Private (Admin/Staff)
 */
router.post(
  "/multiple",
  authenticate,
  authorize("admin", "staff"),
  (req, res) => {
    uploadMultiple(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Images upload failed",
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      const uploadedFiles = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
        width: file.width,
        height: file.height,
        format: file.format,
        size: file.bytes,
      }));

      res.json({
        success: true,
        message: `${req.files.length} images uploaded successfully`,
        data: uploadedFiles,
      });
    });
  }
);

/**
 * @route   DELETE /api/upload/:publicId
 * @desc    Delete image from Cloudinary
 * @access  Private (Admin)
 */
router.delete(
  "/:publicId",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      // Replace URL-encoded slashes back to actual slashes
      const publicId = req.params.publicId.replace(/%2F/g, "/");

      const result = await deleteImage(publicId);

      if (result.result === "ok") {
        res.json({
          success: true,
          message: "Image deleted successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to delete image",
          error: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
