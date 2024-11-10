usercontroller.js
const User = require('../models/User');

// Get user data
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update user data
const createOrUpdateUser = async (req, res) => {
  const { id, ...userData } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
      upsert: true, // Create if not exists
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export functions
module.exports = {
  getUser,
  createOrUpdateUser,
};debugger.js