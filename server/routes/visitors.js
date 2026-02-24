import express from 'express';
// You might want to create a Mongoose model for visitors if you plan to store them in MongoDB
// import Visitor from '../models/Visitor.js'; 

const router = express.Router();

router.post('/submit-visitor-data', async (req, res) => {
  try {
    const { name, email, phone, timestamp } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    console.log('Received visitor data:', { name, email, phone, timestamp });

    // --- Placeholder for Google Sheets Integration ---
    // This is where you would add the logic to write the data to Google Sheets.
    // You'll need to:
    // 1. Install Google APIs client library (e.g., `npm install googleapis`)
    // 2. Set up a Google Service Account and get its credentials (JSON key file).
    // 3. Share your Google Sheet with the service account's email address.
    // 4. Use the googleapis library to append a row to your sheet.

    /*
    // Example (conceptual, requires setup):
    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1YX2vFtds_75Stqo-lfQZL8URN4wluVM1fe-DT7fXNHs'; // Your spreadsheet ID
    const range = 'visitors!A:D'; // Your tab name and columns (e.g., Timestamp, Name, Email, Phone)

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, name, email, phone]],
      },
    });
    */

    // If you were storing in MongoDB:
    // const newVisitor = await Visitor.create({ name, email, phone, timestamp });
    // res.status(201).json({ success: true, message: 'Visitor registered successfully.', data: newVisitor });

    res.status(200).json({ success: true, message: 'Visitor data received successfully (Google Sheets integration pending).' });

  } catch (err) {
    console.error('Error processing visitor registration:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error.' });
  }
});

export default router;