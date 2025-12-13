const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "shf-foundation",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1200, height: 1200, crop: "limit" }],
  },
});

// Create multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

/**
 * Upload single image
 */
const uploadSingle = upload.single("image");

/**
 * Upload multiple images (max 10)
 */
const uploadMultiple = upload.array("images", 10);

/**
 * Delete image from Cloudinary
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};

/**
 * Get image URL with transformations
 */
const getImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    width: options.width || 800,
    height: options.height || 600,
    crop: options.crop || "fill",
    quality: options.quality || "auto",
    fetch_format: "auto",
  });
};

/**
 * Upload image from URL
 */
const uploadFromUrl = async (imageUrl, folder = "shf-foundation") => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: folder,
      transformation: [{ width: 1200, height: 1200, crop: "limit" }],
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload from URL error:", error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadSingle,
  uploadMultiple,
  deleteImage,
  getImageUrl,
  uploadFromUrl,
};
