const GenericController = require('./genericController');
const News = require('../models/News');

class NewsController extends GenericController {
  constructor() {
    super(News);
  }

  // Override getAll to sort by date and support filtering by category
  getAll = async (req, res) => {
    try {
      const { category } = req.query;
      const filter = { isActive: { $ne: false } };
      
      if (category) {
        filter.category = category;
      }
      
      const news = await News.find(filter).sort({ date: -1 });
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new NewsController();