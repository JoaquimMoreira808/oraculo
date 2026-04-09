const express = require('express');
const upload = require('../../middleware/upload');
const FileParser = require('../../services/FileParser');
const ImportService = require('../../services/ImportService');
const router = express.Router();

router.post('/revenda-cloud', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }
    
    const data = FileParser.parseFile(req.file.buffer, req.file.originalname);
    const results = await ImportService.importRevendaCloud(data);
    
    if (results.error) {
      return res.status(400).json({ error: results.error });
    }
    
    res.json({ message: `${results.success} registros importados com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/organizacao-cloud', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }
    
    const data = FileParser.parseFile(req.file.buffer, req.file.originalname);
    const results = await ImportService.importOrganizacaoCloud(data);
    
    if (results.error) {
      return res.status(400).json({ error: results.error });
    }
    
    res.json({ message: `${results.success} registros importados com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/perfil-cloud', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }
    
    const data = FileParser.parseFile(req.file.buffer, req.file.originalname);
    const results = await ImportService.importPerfilCloud(data);
    
    if (results.error) {
      return res.status(400).json({ error: results.error });
    }
    
    res.json({ message: `${results.success} registros importados com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/contato-cloud', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }
    
    const data = FileParser.parseFile(req.file.buffer, req.file.originalname);
    const results = await ImportService.importContatoCloud(data);
    
    if (results.error) {
      return res.status(400).json({ error: results.error });
    }
    
    res.json({ message: `${results.success} registros importados com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;