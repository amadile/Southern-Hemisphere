const GenericController = require('./genericController');
const Program = require('../models/Program');

class ProgramController extends GenericController {
  constructor() {
    super(Program);
  }

  // Override getAll to sort by createdAt
  getAll = async (req, res) => {
    try {
      const programs = await Program.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new ProgramController();