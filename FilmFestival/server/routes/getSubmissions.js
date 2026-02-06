import express from 'express';
import Registration from '../models/Registration.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { uid } = req.body;
        if (!uid) {
        return res.status(401).json({ message: 'Authentication required.' });
        }
        const userSubmissions = await Registration.find({ uid: uid });
        if (userSubmissions.length > 0) {
            return res.status(200).json(userSubmissions);
        } else {
            return res.status(404).json({ message: 'No submissions found for this user.' });
        }
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;