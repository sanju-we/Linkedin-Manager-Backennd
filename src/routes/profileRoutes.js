import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.get('/profile', authenticate, (req, res) => {
    res.json({ message: 'Protected profile data', user: req.user });
});
export default router;
