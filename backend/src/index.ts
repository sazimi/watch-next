import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/movie', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'No movie name provided.' });
  }
  return res.json({ message: `This is the movie: ${name}` });
});

app.get('/', (_req, res) => {
  res.send('Backend running!');
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});