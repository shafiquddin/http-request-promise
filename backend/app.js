import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./data/places.json', 'utf-8');
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (error) {
    console.error('Error reading places.json:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/user-places', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./data/user-places.json', 'utf-8');
    const places = JSON.parse(fileContent);
    res.status(200).json({ places });
  } catch (error) {
    console.error('Error reading user-places.json:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/user-places', async (req, res) => {
  const { places } = req.body;
  try {
    await fs.writeFile('./data/user-places.json', JSON.stringify(places, null, 2), 'utf-8');
    res.status(200).json({ message: 'User places updated!' });
  } catch (error) {
    console.error('Error writing user-places.json:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
