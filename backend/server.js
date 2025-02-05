import express from 'express';
import cors from 'cors';
import fs from 'fs';
import axios from 'axios';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/health', (req, res) => {
  const isDocker = fs.existsSync("/.dockerenv") ? "Docker" : "Not Docker";
  res.json({ message: isDocker });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: "Hello from Node.js and I'm backend" });
});
// New endpoint: Fetch posts from JSONPlaceholder
app.get('/posts', async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
// New endpoint: Fetch a random user from Random User API
app.get('/random-user', async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching random user:", error);
    res.status(500).json({ error: "Failed to fetch random user" });
  }
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