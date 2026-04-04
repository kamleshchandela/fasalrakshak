import Kisan from '../models/Kisan.js';
import bcrypt from 'bcryptjs';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const kisan = await Kisan.findById(req.user._id).select('-pin');
    if (!kisan) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      data: kisan
    });
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PATCH /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const kisan = await Kisan.findById(req.user._id);

    if (!kisan) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // List of allowed fields to update
    const allowedFields = ['name', 'gender', 'village', 'district', 'state', 'cropTypes', 'landSize', 'profilePhoto', 'irrigationMethod', 'farmingType'];

    // Update fields if provided in body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        kisan[field] = req.body[field];
      }
    });

    const updatedKisan = await kisan.save();

    // Prepare response object without pin
    const kisanData = updatedKisan.toObject();
    delete kisanData.pin;

    res.status(200).json({
      success: true,
      data: kisanData
    });

  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Change user PIN
// @route   PATCH /api/profile/change-pin
// @access  Private
export const changePin = async (req, res) => {
  try {
    const { currentPin, newPin, confirmNewPin } = req.body;

    if (!currentPin || !newPin || !confirmNewPin) {
      return res.status(400).json({ success: false, message: 'Please provide all PIN fields' });
    }

    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      return res.status(400).json({ success: false, message: 'New PIN must be exactly 4 digits' });
    }

    if (newPin !== confirmNewPin) {
      return res.status(400).json({ success: false, message: 'New PIN and confirm PIN do not match' });
    }

    // Need to get user with pin field included
    const kisan = await Kisan.findById(req.user._id);
    
    // Check current PIN
    const isMatch = await bcrypt.compare(currentPin, kisan.pin);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current PIN is incorrect' });
    }

    // Hash new PIN
    const salt = await bcrypt.genSalt(10);
    kisan.pin = await bcrypt.hash(newPin, salt);
    
    await kisan.save();

    res.status(200).json({
      success: true,
      message: 'PIN updated successfully'
    });

  } catch (error) {
    console.error('changePin error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete user account
// @route   DELETE /api/profile/delete-account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const { pin } = req.body;

    if (!pin) {
      return res.status(400).json({ success: false, message: 'Please provide PIN to confirm deletion' });
    }

    const kisan = await Kisan.findById(req.user._id);

    // Verify PIN
    const isMatch = await bcrypt.compare(pin, kisan.pin);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect PIN. Account deletion failed.' });
    }

    // Delete account
    await Kisan.findByIdAndDelete(req.user._id);

    // Clear auth cookie
    res.cookie('fasal_token', 'none', {
      expires: new Date(0),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('deleteAccount error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
