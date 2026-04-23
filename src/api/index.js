const express = require('express');
const router = express.Router();

// Import all route modules
const empresasRoutes = require('../../backend/routes/empresas');
const maquinasRoutes = require('../../backend/routes/maquinas');
const equipamentosRoutes = require('../../backend/routes/equipamentos');
const redeRoutes = require('../../backend/routes/rede');
const linhasRoutes = require('../../backend/routes/linhas');
const senhasRoutes = require('../../backend/routes/senhas');
const troncosRoutes = require('../../backend/routes/troncos');
const chatbotsRoutes = require('../../backend/routes/chatbots');
const numerobotsRoutes = require('../../backend/routes/numerobots');
const contatosRoutes = require('../../backend/routes/contatos');
const searchRoutes = require('../../backend/routes/search');
const relatedRoutes = require('../../backend/routes/related');
const cloudImportRoutes = require('../../backend/routes/import/cloud-import');

// Cloud routes (consolidate individual cloud routes)
const revendaCloudRoutes = require('../../backend/routes/revenda-cloud');
const perfilCloudRoutes = require('../../backend/routes/perfil-cloud');
const contatoCloudRoutes = require('../../backend/routes/contato-cloud');
const organizacaoCloudRoutes = require('../../backend/routes/organizacao-cloud');

// Mount routes
router.use('/empresas', empresasRoutes);
router.use('/maquinas', maquinasRoutes);
router.use('/equipamentos', equipamentosRoutes);
router.use('/rede', redeRoutes);
router.use('/linhas', linhasRoutes);
router.use('/senhas', senhasRoutes);
router.use('/troncos', troncosRoutes);
router.use('/chatbots', chatbotsRoutes);
router.use('/numerobots', numerobotsRoutes);
router.use('/contatos', contatosRoutes);
router.use('/search', searchRoutes);
router.use('/related', relatedRoutes);
router.use('/import', cloudImportRoutes);

// Cloud routes
router.use('/revenda-cloud', revendaCloudRoutes);
router.use('/perfil-cloud', perfilCloudRoutes);
router.use('/contato-cloud', contatoCloudRoutes);
router.use('/organizacao-cloud', organizacaoCloudRoutes);

module.exports = router;