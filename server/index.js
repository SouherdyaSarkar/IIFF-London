import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/connection.js';
import registerRoute from './routes/register.js';
import {emailRouter} from './routes/signup.js';
import { googleRouter } from './routes/signup.js';
import visitorRoutes from './routes/visitors.js'; // Import the new visitor route
import submissiomRouter from './routes/getSubmissions.js';
import fetch from 'node-fetch'; // Import node-fetch
import csv from 'csv-parser'; // Import csv-parser
import { Readable } from 'stream'; // Import Readable from stream

// Load environment variables from .env.local
dotenv.config({ path: './.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Add a basic route for the root path
app.get('/', (req, res) => {
  res.send('Server is running!');
});

connectToDatabase();

app.use('/api/register', registerRoute);
app.use('/api/createAccountEmail', emailRouter);
app.use('/api/createAccountGoogle', googleRouter);
app.use('/api', visitorRoutes); // Use the new visitor route under /api
app.use('/submissions', submissiomRouter);

// Removed googleapis initialization as it's no longer needed for CSV export

// New route to fetch Google Sheet data as CSV
app.get('/api/sheet-data', async (req, res) => {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = 'Sheet1'; // Your sheet tab name

    if (!spreadsheetId) {
      return res.status(500).json({ error: 'Google Sheet ID not configured in environment variables.' });
    }

    // Construct the CSV export URL
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    const response = await fetch(csvUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV from Google Sheets: ${response.statusText}`);
    }

    const csvText = await response.text();
    const results = []; // Removed the TypeScript type annotation

    // Use csv-parser to parse the CSV text
    Readable.from(csvText)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error);
        res.status(500).json({ error: 'Failed to parse CSV data.' });
      });

  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheet. Check server logs for details.' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
