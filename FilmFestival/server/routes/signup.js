import express from 'express';
import { emailSignup, googleSignup } from '../models/accountCreate.js';

const emailRouter = express.Router();
const googleRouter = express.Router();

emailRouter.post('/', async (req, res) => {
  try {
    console.log('Received signup data:', req.body);
    const data = req.body;
    const newEntry = await emailSignup.create(data);
    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


googleRouter.post('/', async (req, res) => {
  try {
    console.log('Received signup data:', req.body);
    const data = req.body;
    const newEntry = await googleSignup.create(data);
    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export {emailRouter, googleRouter};
