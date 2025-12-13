class GenericController {
  constructor(model) {
    this.model = model;
  }

  // Get all documents
  getAll = async (req, res) => {
    try {
      const documents = await this.model.find({ isActive: { $ne: false } });
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get document by ID
  getById = async (req, res) => {
    try {
      const document = await this.model.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Create new document
  create = async (req, res) => {
    try {
      const document = new this.model(req.body);
      const savedDocument = await document.save();
      res.status(201).json(savedDocument);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Update document
  update = async (req, res) => {
    try {
      const document = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Delete document (soft delete by setting isActive to false)
  delete = async (req, res) => {
    try {
      const document = await this.model.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = GenericController;