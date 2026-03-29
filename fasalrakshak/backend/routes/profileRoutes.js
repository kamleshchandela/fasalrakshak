import express from 'express';
import { getProfile, updateProfile, changePin, deleteAccount } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all profile routes
router.use(protect);

router.get('/', getProfile);
router.patch('/', updateProfile);
router.patch('/change-pin', changePin);
router.delete('/delete-account', deleteAccount);

export default router;
