import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

let storedData = []; // Temporary in-memory storage

// Default route
app.get('/', (req, res) => {
  res.json({ message: "Hello from Node.js is the best !" });
});

// Fetch stored data
app.get('/data', (req, res) => {
  res.json(storedData);
});

// Store user-submitted data
app.post('/data', (req, res) => {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: 'Input is required' });
  
  storedData.push(input); // Store input in memory
  res.json(storedData); // Return updated list
});
// Set the port for the backend
const port = process.env.PORT || 5004;

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

export { app }; // Named export for app