import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { jokeGeneratorFlow } from './ai/genkit';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

app.get('/api/joke', async (req, res) => {
  try {
    const topic = req.query.topic as string;
    const joke = await jokeGeneratorFlow({ topic });
    res.json(joke);
  } catch (error) {
    console.error('Error generating joke:', error);
    res.status(500).json({ error: 'Failed to generate joke' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});