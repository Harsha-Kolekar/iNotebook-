import express from 'express';
import connectToMongo from './db.js';
import authRouter from './routes/auth.js';
import notesRouter from './routes/notes.js';
import cors from 'cors';
const app = express()
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectToMongo();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// Start the server
app.listen(port, () => {
  console.log(`eNotebook backend is running on http://localhost:${port}`);
});
