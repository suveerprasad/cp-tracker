const userService = require('../services/userService');

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = req.body;

    if (req.user.id !== id) {
      return res.status(403).json({ error: 'Unauthorized to update this profile' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    const updatedProfile = await userService.updateProfile(id, profileData, token);
    res.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return res.status(403).json({ error: 'Unauthorized to access this profile' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    const profile = await userService.getProfile(id, token);
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getEmail = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return res.status(403).json({ error: 'Unauthorized to access this email' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    const email = await userService.getEmail(id, token);
    res.json(email);
  } catch (error) {
    console.error('Get email error:', error);
    res.status(500).json({ error: error.message });
  }
};