// src/backend/routes/healthTips.js
import express from 'express';
import { addOrUpdateTips, getUserHealthTips } from '../controllers/healthTipsController';

const router = express.Router();

// POST route to add or update health tips for a user
router.post('/', addOrUpdateTips);

// GET route to fetch health tips for a user by userId
router.get('/:userId', getUserHealthTips);

export default router;
