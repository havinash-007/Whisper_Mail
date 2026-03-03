import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;
const DB = path.join(__dirname, 'letters.json');

if (!fs.existsSync(DB)) fs.writeFileSync(DB, '{}');

const read = () => JSON.parse(fs.readFileSync(DB, 'utf-8'));
const write = (d) => fs.writeFileSync(DB, JSON.stringify(d, null, 2));

app.use(cors());
app.use(express.json());

// POST /api/letters  →  save letter, return short ID
app.post('/api/letters', (req, res) => {
    const { letter, theme, stickers } = req.body;
    if (!letter) return res.status(400).json({ error: 'No letter data' });

    const id = crypto.randomBytes(4).toString('hex');
    const letters = read();
    letters[id] = { letter, theme: theme || 'cream', stickers: stickers || [], createdAt: new Date().toISOString() };
    write(letters);
    console.log(`[WhisperMail] 💌 saved letter: ${id}`);
    res.json({ id });
});

// GET /api/letters/:id  →  fetch letter
app.get('/api/letters/:id', (req, res) => {
    const letters = read();
    const data = letters[req.params.id];
    if (!data) return res.status(404).json({ error: 'Letter not found' });
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`\n  💌  WhisperMail API  →  http://localhost:${PORT}\n`);
});
