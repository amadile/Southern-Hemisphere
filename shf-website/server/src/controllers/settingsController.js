const Settings = require('../models/Settings');

class SettingsController {
  // Get settings (there should only be one document)
  getSettings = async (req, res) => {
    try {
      let settings = await Settings.findOne();
      
      // If no settings exist, create default settings
      if (!settings) {
        settings = new Settings();
        await settings.save();
      }
      
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update settings
  updateSettings = async (req, res) => {
    try {
      let settings = await Settings.findOne();
      
      // If no settings exist, create new settings
      if (!settings) {
        settings = new Settings(req.body);
      } else {
        // Update existing settings
        Object.keys(req.body).forEach(key => {
          settings[key] = req.body[key];
        });
      }
      
      const updatedSettings = await settings.save();
      res.status(200).json(updatedSettings);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new SettingsController();