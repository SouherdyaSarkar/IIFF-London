import express from 'express';
import Registration from '../models/Registration.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newEntry = await Registration.create(data);
    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
