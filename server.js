const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// CORS — em produção restringe à origem configurada
const corsOptions = isProd
  ? { origin: process.env.PUBLIC_BACKEND_URL, credentials: true }
  : { credentials: true, origin: true };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('uploads'));

// API Routes
const apiRoutes = require('./src/api');
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Frontend — SSR via Astro em produção, estático em dev
if (isProd) {
  const { handler } = require('./dist/server/entry.mjs');
  app.use(handler);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*path', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
});
