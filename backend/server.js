const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const empresasRoutes = require('./routes/empresas');
const maquinasRoutes = require('./routes/maquinas');
const equipamentosRoutes = require('./routes/equipamentos');
const redeRoutes = require('./routes/rede');
const linhasRoutes = require('./routes/linhas');
const senhasRoutes = require('./routes/senhas');
const troncosRoutes = require('./routes/troncos');
const chatbotsRoutes = require('./routes/chatbots');
const numerobotsRoutes = require('./routes/numerobots');
const contatosRoutes = require('./routes/contatos');
const searchRoutes = require('./routes/search');
const relatedRoutes = require('./routes/related');
const revendaCloudRoutes = require('./routes/revenda-cloud');
const perfilCloudRoutes = require('./routes/perfil-cloud');
const contatoCloudRoutes = require('./routes/contato-cloud');
const organizacaoCloudRoutes = require('./routes/organizacao-cloud');

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/empresas', empresasRoutes);
app.use('/api/maquinas', maquinasRoutes);
app.use('/api/equipamentos', equipamentosRoutes);
app.use('/api/rede', redeRoutes);
app.use('/api/linhas', linhasRoutes);
app.use('/api/senhas', senhasRoutes);
app.use('/api/troncos', troncosRoutes);
app.use('/api/chatbots', chatbotsRoutes);
app.use('/api/numerobots', numerobotsRoutes);
app.use('/api/contatos', contatosRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/related', relatedRoutes);
app.use('/api/revenda-cloud', revendaCloudRoutes);
app.use('/api/perfil-cloud', perfilCloudRoutes);
app.use('/api/contato-cloud', contatoCloudRoutes);
app.use('/api/organizacao-cloud', organizacaoCloudRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Porta backend: ${PORT}`);
});