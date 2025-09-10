import express from 'express';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 5000;


app.use(cors());


app.use('/output', express.static(path.join(__dirname, 'output')));


app.use(express.static(path.join(__dirname, '../frontend')));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });


app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = path.join(__dirname, 'uploads', req.file.originalname);
  const scriptPath = path.join(__dirname, 'detect.py');
  const command = `python "${scriptPath}" "${imagePath}"`; 

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Exec error:', error);
      return res.status(500).json({ error: 'Model execution failed' });
    }

    try {
      
      const jsonStr = stdout.trim().split('\n').pop();
      const result = JSON.parse(jsonStr);
      res.json(result);
    } catch (parseErr) {
      console.error('❌ JSON parse error:', parseErr);
      console.error('Received stdout:\n', stdout);
      res.status(500).json({ error: 'Invalid JSON from Python script' });
    }
  });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
