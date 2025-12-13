const GenericController = require('./genericController');
const Gallery = require('../models/Gallery');

class GalleryController extends GenericController {
  constructor() {
    super(Gallery);
  }

  // Override getAll to support filtering by category
  getAll = async (req, res) => {
    try {
      const { category } = req.query;
      const filter = { isActive: { $ne: false } };
      
      if (category) {
        filter.category = category;
      }
      
      const galleryItems = await Gallery.find(filter).sort({ createdAt: -1 });
      res.status(200).json(galleryItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new GalleryController();